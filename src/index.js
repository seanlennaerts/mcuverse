import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
    <BrowserRouter basename="/mcuverse">
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
);

