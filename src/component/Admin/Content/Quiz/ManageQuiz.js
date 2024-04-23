import { useState } from "react";
import Select from "react-select";
import {
  postCreateNewQuiz,
  getAllQuiz,
  deleteQuiz,
} from "../../../../services/apiServices";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import ModelUpdateQuiz from "./ModelUpdateQuiz";
import ModelViewQuiz from "./ModelViewQuiz";
import ModalDeleteUser from "./ModalDeleteQuiz";
import Accordion from "react-bootstrap/Accordion";

const ManageQuiz = (props) => {
  const options = [
    { value: "EASY", label: "EASY" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HARD", label: "HARD" },
  ];

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState(null);
  const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
  const [dataUpdateQuiz, setDataUpdateQuiz] = useState("");
  const [listQuiz, setListQuiz] = useState([]);
  const [showModalViewQuiz, setShowModalViewQuiz] = useState(false);
  const [dataViewQuiz, setDataViewQuiz] = useState([]);
  const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
  const [dataDeleteQuiz, setDataDeleteQuiz] = useState("");

  const handleClickDeleteQuiz = (idQuiz) => {
    setShowModalDeleteQuiz(true);
    setDataDeleteQuiz(idQuiz);
  };

  const handleClickUpdateQuiz = (quiz) => {
    setShowModalUpdateQuiz(true);
    setDataUpdateQuiz(quiz);
  };

  const handleClickViewQuiz = (quiz) => {
    setShowModalViewQuiz(true);
    setDataViewQuiz(quiz);
  };

  const handleChangFile = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmitQuiz = async () => {
    if (!name || !description) {
      toast.error("Name/Description is required");
      return;
    }
    let res = await postCreateNewQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      setType("");
      setName("");
      setDescription("");
      fetchListQuiz();
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  const fetchListQuiz = async () => {
    let res = await getAllQuiz();
    if (res && res.DT) {
      setListQuiz(res.DT);
    }
  };

  return (
    <div className="p-8">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Manage Quizzes</Accordion.Header>
          <Accordion.Body>
            <div className="p-4 mx-auto border-[1px] rounded-lg">
              <p className="!pt-2 !pb-4">Add new quiz</p>
              <div className="flex flex-col gap-3">
                <div className="relative border-[1px] rounded-lg">
                  <input
                    type="text"
                    id="floating_outlined"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=""
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                  <label
                    htmlFor="floating_outlined"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Your quiz name
                  </label>
                </div>
                <div className="relative border-[1px] rounded-lg">
                  <input
                    type="text"
                    id="floating_outlined"
                    className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
                  <label
                    htmlFor="floating_outlined"
                    className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    Description
                  </label>
                </div>
                <div className="my-3">
                  <Select
                    defaultValue={type}
                    onChange={setType}
                    options={options}
                    placeholder={"Quiz type..."}
                  />
                </div>
                <div className="form-group">
                  <label className="">Up load image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(event) => handleChangFile(event)}
                  ></input>
                </div>
              </div>
              <div className="mt-3">
                <button
                  className="btn btn-warning"
                  onClick={() => handleSubmitQuiz()}
                >
                  Save
                </button>
              </div>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div>
        <TableQuiz
          handleClickUpdateQuiz={handleClickUpdateQuiz}
          fetchListQuiz={fetchListQuiz}
          listQuiz={listQuiz}
          showModalUpdateQuiz={showModalUpdateQuiz}
          setShowModalUpdateQuiz={setShowModalUpdateQuiz}
          handleClickViewQuiz={handleClickViewQuiz}
          handleClickDeleteQuiz={handleClickDeleteQuiz}
        />
      </div>
      <ModelUpdateQuiz
        setDataUpdateQuiz={setDataUpdateQuiz}
        dataUpdateQuiz={dataUpdateQuiz}
        showModalUpdateQuiz={showModalUpdateQuiz}
        setShowModalUpdateQuiz={setShowModalUpdateQuiz}
        fetchListQuiz={fetchListQuiz}
      />
      <ModelViewQuiz
        dataViewQuiz={dataViewQuiz}
        showModalViewQuiz={showModalViewQuiz}
        setShowModalViewQuiz={setShowModalViewQuiz}
      />
      <ModalDeleteUser
        showModalDeleteQuiz={showModalDeleteQuiz}
        setShowModalDeleteQuiz={setShowModalDeleteQuiz}
        fetchListQuiz={fetchListQuiz}
        dataDeleteQuiz={dataDeleteQuiz}
      />
    </div>
  );
};
export default ManageQuiz;
