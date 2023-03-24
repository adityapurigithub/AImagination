import { createBrowserRouter } from "react-router-dom";
import { CreatePost, Home } from "./pages";

import App from "./App";
const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/create-post",
        element: <CreatePost />,
      },
      {
        path: "/*",
        element: (
          <div className="err text-3xl text-center font-bold">Not Found</div>
        ),
      },
    ],
  },
]);

export default router;
