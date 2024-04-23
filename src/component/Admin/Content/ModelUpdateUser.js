import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FcPlus } from "react-icons/fc";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../services/apiServices";
import _ from "lodash";
const ModelUpdateUser = (props) => {
  const { show, setShow, dataUpdate, setDataUpdate } = props;

  const handleClose = () => {
    setShow(false);
    setDataUpdate([]);
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

  const handlSubmitUpdateUser = async () => {
    let data = await putUpdateUser(dataUpdate.id, username, role, image);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      handleClose();
      await props.fetchListUserWithPaginate(props.currenPage);
    }
    if (data && data.EC !== 0) {
      toast.error(data.EM);
      return;
    }
  };

  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      setEmail(dataUpdate.email);
      setUsername(dataUpdate.username);
      setRole(dataUpdate.role);
      setImage("");
      if (dataUpdate.image) {
        setPreViewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      }
    }
  }, [dataUpdate]);
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
          <Modal.Title>Update a user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                disabled={true}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlhtmlFor="inputPassword4" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                value={password}
                disabled
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
                htmlhtmlFor="labelUpload"
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
          <Button variant="primary" onClick={() => handlSubmitUpdateUser()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModelUpdateUser;
