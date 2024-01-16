import {Card, CardBody, CardHeader,Divider, Select, SelectItem} from "@nextui-org/react";
//import { useEffect} from 'react';
import { useBooksStore } from '../store';
function Filters() {  
  return (
    <div className="content-center max-w-5xl mx-auto px-8 justify-center h-full mt-5">
      <Card>
        <CardHeader>
          Filtros
        </CardHeader>
        <Divider/>
        <CardBody>
          <Select 
            label="Selecciona un genero" 
            className="max-w-xs" 
          >
            {useBooksStore.getState().booksOriginal.map((book) =>{
              return (
                <SelectItem key={book.ISBN} value={book.genre}>
                  {book.genre}
                </SelectItem>
              )
            })}
          </Select>
        </CardBody>
      </Card>
    </div>
  )
}

export default Filters