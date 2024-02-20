import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Landing from './components/Landing';
import Description from "./components/Description";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/description' element={<Description />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
