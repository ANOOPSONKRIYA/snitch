import './App.css'
import { RouterProvider } from "react-router-dom";
import { routes } from "./app.routes.js";

const App = () => {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  )
}

export default App
