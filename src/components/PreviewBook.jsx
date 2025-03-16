import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BackButton from './buttons/BackButton';
import { supabase } from '../Essentials/Supabase';
import { Line } from 'rc-progress';
import DeleteBooksButton from './buttons/DeleteBooksButton';
import UpdateBtn from './buttons/UpdateBtn';
import ReadAgainBtn from './buttons/ReadAgainBtn';

export default function PreviewBook() {
    const location = useLocation();
    const navigate = useNavigate();
    const { book } = location.state || {};
    const backBtnClass = 'bg-gray-800 rounded-2xl p-1 text-white';

    const startReading = async(bookId) => {
        const updateValue = {
            toRead: false,
            currentRead: true,
            doneRead: false,
        }
        const {data} = await supabase.from('books').update({...book, ...updateValue}).eq('id',bookId).select();
        console.log(data);
        navigate('/dashboard');
    }
    
    useEffect(() => {
        console.log(book);
    },[]);

  return (
    <div className='w-full h-full p-3'>
        <div className='flex w-full'>
            <div className='w-[10%]'>
                <BackButton className={backBtnClass}/>
            </div>
            <div className='text-white w-[80%] flex flex-col items-center'>
                <h1 className='text-3xl font-sans text-center'>{book ? book.bookTitle : ''}</h1>
                <h1 className='text-sm font-sans text-center'>By: {book ? book.bookAuthor : ''}</h1>
            </div>
        </div>
        <div className='w-full h-full mt-2 p-2 rounded-md'>
            {book ? (
                <div className='text-white flex flex-col items-center'>
                    <div className='w-[10rem] h-[15rem] flex justify-center mb-2'>
                        <img className='w-full h-full rounded-2xl object-cover' src={book.bookCoverUrl} alt="" />
                    </div>
                    <p className='text-white text-sm font-thin text-center'>{book.bookDesc}</p>
                    <div className='flex gap-1 justify-center w-full mt-2 border-t py-2'>
                        <h1 className='text-xs'>&copy;</h1>
                        <h1 className='text-xs'>{book.pubYear}</h1>
                        <h1 className='text-xs'>{book.bookPublisher} -</h1>
                        <h1 className='text-xs'>{book.bookISBN}</h1>
                    </div>
                    <div className='mt-2 w-full flex flex-col'>
                        <Line percent={((book.currentPage/book.pageLength)*100)} strokeWidth={1} trailWidth={1}/>
                        <div className='flex justify-between w-full'>
                            <h1>{`${book.currentPage}/${book.pageLength}`}</h1>
                            <h1 className='text-white'>{(((book.currentPage/book.pageLength)*100).toFixed(2))}%</h1>
                        </div>
                        {(book.toRead && (
                            <div className='w-full flex gap-1'>
                                <DeleteBooksButton className={'w-full bg-gray-800 mt-1 py-1 rounded-md border-[2px] border-red-600'} bookId={book.id}/>
                                <button onClick={() => startReading(book.id)} className='w-full bg-gray-800 mt-1 py-2 rounded-md border-[2px] border-green-600'>Start Reading</button>
                                <UpdateBtn className={'w-full bg-gray-800 mt-1 py-2 rounded-md border-[2px] border-blue-600'} book={book}/>
                            </div>
                        ))}
                        {(book.currentRead && (
                            <div className='w-full flex gap-1'>
                                <DeleteBooksButton className={'w-full bg-gray-800 mt-1 py-2 rounded-md border-[2px] border-red-600'} bookId={book.id}/>
                                <UpdateBtn className={'w-full bg-gray-800 mt-1 py-2 rounded-md border-[2px] border-blue-600'} book={book}/>
                                <ReadAgainBtn className={'w-full bg-gray-800 mt-1 py-2 rounded-md border-[2px] border-green-600'} bookId={book.id} btnText={'Reset Book'}/>
                            </div>
                        ))}
                        {(book.doneRead && (
                            <div className='w-full flex gap-1'>
                                <DeleteBooksButton className={'w-full bg-gray-800 mt-1 py-2 rounded-md border-[2px] border-red-600'} bookId={book.id}/>
                                <ReadAgainBtn className={'w-full bg-gray-800 mt-1 py-2 rounded-md border-[2px] border-green-600'} bookId={book.id} btnText={'Read Again'}/>
                            </div>
                        ))}
                    </div>
                </div>
            ):(
                <>
                </>
            )}
        </div>
    </div>
  )
}
