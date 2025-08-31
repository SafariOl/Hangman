import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import CreateWord from './pages/CreateWord.jsx';
import GuessWord from './pages/GuessWord.jsx';
import './styles/style.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/create",
    element: <CreateWord />,
  },
  {
    path: "/game",
    element: <GuessWord />
  }
]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
