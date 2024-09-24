import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { Prediction } from "./pages/Prediction";
import { ConfigProvider } from "antd";
const router = createBrowserRouter([
  {
    path: "/prediction/:id",
    element: <Prediction />,
  },
  {
    path: "*",
    // TODO
    element: <Navigate to="/prediction/0" replace />,
  },
]);

const App = () => <ConfigProvider theme={{components: {
  Table: {
    cellPaddingBlock: 0,
    cellPaddingInline: 0,
  }
}}} >
  <RouterProvider router={router} />
</ConfigProvider>;

export default App;
