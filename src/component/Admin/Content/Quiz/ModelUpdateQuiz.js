import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateQuiz } from "../../../../services/apiServices";
import _ from "lodash";
import Select from "react-select";

const ModelUpdateQuiz = (props) => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const {
    showModalUpdateQuiz,
    setShowModalUpdateQuiz,
    dataUpdateQuiz,
    setDataUpdateQuiz,
    fetchListQuiz,
  } = props;
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [quizImage, setQuizImage] = useState("");
  const [preViewImage, setPreViewImage] = useState("");

  const handleClose = () => {
    setShowModalUpdateQuiz(false);
    setDataUpdateQuiz([]);
  };

  const handleSubmitUpdateQuiz = async () => {
    let res = await putUpdateQuiz(
      dataUpdateQuiz.id,
      description,
      name,
      difficulty?.value,
      quizImage
    );
    if (res && res.EC === 0) {
      toast.success("Update quiz success");
      fetchListQuiz();
      handleClose();
    }
  };

  const handleUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreViewImage(URL.createObjectURL(event.target.files[0]));
      setQuizImage(event.target.files[0]);
    } else {
      setPreViewImage("");
    }
  };

  useEffect(() => {
    if (!_.isEmpty(dataUpdateQuiz)) {
      setDescription(dataUpdateQuiz.description);
      setName(dataUpdateQuiz.name);
      setDifficulty(dataUpdateQuiz.difficulty);
      setQuizImage("");
      if (dataUpdateQuiz.image) {
        setPreViewImage(`data:image/jpeg;base64,${dataUpdateQuiz.image}`);
      }
    }
  }, [dataUpdateQuiz]);

  return (
    <>
      <Modal
        show={showModalUpdateQuiz}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update a quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className="my-3">
              <Select
                value={options.map((item, index) => {
                  if (item.value == difficulty) return item;
                  else return;
                })}
                onChange={setDifficulty}
                options={options}
                placeholder={"Quiz type..."}
              />
            </div>
            <div className="col-md-12">
              <label
                className="form-label label-upload"
                htmlFor="labelUpload"
                value={quizImage}
              >
                <FcPlus /> Upload File Image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(event) => handleUploadImage(event)}
              />
            </div>
            <div className="col-md-12 img-preview">
              {preViewImage ? (
                <img src={preViewImage} />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleClose}
            type="button"
            className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
          >
            Close
          </button>
          <button
            onClick={() => handleSubmitUpdateQuiz()}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelUpdateQuiz;
