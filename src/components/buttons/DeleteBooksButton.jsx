import React from 'react'
import { supabase } from '../../Essentials/Supabase'
import { useNavigate } from 'react-router-dom';

export default function DeleteBooksButton({className,bookId}) {
  const navigate = useNavigate();

  const delBooks = async() => {
    const {data} = await supabase.from('books').delete().eq('id',bookId);
    navigate(-1);
  }

  return (
    <button onClick={delBooks} className={className}>Delete Book</button>
  )
}
