import ModelCreateUser from "./ModelCreateUser"
import './ManageUser.scss'
import { FcPlus } from 'react-icons/fc'
import TableUser from './TableUser'
import { useEffect, useState } from 'react';
import { getAllUsers, getUserWithPaginate } from '../../../services/apiServices';
import ModelUpdateUser from "./ModelUpdateUser";
import ViewUser from "./ViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {

    const LIMIT_USER = 6;
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [showModalCreateUser, setShowModalCreateUser] = useState(false)
    const [listUsers, setListUsers] = useState([])
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false)
    const [dataUpdate, setDataUpdate] = useState([])
    const [dataView, setDataView] = useState([])
    const [showModalView, setShowModalView] = useState(false)

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false)
    const [dataDelete, setDataDelete] = useState([])

    const handleShowModalCreateUser = (value) => {
        setShowModalCreateUser(value)
    }
    useEffect(async () => {
        // fetchListUser()
        fetchListUserWithPaginate(1)
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUsers(res.DT)
        }
    }
    const fetchListUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            console.log('res.data', res.DT.users)
            setListUsers(res.DT.users)
            setPageCount(res.DT.totalPages)
        }
    }

    const handleClickUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }

    const handleClickView = (user) => {
        setShowModalView(true);
        setDataView(user);
    }

    const handleClickDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    }
    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="user-content">
                <div className="btn-add-new">
                    <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}>
                        <FcPlus />
                        Add new users</button>
                </div>
                <div className="table-user">
                    {/* <TableUser listUsers={listUsers}
                        handleClickUpdate={handleClickUpdate}
                        handleClickView={handleClickView}
                        handleClickDelete={handleClickDelete}
                    /> */}
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickUpdate={handleClickUpdate}
                        handleClickView={handleClickView}
                        handleClickDelete={handleClickDelete}
                        fetchListUserWithPaginate={fetchListUserWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage} />
                </div>
                <ModelCreateUser
                    show={showModalCreateUser}
                    setShow={handleShowModalCreateUser}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    pageCount={pageCount}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage} />
            </div>
            <ModelUpdateUser
                show={showModalUpdateUser}
                setShow={setShowModalUpdateUser}
                dataUpdate={dataUpdate}
                fetchListUser={fetchListUser}
                setDataUpdate={setDataUpdate}
                fetchListUserWithPaginate={fetchListUserWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage} />
            <ViewUser
                show={showModalView}
                setShow={setShowModalView}
                dataView={dataView}
                setdataView={setDataView}
            />
            <ModalDeleteUser
                show={showModalDeleteUser}
                setShow={setShowModalDeleteUser}
                dataDelete={dataDelete}
                fetchListUser={fetchListUser}
                fetchListUserWithPaginate={fetchListUserWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}
export default ManageUser