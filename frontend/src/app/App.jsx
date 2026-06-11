import './App.css'
import { RouterProvider } from "react-router";
import { router } from "./app.routes.js";

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
