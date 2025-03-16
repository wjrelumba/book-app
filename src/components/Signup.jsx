import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../Essentials/Supabase';
import { showErrorToast } from '../Essentials/ShowToast';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [username, setUsername] = useState('');

  const signUpNewUser = async(e) => {
    e.preventDefault();
    if(password.length > 0, email.length > 0, confPassword.length > 0){
      if(password == confPassword){
        if(password.length < 6){
          showErrorToast('Password length must be greater than 6')
        }else{
          const { data:{session}, error } = await supabase.auth.signUp({
            email: email,
            password: password,
          })
          if(session){
            const {data} = await supabase.from('profile').insert({username:username, id: session.user.id});
            navigate('/dashboard');
          };
        };
      }else{
        showErrorToast('Passwords do not match.')
      };
    }else{
      showErrorToast('Complete all input fields');
    };
  };

  const inputHandler = (e) => {
    const {value,name} = e.target;
    switch (name){
      case 'username':
        console.log(`Email: ${value}`);
        setUsername(value);
        break;
      case 'email':
        console.log(`Email: ${value}`);
        setEmail(value);
        break;
      case 'password':
        console.log(`Password: ${value}`);
        setPassword(value);
        break;
      case 'confPassword':
        console.log(`Confirm Password: ${value}`);
        setConfPassword(value);
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
        <h1 className='text-white text-5xl font-mono mb-2'>Signup</h1>
        <h1 className='font-thin text-sm mb-5 text-white'>Come join and Record your books!</h1>
        <form onSubmit={signUpNewUser} className='flex flex-col justify-center items-center w-full slide-up-fade-in'>
        <div className='w-[75%] flex flex-col items-start justify-between px-2'>
            <label className='text-white font-mono text-sm mt-1' htmlFor="username">Username:</label>
            <input onChange={inputHandler} name='username' className='px-2 py-1 rounded-md w-full' type="text" />
          </div>
          <div className='w-[75%] flex flex-col items-start justify-between px-2'>
            <label className='text-white font-mono text-sm mt-1' htmlFor="email">Email:</label>
            <input onChange={inputHandler} name='email' className='px-2 py-1 rounded-md w-full' type="email" />
          </div>
          <div className='w-[75%] flex flex-col items-start justify-between px-2'>
            <label className='text-white font-mono text-sm mt-1' htmlFor="password">Password</label>
            <input onChange={inputHandler} name='password' className='px-2 py-1 rounded-md w-full' type="password" />
          </div>
          <div className='w-[75%] flex flex-col items-start justify-between px-2'>
            <label className='text-white font-mono text-sm mt-1' htmlFor="confPassword">Confirm Password</label>
            <input onChange={inputHandler} name='confPassword' className='px-2 py-1 rounded-md w-full' type="password" />
          </div>
          <div className='w-[75%] flex justify-between px-2 mt-2'>
            <Link to={'/'} className='flex justify-center px-3 py-2 bg-blue-700 w-1/2 mr-1 rounded-md text-white'>Cancel</Link>
            <button className='flex justify-center px-3 py-2 bg-green-700 w-1/2 ml-1 rounded-md text-white'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  )
}
