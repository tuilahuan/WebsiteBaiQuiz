import ReactPaginate from "react-paginate";

const TableUserPaginate = (props) => {
  const {
    listUsers,
    handleClickUpdate,
    handleClickView,
    handleClickDelete,
    fetchListUserWithPaginate,
    pageCount,
  } = props;

  const handlePageClick = (event) => {
    fetchListUserWithPaginate(+event.selected + 1);
    props.setCurrentPage(+event.selected + 1);
    console.log(`User requested page number ${event.selected}`);
  };
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
        {listUsers &&
          listUsers.length > 0 &&
          listUsers.map((item, index) => {
            return (
              <thead>
                <tr key={`table-users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td>@{item.role}</td>
                  <td>
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleClickView(item)}
                    >
                      {" "}
                      View{" "}
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleClickUpdate(item)}
                    >
                      {" "}
                      Update{" "}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleClickDelete(item)}
                    >
                      {" "}
                      Delete{" "}
                    </button>
                  </td>
                </tr>
              </thead>
            );
          })}
        {listUsers && listUsers.length === 0 && (
          <thead>
            <tr>
              <td colSpan={"4"}>Not found data</td>
            </tr>
          </thead>
        )}
      </table>
      <div className="user-pagination">
        <ReactPaginate
          nextLabel="Next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< Prev"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={props.currentPage - 1}
        />
      </div>
    </>
  );
};
export default TableUserPaginate;
