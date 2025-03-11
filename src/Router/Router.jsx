import { createBrowserRouter} from "react-router-dom";
import Home from "../Pages/Home";
import Main_Layout from "../Main/Main_Layout";
import Lost_and_Found from "../Pages/Lost_and_Found";
import Add_Items from "../Pages/Add_Items";
import My_Items from "../Pages/My_Items";
import Post_Details from "../Pages/Post_Details";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Update_Items from "../Pages/Update_Items";
import AllRecoverd_Items from "../Pages/AllRecoverd_Items";
import PrivateRoute from "../Auth/PrivateRoute";
import Error_Page from "../Pages/Error_Page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main_Layout></Main_Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/lost_and_found",
        element: <Lost_and_Found></Lost_and_Found>,
      },
      {
        path: "/addItems",
        element: <PrivateRoute>
          <Add_Items></Add_Items>
        </PrivateRoute>
      },
      {
        path: "/allRecoverdItems",
        element: <PrivateRoute>
          <AllRecoverd_Items></AllRecoverd_Items>
        </PrivateRoute>
      },
      {
        path: "/myItems",
        element: <PrivateRoute>
          <My_Items></My_Items>
        </PrivateRoute>
      },
      {
        path: "/postDetails",
        element: <PrivateRoute>
          <Post_Details></Post_Details>
        </PrivateRoute>
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/updateItems/:id",
        element: <Update_Items></Update_Items>,
      },
      {
        path:"/error",
        element:<Error_Page></Error_Page>
      }
    


    ],

  },

 

]);