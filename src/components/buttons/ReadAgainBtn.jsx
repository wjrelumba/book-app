import React from 'react'
import { supabase } from '../../Essentials/Supabase'
import { useNavigate } from 'react-router-dom';

export default function ReadAgainBtn({className,bookId,btnText}) {
    const navigate = useNavigate();

    const clickFunc = async() => {
        const {data} = await supabase.from('books').update({
            currentPage: 0,
            toRead: true,
            currentRead: false,
            doneRead: false,
        }).eq('id',bookId);
        navigate(-1);
    };
  return (
    <button onClick={clickFunc} className={className}>{btnText}</button>
  )
}
