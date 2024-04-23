import { useEffect, useState } from "react";
const TableQuiz = (props) => {
  const {
    handleClickUpdateQuiz,
    fetchListQuiz,
    listQuiz,
    handleClickViewQuiz,
    handleClickDeleteQuiz,
  } = props;
  useEffect(() => {
    fetchListQuiz();
  }, []);

  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                  <tr>
                    <th scope="col" className=" px-6 py-4">
                      ID
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Description
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Difficulty
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Handle
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {listQuiz && listQuiz.length > 0 ? (
                    listQuiz.map((item, index) => {
                      return (
                        <tr
                          className="border-b dark:border-neutral-500"
                          key={index}
                        >
                          <td className="whitespace-nowrap px-6 py-4 font-medium">
                            {item.id}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {item.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {item.description}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {item.difficulty}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <button
                              onClick={() => handleClickViewQuiz(item)}
                              type="button"
                              className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            >
                              View
                            </button>
                            <button
                              className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900"
                              onClick={() => handleClickUpdateQuiz(item)}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleClickDeleteQuiz(item.id)}
                              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TableQuiz;
