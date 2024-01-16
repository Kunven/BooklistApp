import {test, expect} from "vitest"
import {getBooks} from '../api/Books'
import type { Book } from "../api/Books"
const Books: Book[] = await getBooks()

test("Books exist", () =>{
  expect(Books.length).toBeGreaterThan(0)
})