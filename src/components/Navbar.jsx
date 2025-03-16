import React from 'react'

export default function Navbar({toggleSideBar,dpLink}) {
  return (
    <div className='absolute w-full p-2 border-white border-b-[2px] bg-gray-800 h-[5rem] grid grid-cols-3'>
        <div className='w-full h-full flex items-center'>
            <button onClick={toggleSideBar} className='text-white bg-white p-[0.1rem] rounded-full'>
                <img src={dpLink ? dpLink: '/profileIcon.jpg'} className='w-[2.5rem] h-[2.5rem] rounded-full' alt="" />
                {/* <svg onClick={toggleSideBar} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg> */}
            </button>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
            <img src="/BookKeep-img-noBg.png" className='w-[3.5rem] h-[3.5rem]' alt="" />
        </div>
    </div>
  )
}
