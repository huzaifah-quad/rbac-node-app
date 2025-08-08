import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async () => {
    const res = await axios.post('http://localhost:4000/login', { username, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user_name', res.data.user_real_name);
    navigate('/');
  };

  return (
    <div className="login-box">
      <div className="card">
        <div className="card-body login-card-body">
          <p className="login-box-msg">Sign in</p>
          <div className="input-group mb-3">
            <input className="form-control" placeholder="Username"
              value={username} onChange={e=>setUsername(e.target.value)} />
          </div>
          <div className="input-group mb-3">
            <input type="password" className="form-control" placeholder="Password"
              value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <button className="btn btn-primary btn-block" onClick={submit}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}
