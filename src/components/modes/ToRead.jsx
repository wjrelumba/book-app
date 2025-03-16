import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LimitedText from '../LimitedText';
import EmptyMessage from '../EmptyMessage';

export default function ToRead({books}) {
  const [booksToRead, setBooksToRead] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleNavigation = (book) => {
    console.log(book);
    navigate('/preview-book', {state: {book}});
  };

  // Get to read books
  const getBooks = () => {
    const booksRead = books.filter(book => book.toRead);
    setBooksToRead(booksRead);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log(books);
    getBooks();
  },[])
  return (
    <div>
      {isLoading ? (
        <>
        </>
      ):(
        <>
        {(booksToRead && booksToRead.length > 0) ? 
        (
          <>
          <h1 className='text-white text-xl text-center mb-2 font-mono uppercase bg-gray-800 rounded-2xl py-2'>To Read</h1>
          <div className='flex w-full flex-col items-center h-full bg-gray-800 rounded-2xl p-2'>
            <div className='flex flex-col p-2 w-full'>
              {booksToRead.map((book) => (
                <div onClick={() => handleNavigation(book)} className='flex items-center justify-center mt-2 w-full h-full py-1 border-b-[2px] border-white' key={book.id}>
                  <div className='w-[60%] flex flex-col p-2'>
                    <h1 className='text-white text-lg mt-2 font-sans font-thin'>By: {book.bookAuthor}</h1>
                    <h1 className='text-white font-bold text-2xl font-sans uppercase'>{book.bookTitle}</h1>
                    <LimitedText text={(book.bookDesc ? book.bookDesc : '')} className={'text-white text-sm font-thin'}/>
                    <div className='mt-2'>
                    </div>
                  </div>
                  <img className='w-[8rem] h-[12rem] object-cover rounded-md' src={book.bookCoverUrl} alt="" />
                </div>
              ))}
            </div>
          </div>
          </>
        ):(
          <>
          <EmptyMessage/>
          <div className='w-full flex justify-center'>
            <Link className='border px-2 rounded-md py-2 flex justify-center items-center gap-1 text-white' to={'/add-book'}>
              <h1>
                Add a Book?
              </h1>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </Link>
          </div>
          
          </>
        )}
        </>
      )}
    </div>
  )
}
