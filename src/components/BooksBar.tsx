import {Card, CardBody, CardHeader, Button,Divider,Image,CardFooter,Link} from "@nextui-org/react";
import { useBooksStore } from '../store';
import { IoMdClose } from "react-icons/io";
function BooksBar() {
  const {updateBooks,updateSelected,} = useBooksStore()
  const removeBookList = (isbn: string) =>{    
    //Updates the selected books list    
    const BookOriginal = useBooksStore.getState().booksOriginal
    const SelectedBooks = useBooksStore.getState().selectedBooks.filter((book) => book.ISBN != isbn)    
    updateSelected(SelectedBooks)    
    //Updates the books list
    const newBookList = useBooksStore.getState().booksUpdated
    newBookList.push(BookOriginal.filter((book) => book.ISBN == isbn)[0])
    updateBooks(BookOriginal.filter((book) => newBookList.includes(book)))//this was done to preserve the original order of the list
  }
  if (useBooksStore.getState().selectedBooks.length > 0) {
    return (
      <div className="max-w-5xl min-w-5xl">
        <Card className="absolute top-0 right-0">
          <CardHeader>
            <p>Libros Seleccionados</p>
          </CardHeader>
          <Divider/>
          <CardBody>
            {useBooksStore.getState().selectedBooks?.map((book) =>{
              return(
                <Card key={book.ISBN} className='border-2 border-blue-500 mt-5 '>
                <CardHeader>
                  <Link><IoMdClose className="mt-1" onClick={() => { removeBookList(book.ISBN)}}/></Link>
                  <div>{book.title}</div>
                </CardHeader>
                <Divider/>
                <CardBody>
                  <div className='flex justify-center'>
                    <Image 
                        isZoomed
                        alt="Book Cover"height={60} radius="md" src={book.cover} width={60}
                    />
                  </div>              
                </CardBody>
                <Divider/>
                <CardFooter>
                  <div className='flex justify-center mx-auto'>
                    <Button className='mr-1' color="primary">View</Button>
                    
                  </div>              
                </CardFooter>
              </Card>
                
              ) 
            })}
          </CardBody>
        </Card>
      </div>      
    )
  }  
}

export default BooksBar
