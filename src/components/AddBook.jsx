import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../Essentials/Supabase';
import { showErrorToast } from '../Essentials/ShowToast';
import { Randomizer } from './Randomizer';

export default function AddBook() {
    const navigate = useNavigate();
    const [userEmail, setUserMail] = useState(null);
    const [addMode, setAddMode] = useState(false);
    const [bookId, setBookId] = useState(null);
    const [bookTitle, setBookTitle] = useState(null);
    const [bookAuthor, setBookAuthor] = useState(null);
    const [bookPublisher, setBookPublisher] = useState(null);
    const [bookISBN, setBookISBN] = useState(null);
    const [pubYear, setPubYear] = useState(null);
    const [bookDesc, setBookDesc] = useState(null);
    const [bookPrice, setBookPrice] = useState(null);
    const [bookCover, setBookCover] = useState(null);
    const [bookCoverLink, setBookCoverLink] = useState(null);
    const [pageLength, setPageLength] = useState(0);

    const [userId, setUserId] = useState(null);

      const inputHandler = (e) => {
        const {value,name,files} = e.target;
        switch(name){
            case 'bookId':
                setBookId(value);
                break;
            case 'bookTitle':
                setBookTitle(value);
                break;
            case 'bookAuthor':
                setBookAuthor(value);
                break;
            case 'bookPublisher':
                setBookPublisher(value);
                break;
            case 'bookISBN':
                setBookISBN(value);
                break;
            case 'pubYear':
                setPubYear(value);
                break;
            case 'bookDesc':
                setBookDesc(value);
                break;
            case 'bookPrice':
                setBookPrice(value);
                break;
            case 'bookCover':
                setBookCover(files[0]);
                break;
            case 'pageLength':
                setPageLength(value);
                break;
        };
      };

      const uploadToDB = async(e) => {
        e.preventDefault();
        if(bookId, bookTitle, bookAuthor, bookPublisher, bookISBN, pubYear, bookDesc, bookPrice, bookCover){
            const uuid = Randomizer();
            const {error} = await supabase.storage.from('bookcovers').upload(`${uuid}`, bookCover, {
                upsert: true,
            });
            console.log(error);
            const {data:{publicUrl}} = supabase.storage.from('bookcovers').getPublicUrl(`${uuid}`);
            console.log(publicUrl);
            if(publicUrl){
                setBookCoverLink(publicUrl);
                const {data, error} = await supabase.from('books').insert({
                    bookId: bookId,
                    bookTitle: bookTitle,
                    bookAuthor: bookAuthor,
                    bookPublisher: bookPublisher,
                    bookISBN: bookISBN,
                    pubYear: pubYear,
                    bookDesc: bookDesc,
                    bookPrice: bookPrice,
                    bookCoverUrl: publicUrl,
                    toRead: true,
                    currentRead: false,
                    doneRead: false,
                    pageLength: pageLength,
                    currentPage: 0,
                }).select();
                if(data){
                    console.log(data);
                }
                if(error){
                    console.log(error);
                }
            }
            navigate(-1);
        }
        else{
            showErrorToast('Please complete the inputs');
        }
      }

      const cancelBtn = () => {
        navigate(-1);
      };

      const formInputs = (label,type,name) => (
        <div className='w-full flex items-center text-white mb-1'>
            <label className='w-[35%]' htmlFor={name}>{label}</label>
            <input onChange={inputHandler} className='w-[65%] rounded-md px-2 py-1 text-black' type={type} name={name}/>
        </div>
      );

      const formTextArea = (label,name) => (
        <div className='w-full flex items-center text-white mb-1'>
            <label className='w-[35%]' htmlFor={name}>{label}</label>
            <textarea onChange={inputHandler} className='w-[65%] rounded-md px-2 py-1 text-black' name={name}/>
        </div>
      )
      
      const formFileInput = (label,type,name) => (
        <div className='w-full flex items-center text-white'>
            <label className='w-[35%]' htmlFor={name}>{label}</label>
            <input onChange={inputHandler} className='w-[65%] rounded-md py-1 file:bg-gray-700 file:py-1 file:text-white file:rounded-md file:border-[2px] file:border-green-400 text-white' name={name} type={type} accept='image/*'/>
        </div>
      )

    useEffect(() => {
        },[]);
  return (
    <div className='w-full h-full p-2'>
        <h1 className='text-white mb-3 text-2xl text-center mt-2 font-mono'>Add a book</h1>
        <div className='scale-up flex flex-col justify-center items-center overflow-hidden w-full h-full p-2 mt-2'>
            <form onSubmit={uploadToDB} action="" className='flex flex-col w-full h-full items-center overflow-auto'>
                {formInputs('Book ID','text','bookId')}
                {formInputs('Book Title','text','bookTitle')}
                {formInputs('Book Author','text','bookAuthor')}
                {formInputs('Book Publisher','text','bookPublisher')}
                {formInputs('Book ISBN','text','bookISBN')}
                {formInputs('Publication Year','number','pubYear')}
                {formTextArea('Book Description','bookDesc')}
                {formInputs('Book Price','number','bookPrice')}
                {formInputs('No. of Pages', 'number', 'pageLength')}
                {formFileInput('Book Cover','file','bookCover')}
                <button type='submit' className='w-full h-[10%] mb-1 px-3 py-1 bg-gray-800 border-[2px] border-green-400 text-white rounded-md'>Add Book</button>
            </form>
            <button onClick={cancelBtn} className='w-full h-[10%] px-3 py-1 bg-gray-800 border-[2px] border-red-400 text-white rounded-md'>Cancel</button>
        </div>
    </div>
  )
}
