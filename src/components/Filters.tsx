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
          <div className="grid grid-cols-3 grid-rows-2 gap-4">
            <Select 
              label="Selecciona un genero" 
              className="max-w-xs mr-2" 
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
              label="Selecciona un autor" 
              className="max-w-xs" 
            >
              {useBooksStore.getState().authorFilters.map((genre) =>{
                return (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                )
              })}
            </Select>
          </div>          
        </CardBody>
      </Card>
    </div>
  )
}

export default Filters