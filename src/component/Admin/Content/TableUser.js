const TableUser = (props) => {
    const { listUsers, handleClickUpdate, handleClickView, handleClickDelete } = props;
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                {listUsers && listUsers.length > 0 && listUsers.map((item, index) => {
                    return (
                        <thead>
                            <tr key={`table-users-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>@{item.role}</td>
                                <td>
                                    <button className='btn btn-secondary' onClick={() => handleClickView(item)}> View </button>
                                    <button className='btn btn-warning mx-3' onClick={() => handleClickUpdate(item)}> Update </button>
                                    <button className='btn btn-danger' onClick={() => handleClickDelete(item)}> Delete </button>
                                </td>
                            </tr>
                        </thead>

                    )
                })}
                {listUsers && listUsers.length === 0 &&
                    <thead>
                        <tr>
                            <td colSpan={'4'}>
                                Not found data
                            </td>
                        </tr>
                    </thead>}
            </table>
        </>
    )
}
export default TableUser