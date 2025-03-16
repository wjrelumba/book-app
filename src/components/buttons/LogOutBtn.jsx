import React from 'react'
import { supabase } from '../../Essentials/Supabase'
import { showErrorToast, showSuccessToast } from '../../Essentials/ShowToast';
import { useNavigate } from 'react-router-dom';

export default function LogOutBtn({btnClass}) {
    const navigate = useNavigate();
    const logOut = async() => {
        await supabase.auth.signOut();
        showSuccessToast('Successfully logged out');
        localStorage.clear();
        navigate('/');
    }
  return (
    <button className={btnClass} onClick={logOut}>Log Out</button>
  )
}
