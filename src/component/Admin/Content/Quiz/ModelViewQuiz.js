import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateQuiz } from "../../../../services/apiServices";
import _ from "lodash";
import Select from "react-select";

const ModelViewQuiz = (props) => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];
  const {
    showModalViewQuiz,
    setShowModalViewQuiz,
    dataViewQuiz,
    setDataViewQuiz,
  } = props;
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [quizImage, setQuizImage] = useState("");
  const [preViewImage, setPreViewImage] = useState("");

  const handleClose = () => {
    setShowModalViewQuiz(false);
  };

  useEffect(() => {
    if (!_.isEmpty(dataViewQuiz)) {
      setDescription(dataViewQuiz.description);
      setName(dataViewQuiz.name);
      setDifficulty(dataViewQuiz.difficulty);
      setQuizImage("");
      if (dataViewQuiz.image) {
        console.log("checxk img:", dataViewQuiz);
        setPreViewImage(`data:image/jpeg;base64,${dataViewQuiz.image}`);
      }
    }
  }, [dataViewQuiz]);
  return (
    <>
      <Modal
        show={showModalViewQuiz}
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
                disabled={true}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={description}
                disabled={true}
              />
            </div>
            <div className="my-3">
              <Select
                value={options.map((item, index) => {
                  if (item.value == difficulty) return item;
                  else return;
                })}
                options={options}
                isDisabled={true}
                placeholder={"Quiz type..."}
              />
            </div>
            <div className="col-md-12">
              <input type="file" id="labelUpload" disabled={true} hidden />
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelViewQuiz;
