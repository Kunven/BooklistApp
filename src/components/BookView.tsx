import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,Image,  Button, Divider} from "@nextui-org/react";
import type { Book } from "../api/Books";
import { useState, useEffect } from "react";
function App(props: {book: Book | undefined, isOpen:boolean, closeParentModal: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [isOpen,setOpen] = useState<boolean>(props.isOpen)
  const [book,setBook] = useState(props.book)    
  useEffect(() =>{        
    setOpen(props.isOpen)
    setBook(props.book)    
  },[props.book, props.isOpen, setBook, setOpen])
  const closeModal = () => {
    setOpen(false)
    props.closeParentModal(false)
  }
  return (
      <Modal isOpen={isOpen} hideCloseButton={true} size="4xl">
        <ModalContent>
          <ModalHeader>
            {book?.title}            
          </ModalHeader>
          <Divider/>
          <ModalBody>
            <div className="grid grid-cols-2 gap-3 ">
              <Image alt="Book Cover"height={500} radius="md" src={book?.cover} width={500}/>
              <div className="grid grid-cols-1 gap-4 text-sm ">
                <p className="font-bold">Título</p>
                <ul className="list-disc ml-10"><li>{book?.title}</li></ul>
                <p className="font-bold">Páginas</p>
                <ul className="list-disc ml-10"><li>{book?.pages}</li></ul>
                <p className="font-bold">Genero</p>
                <ul className="list-disc ml-10"><li>{book?.genre}</li></ul>
                <p className="font-bold">Sinopsis</p>
                <ul className="list-disc ml-10"><li>{book?.synopsis}</li></ul>
                <p className="font-bold">Año</p>
                <ul className="list-disc ml-10"><li>{book?.year}</li></ul>
                <p className="font-bold">ISBN</p>
                <ul className="list-disc ml-10"><li>{book?.ISBN}</li></ul>
                <p className="font-bold">Autor</p>
                <ul className="list-disc ml-10"><li>{book?.author.name}</li></ul>
                <p className="font-bold">Otros Libros</p>
                <ul className="list-disc ml-10">
                  {book?.author.otherBooks.map( (otherBook) =>{
                    return(
                      <li key={otherBook}>{otherBook}</li>
                    )
                  })}
                </ul>                
              </div>
            </div>            
          </ModalBody>
          <Divider/>
          <ModalFooter>            
            <Button color="primary" onClick={() => {closeModal()}}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>    
  )
}

export default App
