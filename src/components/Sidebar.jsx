import React, { useEffect, useState } from 'react'
import LogOutBtn from './buttons/LogOutBtn';
import { Link } from 'react-router-dom';

export default function Sidebar({shown,toggleSideBar}) {
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if(shown){
            console.log(shown);
            setHasLoaded(true);
        };
    },[shown]);
  return (
    <div className={`w-[50%] h-full top-0 bottom-0 bg-gray-800 fixed border-r-[2px] ${shown === false ? (hasLoaded ? 'slide-left-out' : 'ml-[-100%]') : 'slide-right'} p-2 flex flex-col`}>
        <div className='w-full flex justify-end items-center px-2 mb-2 text-white'>
            <svg onClick={toggleSideBar} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </div>
        <div className='flex'>
            <Link className='text-white border-b w-full mt-5' to={'/add-book'}>Add a book</Link>
        </div>
        <div className='flex'>
            <Link className='text-white border-b w-full mt-5' to={'/profile'}>View Profile</Link>
        </div>
        <div className='flex flex-col w-full items-start'>
            <LogOutBtn btnClass={'w-full flex justify-start text-white mt-5 border-b'}/>
        </div>
        <div className='fixed bottom-0 mb-2'>
            <h1 className='font-thin text-xs text-white'>&copy; Elumba, BookKeep 2024</h1>
        </div>
    </div>
  )
}
