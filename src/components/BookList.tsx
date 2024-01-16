import '../App.css'
import {Card, CardBody, Divider, Image, CardHeader, CardFooter,Button } from "@nextui-org/react";
import { getBooks } from '../api/Books';
import { useQuery } from "react-query";
import { useEffect } from 'react';
import { useBooksStore } from '../store';
import BooksBar from './BooksBar';
import Filters from '../components/Filters'
import type { Book } from '../api/Books';
function BookList() {
  const {updateBooks,updateSelected,createBooks} = useBooksStore()
  const {status,error,data:Books} = useQuery({queryKey:["book"],queryFn: getBooks})
  useEffect(() =>{
    //Storing the books in the global store
    if (Books) {
      updateBooks(Books)
      //Creates a backup for updating the list
      createBooks(Books)
      //Creating the genre filter object

      //Creating the author filter object
    }  
  },[Books,updateBooks,createBooks])
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
    //Updates the books list
    const newBookList: Book[] = booksOriginal.filter((book) => !SelectedBooks.includes(book))    
    updateBooks(newBookList)
  }
  return (
    <>    
      <Filters />
      {/* Books */}
      <div className='grid grid-cols-3 gap-4 mt-5 content-center max-w-5xl mx-auto px-8 justify-center h-full '>
        {useBooksStore.getState().booksUpdated?.map((book) =>{
          return(
            <Card key={book.ISBN} className='border-3 border-blue-500 '>
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
                  <Button className='mr-1' color="primary">Ver</Button>
                  <Button color="secondary" onClick={() => {addBookList(book.ISBN)}}>Agregar</Button>
                </div>              
              </CardFooter>
            </Card>
          ) 
        })}
      </div>
      {/* Selected Books List */}
      <BooksBar/>
    </>
  )
}

export default BookList
