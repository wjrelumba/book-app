import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function UpdateBtn({className,book}) {
    const navigate = useNavigate();

    const clickFunc = () => {
        navigate('/update-book', {state: {book}});
    };

  return (
    <button onClick={clickFunc} className={className}>Update Book</button>
  )
}
