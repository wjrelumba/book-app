import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../Essentials/Supabase';
import { showErrorToast } from '../Essentials/ShowToast';

export default function Homepage() {
  const navigate = useNavigate();

  const getUserSession = async() => {
    try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log(session);
        if (session) {
          navigate('/dashboard');
        }
      } catch (error) {
        showErrorToast(("Error fetching session:", error));
        // Optionally handle the error, e.g., show a message or navigate to an error page
      }
  };
  
  useEffect(() => {
    getUserSession();
  },[]);

  return (
    <div className='w-screen h-screen p-2'>
        <div className='w-full h-full flex flex-col items-center justify-start'>
            <img className='' src="./BookKeep-noBG.png" alt="" />
            <div className='flex flex-col items-center justify-center w-full'>
              <Link className='flex justify-center border-[2px] border-green-400 px-3 py-2 bg-gray-900 rounded-md text-white w-[75%] mb-1' to={'/login'}>Login</Link>
              <Link className='flex justify-center border-[2px] border-blue-400 px-3 py-2 bg-gray-900 rounded-md text-white w-[75%] mt-1' to={'/signup'}>Signup</Link>
            </div>
        </div>
    </div>
  );
};
