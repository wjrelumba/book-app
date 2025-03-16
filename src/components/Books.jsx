import React from 'react'
import LogOutBtn from './buttons/LogOutBtn'

export default function Books({
    userEmail, 
    faveBooks, 
    addMode,
    formInputs,
    formTextArea,
    formFileInput,
    triggerAddMode,
    uploadToDB,
    toggleEdit
}) {
    const btnClass = 'w-full bg-gray-700 px-3 py-1 rounded-md text-white border-[2px] border-blue-400';
  return (
    <div className='flex flex-col h-full w-full'>
            {userEmail && (
                <>
                    <h1 className='text-center font-mono text-xl text-white border-b-[2px] border-white py-2 mb-2'>Welcome: {userEmail}</h1>
                </>
            )}
            <div className='flex justify-center w-full'>
                <h1 className='text-white text-md font-mono mb-1'>Your Favorite Books</h1>
            </div>
            {faveBooks && (
                <>
                    {faveBooks.map((book,index) => (
                        <>
                        <div className='p-2 bg-gray-800 rounded-md border-[2px] border-green-400' key={index}>
                            <div className='w-full border-b-[2px] border-green-400 items-end justify-between flex py-2 mb-1'>
                                <img className='h-[7rem] w-[4rem]' src={book.bookCoverUrl} alt="" />
                                <div className='flex flex-col w-[75%]'>
                                    <h1 className='w-full font-mono text-white text-3xl'>{book.bookTitle}</h1>
                                    <h1 className='w-full font-mono text-white text-md'>By: {book.bookAuthor}</h1>
                                </div>
                            </div>
                            <h1 className='w-full font-mono text-white text-md'>Publisher: {book.bookPublisher}</h1>
                            <h1 className='w-full font-mono text-white text-md'>ISBN: {book.bookISBN}</h1>
                            <h1 className='w-full font-mono text-white text-md'>Year: {book.pubYear}</h1>
                            <h1 className='w-full font-mono text-white text-md'>Description: {book.bookDesc}</h1>
                            <h1 className='w-full font-mono text-white text-md'>Price: {book.bookPrice}</h1>
                            <div className='flex w-full'>
                                <button onClick={() => {toggleEdit(book.id)}} className='w-1/2 text-white py-2 rounded-md border-[2px] border-green-400 mr-1'>Edit</button>
                                <button className='w-1/2 text-white py-2 rounded-md border-[2px] border-blue-400 ml-1'>Delete</button>
                            </div>
                        </div>
                        </>
                    ))}
                </>
            )}
            <div className='w-full h-[90%]'>
                {addMode ? (
                    <>
                        <div className='scale-up flex flex-col justify-center items-center overflow-hidden w-full h-full p-2 mt-2 bg-gray-800 border-[2px] border-green-400 rounded-md'>
                            <h1 className='text-white font-mono'>Add a book</h1>
                            <form onSubmit={uploadToDB} action="" className='flex flex-col w-full h-[90%] items-center overflow-auto'>
                                {formInputs('Book ID','text','bookId')};
                                {formInputs('Book Title','text','bookTitle')};
                                {formInputs('Book Author','text','bookAuthor')};
                                {formInputs('Book Publisher','text','bookPublisher')};
                                {formInputs('Book ISBN','text','bookISBN')};
                                {formInputs('Publication Year','number','pubYear')};
                                {formTextArea('Book Description','number','bookDesc')};
                                {formInputs('Book Price','number','bookPrice')};
                                {formFileInput('Book Cover','file','bookCover')};
                                <button type='submit' className='w-full h-[10%] px-3 py-1 bg-gray-800 border-[2px] border-blue-400 text-white rounded-md'>Add Book</button>
                            </form>
                            <button onClick={triggerAddMode} className='w-full h-[10%] px-3 py-1 bg-gray-800 border-[2px] border-blue-400 text-white rounded-md'>Cancel</button>
                        </div>
                    </>
                ):(
                    <>
                        <button onClick={triggerAddMode} className='text-white bg-gray-800 border-[2px] border-green-400 rounded-md mt-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        </button>
                    </>
                )}
            </div>
            <div className='w-full h-[10%] py-2 mb-2'>
                <LogOutBtn btnClass={btnClass}/>
            </div>
        </div>
  )
}
