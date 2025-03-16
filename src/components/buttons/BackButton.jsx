import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function BackButton({className}) {
    const navigate = useNavigate();

    const btnFunc = () => {
        navigate(-1);
    }
  return (
    <button onClick={btnFunc} className={className}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>
  )
}
