import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing";
import Description from "./components/Description";
import CastProvider from "react-chromecast";
import Cast from "./components/cast/Cast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/description" element={<Description />} />
          <Route path="/cast" element={<Cast />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
