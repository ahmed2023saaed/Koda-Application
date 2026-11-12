import { useState } from 'react'
import './App.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./features/products/routes/AppRoutes";

function App() {
  const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
      />
    </BrowserRouter>
  );


}

export default App
