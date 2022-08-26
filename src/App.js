import "./styles/output.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./components/authentication";
import Dashboard from "./components/dashboard";
import VerifyPage from "./components/verify-page";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify" element={<VerifyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
