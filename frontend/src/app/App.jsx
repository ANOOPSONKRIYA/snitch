import './App.css'
import { useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./app.routes.js";
import { useAuth } from "../features/auth/hook/useAuth.js";

const App = () => {
  const { syncCurrentSession } = useAuth();

  useEffect(() => {
    void syncCurrentSession();
  }, [syncCurrentSession]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
