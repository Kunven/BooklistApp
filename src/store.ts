import { create } from 'zustand'
import { Book } from './api/Books'

interface store {
  booksOriginal: Book[]
  booksUpdated: Book[],
  updateBooks: (booksUpdated:Book[]) => void,
  createBooks: (booksOriginal:Book[]) => void,
  deleteBooks: () => void,
  selectedBooks: Book[],
  updateSelected: (books:Book[]) => void,
  genreFilters: string[],
  setGenreFilters: (genreFilters: string[]) => void,
  authorFilters: string[],
  setAuthorFilters: (authorFilters: string[]) => void,
}

export const useBooksStore = create<store>((set) => ({
  booksOriginal: [],
  booksUpdated: [],
  updateBooks: (books) => set(() => ({booksUpdated: books})),
  createBooks: (books) => set(() => ({booksOriginal: books})),
  deleteBooks: () => set({ booksUpdated: [] }),
  selectedBooks: [],
  updateSelected: (books) => set(() => ({selectedBooks: books})),
  genreFilters: [],
  setGenreFilters: (genres) => set(() => ({genreFilters: genres})),
  authorFilters: [],
  setAuthorFilters: (authors) => set(() => ({authorFilters: authors})),
}))