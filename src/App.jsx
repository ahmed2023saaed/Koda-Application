import { useState } from 'react'
import './App.css'

import ProductsPage from "./features/products/pages/ProductsPage";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [count, setCount] = useState(0)

  return (
        <BrowserRouter>
           <AppRoutes />
        </BrowserRouter>
 
  )
}

export default App
