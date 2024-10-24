import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import store from './Store/Store.js'
import { createBrowserRouter } from 'react-router-dom'
import { AuthLayout} from './Components/index.js'
import Signup from './Pages/Signup.jsx'
import Login from './Pages/Login.jsx'
import Home from './Pages/Home.jsx'
import AllPost from './Pages/AllPost.jsx'
import AddPost from './Pages/AddPost.jsx'
import Post from './Pages/Post.jsx'
import EditPost from './Pages/EditPost.jsx'
import { RouterProvider } from 'react-router-dom'


const routes = createBrowserRouter([
    {path : '/' ,
      element : <App />,
      children : [
        {
          path: "/",
          element: <Home />,
        },
        {
          path : '/login',
          element : (
            <AuthLayout authentication = {false}>
               <Login />
            </AuthLayout>
          )
        },
        {
          path: "/signup",
          element: (
              <AuthLayout authentication={false}>
                  <Signup />
              </AuthLayout>
          ),
      },
      {
          path: "/allposts",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <AllPost />
              </AuthLayout>
          ),
      },
      {
          path: "/addpost",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <AddPost />
              </AuthLayout>
          ),
      },
      {
          path: "/edit-post/:slug",
          element: (
              <AuthLayout authentication>
                  {" "}
                  <EditPost />
              </AuthLayout>
          ),
      },
      {
          path: "/post/:slug",
          element: <Post />,
      },
        
      ]
    }
])


createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes}/>
    </Provider>
  </StrictMode>,
)
