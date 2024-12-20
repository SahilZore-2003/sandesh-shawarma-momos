
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Root from './pages/Root'
import Login from './pages/Login'
import Orders from './pages/Orders'
const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "register",
          element: <Register />
        },
        {
          path: "login",
          element: <Login />
        },
      ]
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
