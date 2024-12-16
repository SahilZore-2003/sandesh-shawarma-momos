
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Root from './pages/Root'
const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "home",
          element: <Home />
        }, {
          path: "register",
          element: <Register />
        },
      ]
    },
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default App
