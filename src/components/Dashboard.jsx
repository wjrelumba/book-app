import React, { useEffect, useState } from 'react'
import { showErrorToast } from '../Essentials/ShowToast';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { supabase } from '../Essentials/Supabase';
import Navlinks from './Navlinks';
import ToRead from './modes/ToRead';
import Currently from './modes/Currently';
import Done from './modes/Done';

export default function Dashboard() {
    const [showSidebar, setShowSidebar] = useState(false);
    const [username, setUsername] = useState(null);
    const [dpLink, setDpLink] = useState(null);
    const [books, setBooks] = useState(null);
    
    const [toReadMode, setToReadMode] = useState(true);
    const [currentMode, setCurrentMode] = useState(false);
    const [doneMode, setDoneMode] = useState(false);

    const navigate = useNavigate();

    const toggleSideBar = () => {
        setShowSidebar(!showSidebar);
    };

    const getUserSession = async() => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if(session) {
                console.log(session);
                const {data:bookData, error:bookError} = await supabase.from('books').select().eq('user_id',session.user.id);
                if(bookData){
                    setBooks(bookData);
                }
                if(bookError){
                    console.log(bookError);
                }
                const {data:usernameData} = await supabase.from('profile').select().eq('id', session.user.id);
                if(usernameData){
                    console.log(usernameData);
                    setUsername(usernameData[0].username);
                    setDpLink(usernameData[0].profileDP);
                }
            }else{
                navigate('/');
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
  <>
    <div className='w-full h-full absolute mt-[5rem]'>
        <div className='flex flex-col p-2'>
            <h1 className='text-white text-2xl mb-1 font-sans'>Welcome back, {username ? username : ''}!</h1>
            <Navlinks setToReadMode={setToReadMode} setCurrentMode={setCurrentMode} setDoneMode={setDoneMode}/>
        </div>
        <div className='p-2'>
            {books && (
                <>
                    {toReadMode && (
                        <ToRead books={books}/>
                    )}
                    {currentMode && (
                        <Currently books={books}/>
                    )}
                    {doneMode && (
                        <Done books={books}/>
                    )}
                </>
            )}
        </div>
    </div>
    <Navbar toggleSideBar={toggleSideBar} dpLink={dpLink}/>
    <Sidebar shown={showSidebar} toggleSideBar={toggleSideBar}/>
  </>
  )
}
