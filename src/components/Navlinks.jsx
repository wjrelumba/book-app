import React, { useState } from 'react'

export default function Navlinks({setToReadMode,setCurrentMode,setDoneMode}) {
    const [toReadActive, setToReadActive] = useState(true);
    const [currentlyActive, setCurrentlyActive] = useState(false);
    const [doneActive, setDoneActive] = useState(false);

    const toggleNavigation = (e) => {
        const {name} = e.currentTarget.dataset;
        console.log(name);
        switch(name){
            case 'toRead':
                setToReadMode(true);
                setCurrentMode(false);
                setDoneMode(false);
                setToReadActive(true);
                setCurrentlyActive(false);
                setDoneActive(false);
                break;
            case 'currentlyRead':
                setToReadMode(false);
                setCurrentMode(true);
                setDoneMode(false);
                setToReadActive(false);
                setCurrentlyActive(true);
                setDoneActive(false);
                break;
            case 'doneRead':
                setToReadMode(false);
                setCurrentMode(false);
                setDoneMode(true);
                setToReadActive(false);
                setCurrentlyActive(false);
                setDoneActive(true);
                break;
        }
    };
  return (
    <div className='w-full h-[3rem] grid grid-cols-3 gap-1 rounded-2xl p-1'>
        <div onClick={toggleNavigation} data-name='toRead' className={`flex hover:cursor-pointer justify-center items-center w-full ${toReadActive ? 'border-[2px] bg-white rounded-full':'text-white border border-white rounded-full'}`}>
            <h1 className='text-center font-mono'>To Read</h1>
        </div>
        <div onClick={toggleNavigation} data-name='currentlyRead' className={`flex hover:cursor-pointer justify-center items-center w-full ${currentlyActive ? 'border-[2px] bg-white rounded-full':'text-white border border-white rounded-full'}`}>
            <h1 className='text-center font-mono'>Ongoing</h1>
        </div>
        <div onClick={toggleNavigation} data-name='doneRead' className={`flex hover:cursor-pointer justify-center items-center w-full ${doneActive ? 'border-[2px] bg-white rounded-full':'text-white border border-white rounded-full' }`}>
            <h1 className='text-center font-mono'>Done</h1>
        </div>
    </div>
  )
}
