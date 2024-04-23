import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Admin from "./component/Admin/Admin";
import HomePage from "./component/Home/HomePage";
import DashBoard from "./component/Admin/Content/DashBoard";
import ManageUser from "./component/Admin/Content/ManageUser";
import Login from "./component/Auth/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./component/Auth/Register";
import ListQuiz from "./component/User/ListQuiz";
import DetailQuiz from "./component/User/DetailQuiz";
import ManageQuiz from "./component/Admin/Content/Quiz/ManageQuiz";
import "./index.css";
import Questions from "./component/Admin/Content/Question.js/Questions";
const NotFound = () => {
  return (
    <div className="container mt-5 alert alert-danger">
      404.Not found data with your current URL
    </div>
  );
};
const Layout = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="user" element={<ListQuiz />} />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />

        <Route path="/admins" element={<Admin />}>
          <Route index element={<DashBoard />} />
          <Route path="manage-users" element={<ManageUser />} />
          <Route path="manage-quizzes" element={<ManageQuiz />} />
          <Route path="manage-question" element={<Questions />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
};
export default Layout;
