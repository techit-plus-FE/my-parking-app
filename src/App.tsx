import { RouterProvider, createBrowserRouter } from "react-router-dom";

import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
