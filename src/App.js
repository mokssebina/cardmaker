import logo from './logo.svg';
import './App.css';
import Layout from './Components/LayoutElements/Layout';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from './Routes/Routes';
import PreviewRoutes from './Routes/PreviewRoutes';
import MainStack from './Stack/MainStack';



function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      {/*
      <PreviewRoutes />
      */}
    </BrowserRouter>
  );
}

export default App;
