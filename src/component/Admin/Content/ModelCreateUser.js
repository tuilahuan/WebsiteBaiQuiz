import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { postCreateNewUser } from "../../../services/apiServices";

const ModelCreateUser = (props) => {
  const { show, setShow } = props;

  const handleClose = () => {
    setShow(false);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setImage("");
    setPreViewImage("");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("USER");
  const [image, setImage] = useState("");
  const [preViewImage, setPreViewImage] = useState("");

  const handldeUploadImage = (event) => {
    if (event.target && event.target.files && event.target.files[0]) {
      setPreViewImage(URL.createObjectURL(event.target.files[0]));
      setImage(event.target.files[0]);
      console.log("up load fil e");
    } else {
      setPreViewImage("");
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handlSubmitCreateUser = async () => {
    const isValidEmail = validateEmail(email);
    // if (!isValidEmail) {
    //     toast.error('Invalid email')
    //     return;
    // }

    if (!password) {
      toast.error("Invalid password");
      return;
    }

    let data = await postCreateNewUser(email, password, username, role, image);
    console.log(">>>check res", data);
    if (data && data.EC === 0) {
      toast.success("Add user success");
      handleClose();
      props.setCurrentPage(1);
      await props.fetchListUserWithPaginate(1);
    } else if (data && data.EC !== 0) {
      toast.error(data.EM);
      return;
    }
  };
  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
                Add new user
            </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                onChange={(event) => setRole(event.target.value)}
              >
                <option value="USER">USER</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>
            <div className="col-md-12">
              <label
                className="form-label label-upload"
                htmlFor="labelUpload"
                value={image}
              >
                <FcPlus /> Upload File Image
              </label>
              <input
                type="file"
                id="labelUpload"
                hidden
                onChange={(event) => handldeUploadImage(event)}
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handlSubmitCreateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelCreateUser;
