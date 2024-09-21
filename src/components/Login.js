import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const dispatch = useDispatch();
    //data update
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const onNavigate = () => {
        navigate('/profile');
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
        onNavigate();
    };

    return (
        <div>
            {user ? (
                <h1>Welcome, {user.name}!</h1>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                    <button type="submit">Login</button>
                </form>
            )}
        </div>
        // <form onSubmit={handleSubmit}>
        //     <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        //     <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        //     <button type="submit">Login</button>
        // </form>
    );
};

export default Login;
