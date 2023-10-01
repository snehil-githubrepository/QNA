import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import { Landing } from "./components/Landing";

function App() {
  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#B0E0E6" }}
    >
      <Router>
        <Routes>
          <Route path={"/signin"} element={<Signin />} />
          <Route path={"/signup"} element={<Signup />} />
          <Route path={"/"} element={<Landing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
