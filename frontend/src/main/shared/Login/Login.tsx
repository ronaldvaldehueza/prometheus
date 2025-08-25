import React, { useEffect, useState } from 'react';
import './Login.css';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import userHTTPService from '../../services/userHTTPService';
import showMessage from '../../../libraries/messages/messages';
import User from '../../config/user';
import { AxiosResponse } from 'axios';

interface LoginProps {
  handleClick: (connected: boolean) => void;
}

interface UserState {
  username?: string;
  password?: string;
}

const Login: React.FC<LoginProps> = ({ handleClick }) => {
  const history = useHistory();
  const userInit: UserState = { username: "admin", password: "admin" };
  const { register, handleSubmit, errors } = useForm<UserState>();
  const [user, setUser] = useState<UserState>(userInit);

  useEffect(() => {
  }, []);

  const registerPage = () => {
    history.replace("/register");
  };

  const onSubmit = (data: UserState) => {
    userHTTPService.login({ username: user.username, password: user.password })
      .then((response: AxiosResponse<any>) => {
        setUser(userInit);
        if (Object.keys(response.data).length !== 0) {
          handleClick(true);
          User.USER_DETAIL = response.data;
          localStorage.setItem('connected', String(User.CONNECTED_USER));
          history.push("/dashboard");
        } else {
          User.CONNECTED_USER = false;
          showMessage('Error', 'You have entered an invalid username or password', 'warning');
        }
      })
      .catch(e => {
        showMessage('Error', "HTTP_ERR_MESSAGE", 'warning');
      });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <div className="login-content" style={{ display: !User.CONNECTED_USER ? 'block' : 'none' }}>
      <div className="login-form">
        <div className="login-logo">
          <img className="align-content" src="/images/logo.png" alt="" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} method="post">
          <div className="form-group">
            <label>Username</label>
            <input type="text" className="form-control" placeholder="Email" name="username" onChange={handleInputChange} value={user.username} ref={register({ required: true })} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" className="form-control" placeholder="Password" onChange={handleInputChange} value={user.password} ref={register({ required: true })} />
          </div>
          <button type="submit" className="btn btn-success btn-flat m-b-30 m-t-30"><i className="ti-user"></i> Sign in</button>
          <button type="button" onClick={registerPage} className="btn social facebook btn-primary btn-addon mb-3"><i className="ti-pin"></i>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
