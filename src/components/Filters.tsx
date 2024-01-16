import {Card, CardBody, CardHeader,Divider, Select, SelectItem, Input} from "@nextui-org/react";
import { useState } from 'react';
import { useBooksStore } from '../store';
import type { Book } from "../api/Books";
function Filters() {  
  const {updateBooks} = useBooksStore()
  const [genre, setGenre] = useState('')
  const [author, setAuthor] = useState('')
  const [search, setSearch] = useState('')
  const genreFilter = (genreFilter:string) =>{
    setGenre(genreFilter)    
    let books = useBooksStore.getState().booksOriginal    
    useBooksStore.getState().selectedBooks.forEach( (book: Book) => {      
      books = books.filter(e => e.ISBN != book.ISBN)
    });
    if (genreFilter) {books = books.filter(e => e.genre == genreFilter)}
    if (author) {books = books.filter(e => e.author.name == author)}
    if (search) {books = books.filter(e => e.title.includes(search))}    
    if (useBooksStore.getState().selectedBooks) {books = books.filter( (book) => !useBooksStore.getState().selectedBooks.includes(book))} 
    updateBooks(books)
  }
  const authorFilter = (authorFilter:string) =>{
    setAuthor(authorFilter)
    let books = useBooksStore.getState().booksOriginal
    useBooksStore.getState().selectedBooks.forEach( (book: Book) => {      
      books = books.filter(e => e.ISBN != book.ISBN)
    });
    if (genre) {books = books.filter(e => e.genre == genre)}
    if (authorFilter) {books = books.filter(e => e.author.name == authorFilter)}
    if (search) {books = books.filter(e => e.title.includes(search))}
    if (useBooksStore.getState().selectedBooks) {books = books.filter( (book) => !useBooksStore.getState().selectedBooks.includes(book))} 
    updateBooks(books)
  }
  const searchFilter = (searchFilter:string) =>{
    setSearch(searchFilter)
    let books = useBooksStore.getState().booksOriginal
    useBooksStore.getState().selectedBooks.forEach( (book: Book) => {      
      books = books.filter(e => e.ISBN != book.ISBN)
    });
    if (genre) {books = books.filter(e => e.genre == genre)}
    if (author) {books = books.filter(e => e.author.name == author)}
    if (searchFilter) {books = books.filter(e => e.title.includes(searchFilter))}
    if (useBooksStore.getState().selectedBooks) {books = books.filter( (book) => !useBooksStore.getState().selectedBooks.includes(book))} 
    updateBooks(books)
  }
  return (
    <div className="content-center max-w-5xl mx-auto px-8 justify-center h-full mt-5">
      <Card>
        <CardHeader>
          Filtros
        </CardHeader>
        <Divider/>
        <CardBody>
          <div className="grid grid-cols-2 gap-4">
            <Select 
              onChange={(e) => {genreFilter(e.target.value)} }
              label="Selecciona un genero" 
              className="max-w" 
            >
              {useBooksStore.getState().genreFilters.map((genre) =>{
                return (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                )
              })}
            </Select>
            <Select 
              onChange={(e) => {authorFilter(e.target.value)} }
              label="Selecciona un autor" 
              className="max-w" 
            >
              {useBooksStore.getState().authorFilters.map((genre) =>{
                return (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                )
              })}
            </Select>
            <Input label="Buscar" placeholder="Ingresa un libro" onChange={(e) =>{searchFilter(e.target.value)}}/>
          </div>          
        </CardBody>
      </Card>
    </div>
  )
}

export default Filters