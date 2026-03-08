import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ComingSoon from "./pages/ComingSoon";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/horario" element={<ComingSoon />} />
      <Route path="/nomina" element={<ComingSoon />} />
      <Route path="/contrato" element={<ComingSoon />} />
      <Route path="/vacaciones" element={<ComingSoon />} />
      <Route path="/manuales" element={<ComingSoon />} />
    </Routes>
  );
}

export default App;
