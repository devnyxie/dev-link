import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../Redux/Actions/users';
import { useNavigate } from 'react-router-dom';

function Login_View({ user, isLoggedIn }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (result === true) {
      navigate('/');
    }
    if (isLoggedIn) {
      navigate('/');
    }
  }, [result, user, isLoggedIn]);
  return (
    <div className='w-100 h-100 d-flex flex-column flex-fill justify-content-center align-items-center'>
      <Form.Group className='mb-3' controlId='formPlaintextEmail'>
        <Form.Label className='small'>Username</Form.Label>
        <Form.Control
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>

      <Form.Group className='mb-3' controlId='formPlaintextPassword'>
        <Form.Label className='small'>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <div
        className='rounded p-1 border-gray custom-button'
        onClick={() => {
          if (username && password) {
            dispatch(login({ username, password, setResult }));
          }
        }}
      >
        Sign in
      </div>
      <span>or</span>
      <Link to='/register' className='text-secondary'>
        Create an account
      </Link>
    </div>
  );
}

export default Login_View;
