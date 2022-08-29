import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import FAQ  from './pages/FAQ';
import Home  from './pages/Home';
import About  from './pages/About';
import NotFound404  from './pages/NotFound404';
import './App.css';








function App() {
  return (
    <div className="App">
        <h1>Welcome to React Router!</h1>
        {/* 住側路由表 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="FAQ" element={<FAQ />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
