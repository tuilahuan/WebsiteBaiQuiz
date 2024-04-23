import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteQuiz } from "../../../../services/apiServices";
import { toast } from "react-toastify";
const ModalDeleteUser = (props) => {
  const {
    showModalDeleteQuiz,
    setShowModalDeleteQuiz,
    dataDeleteQuiz,
    fetchListQuiz,
  } = props;
  const handleClose = () => {
    setShowModalDeleteQuiz(false);
  };

  const handleSubmitDeleteQuiz = async () => {
    let res = await deleteQuiz(dataDeleteQuiz);
    if (res && res.EC === 0) {
      toast.error("Delete quiz success");
      fetchListQuiz();
      handleClose();
    }
  };
  return (
    <>
      <Modal show={showModalDeleteQuiz} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Confirm delete the user?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {console.log(dataDeleteQuiz)}
          Are you sure to delete this user.email ={" "}
          <b>{dataDeleteQuiz && dataDeleteQuiz.id ? dataDeleteQuiz.id : ""}</b>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => handleClose()}
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Close
          </button>
          <button
            onClick={() => handleSubmitDeleteQuiz()}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
