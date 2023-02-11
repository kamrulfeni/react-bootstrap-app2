import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from './fireBase.init';

const auth = getAuth(app)

const RegisterReactBootstrap = () => {
  const [passwordError, setPasswordError] = useState('');
  const [success, setSuccess] = useState(false);
  const handleRegister = event => {
    event.preventDefault();
    setSuccess(false);

    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);

    // valid password
    if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
      setPasswordError('Please provide at least two uppercase');
      return 0;
    }
    if (password.length < 8) {
      setPasswordError('Please should be at least 8 characters');
      return 0;
    }

    if (!/(?=.*[!@#$&*])/.test(password)) {
      setPasswordError('Please add  at least one special character');
      return 0;
    }
    setPasswordError('');
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        setSuccess(true);
        form.reset();
        verifyEmail();
        updateUserName(name);
      })
      .catch(error => {
        console.error('error', error);
        setPasswordError(error.message)
      })
  }
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        alert('Please check your email and verify.')
      })
  }

  const updateUserName = (name)=>{
   updateProfile(auth.currentUser,{
    displayName: name 
   })
   .then( () => {
    console.log('display name update')
   })
   .catch( error => console.error(error))
  }
  return (
    <div className='w-50 mx-auto'>
      <h3 className='text-primary'>Please Register!!</h3>
      <Form onSubmit={handleRegister}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Your Name</Form.Label>
          <Form.Control type="name" name='name' placeholder="Enter your name" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name='email' placeholder="Enter email" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name='password' placeholder="Password" required />
        </Form.Group>
        <p className='text-danger'>{passwordError}</p>
        {success && <p className='text-success'>User Created Successfully</p>}
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      <p><small>Already have an account ? Please <Link to='/login'>Log in</Link></small></p>
    </div>
  );
};

export default RegisterReactBootstrap;