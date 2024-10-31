import React, { useState, useContext } from 'react';
import UserContext from '../hooks/userContext';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseURL from '../config/app.config';

function Login() {
    const [inputs, setInputs] = useState({});
    const [error, setError] = useState(null);
    const { user, setUser, isLoading } = useContext(UserContext);
    const navigate = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(`${BaseURL}/login`, {
                email: inputs.email,
                password: inputs.password
            });
            if (res.data.error) {
                return setError(res.data.error);
            }
            localStorage.setItem('token', res.data.access_token);
            setUser(res.data)
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (user && Object.keys(user).length !== 0) {
        return <Navigate to='/' replace />;
    }

    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',background:'#5662F9',color:'black' }}>
            <div style={{
                width: 'min(100%, 500px)',
                height: 'max-content',
                backgroundColor: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2rem',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
            }}>
                <div style={{
                    width: '200px',
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                  <img src="/logo-color.svg" style={{width:'100%',height:'100%',objectFit:'contain'}} />
                </div>
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                <form onSubmit={login} style={{ width: '100%' }}>
                    <input
                        type='email'
                        placeholder='E-mail'
                        value={inputs.email || ''}
                        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                        style={{
                            marginBlock: '20px',
                            padding: '20px',
                            width: '100%',
                            borderRadius: '4px',
                            border: '2px solid gray'
                        }}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        value={inputs.password || ''}
                        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                        style={{
                            padding: '20px',
                            width: '100%',
                            borderRadius: '4px',
                            border: '2px solid gray'
                        }}
                    />
                    <button type='submit' style={{
                        marginBlockStart: '3rem',
                        marginBlockEnd: '2rem',
                        padding: '20px',
                        width: '100%',
                        borderRadius: '4px',
                        backgroundColor: '#0081FE',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;