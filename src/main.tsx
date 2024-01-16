import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
//import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {  
  QueryClientProvider,
  QueryClient,
} from 'react-query'
import App from './App.tsx'
import './index.css'
const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(  
  <React.StrictMode>
    <NextUIProvider>
      <QueryClientProvider client={queryClient}>
        <App />                
      </QueryClientProvider>      
    </NextUIProvider>
  </React.StrictMode>,
)
