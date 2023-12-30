import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/route";

const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;
