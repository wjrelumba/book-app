import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../Essentials/Supabase';
import { Randomizer } from './Randomizer';

export default function UpdateBook() {
    const location = useLocation();
    const navigate = useNavigate();
    const {book} = location.state || {};

    const [bookId, setBookId] = useState(book.bookId);
    const [bookTitle, setBookTitle] = useState(book.bookTitle);
    const [bookAuthor, setBookAuthor] = useState(book.bookAuthor);
    const [bookPublisher, setBookPublisher] = useState(book.bookPublisher);
    const [bookISBN, setBookISBN] = useState(book.bookISBN);
    const [pubYear, setPubYear] = useState(book.pubYear);
    const [bookDesc, setBookDesc] = useState(book.bookDesc);
    const [bookPrice, setBookPrice] = useState(book.bookPrice);
    const [bookCover, setBookCover] = useState(null);
    const [bookCoverLink, setBookCoverLink] = useState(null);
    const [pageLength, setPageLength] = useState(book.pageLength);
    const [currentPage, setCurrentPage] = useState(book.currentPage);

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
            case 'currentPage':
                setCurrentPage(value);
                break;
        };
      };

    const uploadToDB = async(e) => {
        e.preventDefault();
        if(bookId, bookTitle, bookAuthor, bookPublisher, bookISBN, pubYear, bookDesc, bookPrice){
            const uuid = Randomizer();
            if(currentPage >= pageLength){
                if(bookCover){
                    const {error} = await supabase.storage.from('bookcovers').upload(`${uuid}`, bookCover, {
                        upsert: true,
                    });
                    const {data:{publicUrl}} = supabase.storage.from('bookcovers').getPublicUrl(`${uuid}`);
                    const {data} = await supabase.from('books').update({
                        bookId: bookId,
                        bookTitle: bookTitle,
                        bookAuthor: bookAuthor,
                        bookPublisher: bookPublisher,
                        bookISBN: bookISBN,
                        pubYear: pubYear,
                        bookDesc: bookDesc,
                        bookPrice: bookPrice,
                        bookCoverUrl: publicUrl,
                        toRead: false,
                        currentRead: false,
                        doneRead: true,
                        pageLength: pageLength,
                        currentPage: pageLength,
                    }).eq('id',book.id).select();
                    console.log(data);
                    navigate('/dashboard');
                }
                else{
                    const {data,error} = await supabase.from('books').update({
                        bookId: bookId,
                        bookTitle: bookTitle,
                        bookAuthor: bookAuthor,
                        bookPublisher: bookPublisher,
                        bookISBN: bookISBN,
                        pubYear: pubYear,
                        bookDesc: bookDesc,
                        bookPrice: bookPrice,
                        bookCoverUrl: book.bookCoverUrl,
                        toRead: false,
                        currentRead: false,
                        doneRead: true,
                        pageLength: pageLength,
                        currentPage: pageLength,
                    }).eq('id',book.id).select();
                    console.log(data);
                    console.log(error);
                    navigate('/dashboard');
                }
            }
            else{
                if(currentPage > 0){
                    if(bookCover){
                        const {error} = await supabase.storage.from('bookcovers').upload(`${uuid}`, bookCover, {
                            upsert: true,
                        });
                        const {data:{publicUrl}} = supabase.storage.from('bookcovers').getPublicUrl(`${uuid}`);
                        const {data} = await supabase.from('books').update({
                            bookId: bookId,
                            bookTitle: bookTitle,
                            bookAuthor: bookAuthor,
                            bookPublisher: bookPublisher,
                            bookISBN: bookISBN,
                            pubYear: pubYear,
                            bookDesc: bookDesc,
                            bookPrice: bookPrice,
                            bookCoverUrl: publicUrl,
                            toRead: false,
                            currentRead: true,
                            doneRead: false,
                            pageLength: pageLength,
                            currentPage: currentPage,
                        }).eq('id',book.id).select();
                        console.log(data);
                        navigate('/dashboard');
                    }
                    else{
                        const {data,error} = await supabase.from('books').update({
                            bookId: bookId,
                            bookTitle: bookTitle,
                            bookAuthor: bookAuthor,
                            bookPublisher: bookPublisher,
                            bookISBN: bookISBN,
                            pubYear: pubYear,
                            bookDesc: bookDesc,
                            bookPrice: bookPrice,
                            bookCoverUrl: book.bookCoverUrl,
                            toRead: false,
                            currentRead: true,
                            doneRead: false,
                            pageLength: pageLength,
                            currentPage: currentPage,
                        }).eq('id',book.id).select();
                        console.log(data);
                        console.log(error);
                        navigate('/dashboard');
                    }
                }
                else{
                    if(bookCover){
                        const {error} = await supabase.storage.from('bookcovers').upload(`${uuid}`, bookCover, {
                            upsert: true,
                        });
                        const {data:{publicUrl}} = supabase.storage.from('bookcovers').getPublicUrl(`${uuid}`);
                        const {data} = await supabase.from('books').update({
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
                            currentPage: currentPage,
                        }).eq('id',book.id).select();
                        console.log(data);
                        navigate('/dashboard');
                    }
                    else{
                        const {data,error} = await supabase.from('books').update({
                            bookId: bookId,
                            bookTitle: bookTitle,
                            bookAuthor: bookAuthor,
                            bookPublisher: bookPublisher,
                            bookISBN: bookISBN,
                            pubYear: pubYear,
                            bookDesc: bookDesc,
                            bookPrice: bookPrice,
                            bookCoverUrl: book.bookCoverUrl,
                            toRead: true,
                            currentRead: false,
                            doneRead: false,
                            pageLength: pageLength,
                            currentPage: currentPage,
                        }).eq('id',book.id).select();
                        console.log(data);
                        console.log(error);
                        navigate('/dashboard');
                    }
                }
            }
        }
        else{
            showErrorToast('Please complete the inputs');
        }
      }


    const formInputs = (label,type,name,placeholder) => (
        <div className='w-full flex items-center text-white mb-1'>
            <label className='w-[35%]' htmlFor={name}>{label}</label>
            <input placeholder={placeholder} onChange={inputHandler} className='w-[65%] rounded-md px-2 py-1 text-black' type={type} name={name}/>
        </div>
      );

      const formTextArea = (label,name,placeholder) => (
        <div className='w-full flex items-center text-white mb-1'>
            <label className='w-[35%]' htmlFor={name}>{label}</label>
            <textarea placeholder={placeholder} onChange={inputHandler} className='w-[65%] rounded-md px-2 py-1 text-black' name={name}/>
        </div>
      )
      
      const formFileInput = (label,type,name) => (
        <div className='w-full flex items-center text-white'>
            <label className='w-[35%]' htmlFor={name}>{label}</label>
            <input onChange={inputHandler} className='w-[65%] rounded-md py-1 file:bg-gray-700 file:py-1 file:text-white file:rounded-md file:border-[2px] file:border-green-400 text-white' name={name} type={type} accept='image/*'/>
        </div>
      )

      const cancelBtn = () => {
        navigate(-1);
      };
    
    useEffect(() => {
        console.log(book);
    },[])
  return (
    <div className='w-full h-full p-2'>
        <h1 className='text-white mb-3 text-2xl text-center mt-2 font-mono'>Update Book: {book.bookTitle}</h1>
        <div className='scale-up flex flex-col justify-center items-center overflow-hidden w-full h-full p-2 mt-2'>
            <form onSubmit={uploadToDB} action="" className='flex flex-col w-full h-full items-center overflow-auto'>
                {formInputs('Book Title','text','bookTitle',book.bookTitle)}
                {formInputs('Book Author','text','bookAuthor',book.bookAuthor)}
                {formInputs('Book Publisher','text','bookPublisher',book.bookPublisher)}
                {formInputs('Book ISBN','text','bookISBN',book.bookISBN)}
                {formInputs('Publication Year','number','pubYear',book.pubYear)}
                {formTextArea('Book Description','bookDesc',book.bookDesc)}
                {formInputs('Book Price','number','bookPrice',book.bookPrice)}
                {formInputs('No. of Pages', 'number', 'pageLength',book.pageLength)}
                {formInputs('Current Page', 'number', 'currentPage',book.currentPage)}
                {formFileInput('Book Cover','file','bookCover')}
                <button type='submit' className='w-full h-[10%] mb-1 px-3 py-1 bg-gray-800 border-[2px] border-green-400 text-white rounded-md'>Update Book</button>
            </form>
            <button onClick={cancelBtn} className='w-full h-[10%] px-3 py-1 bg-gray-800 border-[2px] border-red-400 text-white rounded-md'>Cancel</button>
        </div>
    </div>
  )
}
