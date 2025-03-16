import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../Essentials/Supabase'
import { showErrorToast } from '../Essentials/ShowToast';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInWithEmail = async(e) => {
    e.preventDefault();
    if(password.length > 0, email.length > 0){
      const { data:{session}, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
      if(session){
        navigate('/dashboard');
      };
      if(error){
        showErrorToast(error.message);  
      }
    };
  }

  const inputHandler = (e) => {
    const {value,name} = e.target;
    switch (name){
      case 'email':
        console.log(`Email: ${value}`);
        setEmail(value);
        break;
      case 'password':
        console.log(`Password: ${value}`);
        setPassword(value);
        break;
    };
  };

  const getUserSession = async() => {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log(session);
        if (session) {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error("Error fetching session:", error);
        // Optionally handle the error, e.g., show a message or navigate to an error page
      }
  };
  
  useEffect(() => {
    getUserSession();
  },[]);

  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center w-full h-full bg-gradient-to-br from-blue-800 to-green-800 p-2 rounded-md'>
        <h1 className='text-white text-5xl font-mono mb-5'>Login</h1>
        <form onSubmit={signInWithEmail} className='slide-up-fade-in w-full flex justify-center flex-col items-center'>
          <div className='w-[75%] flex flex-col items-start justify-between px-2'>
            <label className='text-white font-mono text-xl' htmlFor="email">Email:</label>
            <input onChange={inputHandler} name='email' className='px-2 py-1 rounded-md w-full' type="email" />
          </div>
          <div className='w-[75%] flex flex-col items-start justify-between px-2'>
            <label className='text-white font-mono text-xl' htmlFor="password">Password</label>
            <input onChange={inputHandler} name='password' className='px-2 py-1 rounded-md w-full' type="password" />
          </div>
          <div className='w-[75%] flex justify-between px-2 mt-2'>
            <Link to={'/'} className='flex justify-center px-3 py-2 bg-blue-700 w-1/2 mr-1 rounded-md text-white'>Cancel</Link>
            <button className='flex justify-center px-3 py-2 bg-green-700 w-1/2 ml-1 rounded-md text-white'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}
