import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/Route";
import { Toast } from "component/Toast";

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toast />
    </BrowserRouter>
  );
};

export default App;
