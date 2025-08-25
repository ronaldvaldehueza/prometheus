import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import userHTTPService from '../../services/userHTTPService';
import showMessage from '../../../libraries/messages/messages';
import User from '../../config/user';

interface RegisterProps {
    handleClick?: (connected: boolean) => void; // Made optional as it's unused
}

interface RegisterState {
    fullname: string;
    birthDate: string;
    address: string;
    telephone: string;
    username: string;
    password: string;
}

const Register: React.FC<RegisterProps> = ({ handleClick }) => {
    const history = useHistory();
    const initialState: RegisterState = {
        fullname: "",
        birthDate: "",
        address: "",
        telephone: "",
        username: "",
        password: ""
    };
    const { register, handleSubmit, errors } = useForm<RegisterState>();
    const [user, setUser] = useState<RegisterState>(initialState);

    useEffect(() => {
    }, []);

    const onSubmit = (data: RegisterState) => {
        // Incomplete functionality
        console.log(data);
        showMessage('Info', 'Register functionality is not implemented.', 'info');
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
                        <label>Fullname</label>
                        <input type="text" className="form-control" placeholder="Fullname" name="fullname" onChange={handleInputChange} value={user.fullname} ref={register({ required: true })} />
                    </div>
                    <div className="form-group">
                        <label>Birth Date</label>
                        <input type="date" className="form-control" name="birthDate" onChange={handleInputChange} value={user.birthDate} ref={register({ required: true })} />
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input type="text" className="form-control" placeholder="Address" name="address" onChange={handleInputChange} value={user.address} ref={register({ required: true })} />
                    </div>
                    <div className="form-group">
                        <label>Telephone</label>
                        <input type="text" className="form-control" placeholder="Telephone" name="telephone" onChange={handleInputChange} value={user.telephone} ref={register({ required: true })} />
                    </div>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Username" name="username" onChange={handleInputChange} value={user.username} ref={register({ required: true })} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input name="password" type="password" className="form-control" placeholder="Password" onChange={handleInputChange} value={user.password} ref={register({ required: true })} />
                    </div>
                    <button type="submit" className="btn btn-success btn-flat m-b-30 m-t-30"><i className="fas fa-sign-in"></i> Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;