import imgBackgroundLeft from './../../assets/bg2.jpg'
import '../Auth/Register.scss'
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/apiServices';
import { useState } from 'react';
import { toast } from 'react-toastify';
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
const Register = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [hiddenPassword, setHiddenPassword] = useState(false)
    const [hiddenRePassword, setHiddenRePassword] = useState(false)
    const [rePassword, setRePassword] = useState('')
    const [username, setUsername] = useState('')
    const setDefault = () => {
        setEmail('');
        setPassword('');
        setRePassword('');
        setUsername('');
    }
    const handleClickShowPassword = () => {
        setHiddenPassword(!hiddenPassword);
    };
    const handleClickShowRePassword = () => {
        setHiddenRePassword(!hiddenRePassword);
    };
    const handleSetPassword = (event) => {
        setPassword(event.target.value)
    }
    const clickSignin = async () => {
        if (password !== rePassword) {
            toast.error('Password does not match');
            return
        }
        let data = await postRegister(email, password, username)
        if (data && data.EC === 0) {
            toast.success(data.EM);
            setDefault();
            navigate('/login')
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }
    const navigate = useNavigate();
    return (
        <>
            <div className='register-main'>
                <div className="imageLeft">
                    <img src={imgBackgroundLeft} />
                </div>
                <div className="register-container">
                    <div className="header">
                        <spna>Already have an account?</spna>
                        <button
                            className="btnlogin"
                            onClick={() => navigate('/login')}
                        >Login</button>
                    </div>
                    <div className="title">
                        TuiLaHuan
                    </div>
                    <div className="welcome">
                        Get better data with conversational forms, surveys, quizzes & more.
                    </div>
                    <div className="form-content">
                        <div className="email">
                            <input
                                value={email}
                                placeholder='Email'
                                onChange={(event) => setEmail(event.target.value)}
                            ></input>
                        </div>
                        <div className="password">
                            <input
                                className='inputPassword'
                                id='password'
                                value={password}
                                placeholder="Password"
                                onChange={(event) => handleSetPassword(event)}
                                type={hiddenPassword ? "text" : "password"}
                            />
                            {hiddenPassword ?
                                <span className='icon-hidden'><Visibility onClick={() => handleClickShowPassword()} /></span>
                                :
                                <span className='icon-hidden'><VisibilityOff onClick={() => handleClickShowPassword()} /></span>}
                        </div>
                        <div className="password">
                            <input
                                value={rePassword}
                                placeholder='Re-enter password'
                                onChange={(event) => setRePassword(event.target.value)}
                                type={hiddenRePassword ? "text" : "password"}
                            />
                            {hiddenRePassword ?
                                <span className='icon-hidden'><Visibility onClick={() => handleClickShowRePassword()} /></span>
                                :
                                <span className='icon-hidden'><VisibilityOff onClick={() => handleClickShowRePassword()} /></span>
                            }
                        </div>
                        <div>
                            <input
                                value={username}
                                placeholder='Username'
                                onChange={(event) => setUsername(event.target.value)}></input>
                        </div>
                        <div>
                            <button onClick={() => clickSignin()}>Create account free</button>
                        </div>
                        <span
                            className='back'
                            onClick={() => navigate('/')}
                        >&#60;&#60;Go to home page</span>
                    </div>
                </div>
            </div>

        </>
    )
}
export default Register