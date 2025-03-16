import React, { useEffect, useState } from 'react'
import { supabase } from '../Essentials/Supabase'
import { useNavigate } from 'react-router-dom';
import BackButton from './buttons/BackButton';
import { showErrorToast } from '../Essentials/ShowToast';
import { Randomizer } from './Randomizer';

export default function ProfilePage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    const [dpLink, setDpLink] = useState(null);
    const [email, setUserEmail] = useState(null);
    const [updateMode, setUpdateMode] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [userId, setUserId] = useState(null);

    const backBtnClass = 'bg-gray-800 rounded-2xl p-1 text-white';

    const updateModeChanger = () => {
        setUpdateMode(!updateMode);
    }

    const getUserSession = async() => {
        const {data:{session}} = await supabase.auth.getSession();
        if(!session){
            navigate('/');
        }
        else{
            console.log(session);
            setUserEmail(session.user.email);
            setUserId(session.user.id);
            const {data} = await supabase.from('profile').select().eq('id',session.user.id);
            if(data){
                if(data[0]){
                    setUsername(data[0].username);
                    setDpLink(data[0].profileDP);
                }
            }
        }
    };

    const inputHandler = (e) => {
        const {value,name,files} = e.target;
        switch(name){
            case 'username':
                setUsername(value);
                break;
            case 'profilePicture':
                setProfilePicture(files[0]);
                break;
        };
      };

      const uploadToDB = async(e) => {
        e.preventDefault();
        if(username){
            const uuid = Randomizer();
            if(profilePicture){
                const {error} = await supabase.storage.from('dplinks').upload(`${uuid}`, profilePicture, {
                    upsert: true,
                });
                console.log(error);
                const {data:{publicUrl}} = supabase.storage.from('dplinks').getPublicUrl(`${uuid}`);
                const {data} = await supabase.from('profile').update({
                    username: username,
                    profileDP: publicUrl,
                }).eq('id',userId);
                navigate('/dashboard');
            }
            else{
                const {data,error} = await supabase.from('profile').update({
                    username: username,
                }).eq('id',userId);
                navigate('/dashboard');
            }
        }
        else{
            showErrorToast('Please input a username');
        }
      }

    const formInputs = (label,type,name,placeholder) => (
        <div className='w-full flex items-center text-white mb-1'>
            <label className='w-[35%]' htmlFor={name}>{label}</label>
            <input placeholder={placeholder} onChange={inputHandler} className='w-[65%] rounded-md px-2 py-1 text-black' type={type} name={name}/>
        </div>
      );
      
      const formFileInput = (label,type,name) => (
        <div className='w-full flex items-center text-white'>
            <label className='w-[35%]' htmlFor={name}>{label}</label>
            <input onChange={inputHandler} className='w-[65%] rounded-md py-1 file:bg-gray-700 file:py-1 file:text-white file:rounded-md file:border-[2px] file:border-green-400 text-white' name={name} type={type} accept='image/*'/>
        </div>
      );

      const cancelBtn = () => {
        navigate(-1);
      };

    useEffect(() => {
        getUserSession();
    },[])
  return (
    <div className='p-2'>
        <div className='flex w-full mb-4'>
            <div className='w-[10%]'>
                <BackButton className={backBtnClass}/>
            </div>
            <div className='text-white w-[80%] flex flex-col items-center'>
                <h1 className='text-3xl font-sans text-center'>Profile Page</h1>
            </div>
        </div>
        {!updateMode ? (
            <>
                <div className='flex flex-col gap-1 items-center'>
                    <img className='w-[10rem] h-[10rem] rounded-full' src={dpLink ? dpLink : '/profileIcon.jpg'} alt="" />
                    <h1 className='text-white text-2xl font-sans'>{username ? username: ""}</h1>
                    <h1 className='text-white text-xl font-sans'>{email ? email:""}</h1>
                    <button onClick={updateModeChanger} className='bg-gray-800 py-2 px-1 w-[75%] rounded-md text-white border-[2px] border-green-600'>Update Profile</button>
                </div>
            </>
        ):(
            <>
                <div className='w-full gap-1 flex flex-col items-center'>
                    {formInputs('Username:','text','username',username)}
                    {formFileInput('Profile Picture','file','profilePicture')}
                    <button onClick={uploadToDB} className='bg-gray-800 py-2 px-1 w-full rounded-md text-white border-[2px] border-green-600'>Update Profile</button>
                    <button onClick={cancelBtn} className='w-full h-[10%] px-3 py-1 bg-gray-800 border-[2px] border-red-600 text-white rounded-md'>Cancel</button>
                </div>
            </>
        )}
    </div>
  )
}
