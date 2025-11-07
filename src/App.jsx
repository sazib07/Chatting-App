import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config"; 
import Rootlayout from "./layout/Rootlayout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Message from "./pages/Message";


const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute user={user}>
          <Rootlayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "message", element: <Message /> },
      ],
    },
    {
      path: "/signup",
      element: !user ? <Signup /> : <Navigate to="/" />,
    },
    {
      path: "/signin",
      element: !user ? <Signin /> : <Navigate to="/" />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
