
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/register",
      element: <Register />
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
