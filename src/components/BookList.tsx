import '../App.css'
import {Card, CardBody, Divider, Image, CardHeader, CardFooter,Button } from "@nextui-org/react";
import { getBooks } from '../api/Books';
import { useQuery } from "react-query";
import { useEffect, useState } from 'react';
import { useBooksStore } from '../store';
import BooksBar from './BooksBar';
import BookView from './BookView';
import Filters from '../components/Filters'
import type { Book } from '../api/Books';

function BookList() {
  const {updateBooks,updateSelected,createBooks,setGenreFilters,setAuthorFilters} = useBooksStore()
  const {status,error,data:Books} = useQuery({queryKey:["book"],queryFn: getBooks})
  const [isOpen,setIsOpen] = useState(false)
  const [bookModal,setbookModal] = useState<Book | undefined>()
  useEffect(() =>{    
    //Storing the books in the global store    
    if (Books) {
      const selectedBooks = localStorage.getItem('selectedBooks')
       if (selectedBooks && JSON.parse(selectedBooks).length > 0) {//check local storage for books        
        updateSelected(JSON.parse(selectedBooks))
        let BookCopy:Book[] = Books //removing selected books from the ui
        useBooksStore.getState().selectedBooks.forEach( (book: Book) => {
          BookCopy = BookCopy.filter(e => e.ISBN != book.ISBN)
        });        
        updateBooks(BookCopy)
       }else{        
        updateBooks(Books)
       }
      //Creates a backup for updating the list
      createBooks(Books)      
      //Creating the genre filter object
      const genresDup = Books.map((book) =>{
        return (book.genre)
      })
      const genres = new Set(genresDup)
      setGenreFilters(Array.from(genres))
      //Creating the author filter object
      const authorsDup = Books.map((book) =>{
        return (book.author.name)
      })
      const authors = new Set(authorsDup)
      setAuthorFilters(Array.from(authors))
    }  
  },[Books, updateBooks, createBooks, setGenreFilters, setAuthorFilters, updateSelected])
  if (status === "loading") {
    return (
      <Card>
        <CardBody>
          <p>Loading Books...</p>
        </CardBody>
      </Card>
    )
  }
  if (error) {
    return (
      <Card>
        <CardBody>
          <p>Couldn't Retrieve Books...</p>
        </CardBody>
      </Card>
    )
  }
  const addBookList = (isbn: string) =>{
    //Updates the selected books list
    const booksOriginal: Book[] = useBooksStore.getState().booksOriginal
    const AddBook = booksOriginal.filter((book) => book.ISBN == isbn)
    const SelectedBooks = useBooksStore.getState().selectedBooks        
    SelectedBooks.push(AddBook[0])
    updateSelected(SelectedBooks)
    //sets the selected books list in the local storage
    localStorage.setItem('selectedBooks',JSON.stringify(SelectedBooks))
    //Updates the books list
    const newBookList: Book[] = useBooksStore.getState().booksUpdated.filter((book) => !SelectedBooks.includes(book))    
    updateBooks(newBookList)
  }
  const openModal = (book:Book | undefined) =>{
    setbookModal(book)
    setIsOpen(true)
  }
  return (
    <>    
      {/* Filters */}
      <Filters />
      {/* Books */}
      <div className=' max-w-5xl min-h-5xl mx-auto my-5  px-8 justify-center h-full '>
        <Card >
          <CardBody>
            <div className='grid grid-cols-3 gap-4 mt-5'>        
              {useBooksStore.getState().booksUpdated?.map((book) =>{
                return(            
                  <Card key={book.ISBN} className='border-3 border-blue-500  max-w-5xl min-h-80'>
                    <CardHeader>
                      <div>{book.title}</div>              
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                      <div className='flex justify-center'>
                        <Image 
                            isZoomed
                            alt="Book Cover"height={100} radius="md" src={book.cover} width={100}
                        />
                      </div>              
                    </CardBody>
                    <Divider/>
                    <CardFooter>
                      <div className='flex justify-center mx-auto'>
                        <Button className='mr-1' color="primary" onClick={() => {openModal(book)}}>Ver</Button>
                        <Button color="secondary" onClick={() => {addBookList(book.ISBN)}}>Agregar</Button>
                      </div>              
                    </CardFooter>
                  </Card>            
                ) 
              })}
            </div>
          </CardBody>
        </Card>      
      </div>
      
      {/* Selected Books List */}
      <BooksBar setBookModal={setbookModal} setIsOpen={setIsOpen}/>
      <BookView book={bookModal} isOpen={isOpen} closeParentModal={setIsOpen}/>
    </>
  )
}

export default BookList

