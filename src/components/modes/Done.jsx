import { Line } from 'rc-progress';
import React, { useEffect, useState } from 'react'
import LimitedText from '../LimitedText';
import { useNavigate } from 'react-router-dom';
import EmptyMessage from '../EmptyMessage';

export default function Done({books}) {
  const [booksToRead, setBooksToRead] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const handleNavigation = (book) => {
    console.log(book);
    navigate('/preview-book', {state: {book}});
  };

  // Get to read books
  const getBooks = () => {
    const booksRead = books.filter(book => book.doneRead);
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
          <h1 className='text-white text-xl text-center mb-2 font-mono uppercase bg-gray-800 rounded-2xl py-2'>Done Reading</h1>
          <div className='flex w-full flex-col items-center h-full bg-gray-800 rounded-2xl p-2'>
            <div className='flex flex-col p-2 w-full'>
              {booksToRead.map((book) => (
                <div onClick={() => handleNavigation(book)} className='flex items-center justify-center w-full h-full py-1 mt-2 border-b-[2px] border-white' key={book.id}>
                  <div className='w-[60%] flex flex-col p-2'>
                    <h1 className='text-white text-lg mt-2 font-sans font-thin'>By: {book.bookAuthor}</h1>
                    <h1 className='text-white font-bold text-2xl font-sans uppercase'>{book.bookTitle}</h1>
                    <LimitedText text={(book.bookDesc ? book.bookDesc : '')} className={'text-white text-sm font-thin'}/>
                    <div className='mt-2'>
                    <Line percent={((book.currentPage/book.pageLength)*100)} strokeWidth={1} trailWidth={1}/>
                    <h1 className='text-white'>{(((book.currentPage/book.pageLength)*100).toFixed(2))}%</h1>
                    </div>
                  </div>
                  <img className='w-[8rem] h-[12rem] object-cover rounded-md' src={book.bookCoverUrl} alt="" />
                </div>
              ))}
            </div>
          </div>
          </>
        ):(
          <EmptyMessage/>
        )}
        </>
      )}
    </div>
  )
}
