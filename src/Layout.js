import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import App from './App';
import User from './component/User/User';
import Admin from './component/Admin/Admin';
import HomePage from './component/Home/HomePage';
import DashBoard from './component/Admin/Content/DashBoard';
import ManageUser from './component/Admin/Content/ManageUser';
import Login from './component/Auth/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './component/Auth/Register';

const Layout = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />} >
                    <Route index element={<HomePage />} />
                    <Route path="user" element={<User />} />
                </Route>
                <Route path="/admins" element={<Admin />} >
                    <Route index element={<DashBoard />} />
                    <Route path='manage-users' element={<ManageUser />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
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
    )
}
export default Layout