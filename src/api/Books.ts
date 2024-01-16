import axios from 'axios'
export interface Book {
  title: string;
  pages: number;
  genre: string;
  cover: string;
  synopsis: string;
  year: number;
  ISBN: string;
  author:{name:string, otherBooks:string[]}
}

export async function getBooks() {
  const Books: Book[] = []
  await axios.get('https://jelou-prueba-tecnica1-frontend.rsbmk.workers.dev/').then(res =>{
    res.data.default.library.forEach((e: {book: Book}) => {
      const Book: Book = {
        title: e.book.title, pages:e.book.pages, genre:e.book.genre,
        cover:e.book.cover, synopsis:e.book.synopsis, year:e.book.year,
        ISBN:e.book.ISBN, author:e.book.author}
      Books.push(Book)
    });
  })    
  return Books
}
