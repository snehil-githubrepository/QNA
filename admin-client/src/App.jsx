import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Signin } from "./components/Signin";
import { Signup } from "./components/Signup";
import { Landing } from "./components/Landing";
import { CssBaseline } from "@mui/material";
import "./App.css"; // Make sure this path is correct

function App() {
  return (
    <div
      style={{
        width: "100vw",
        margin: 0,
      }}
    >
      <CssBaseline />
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
