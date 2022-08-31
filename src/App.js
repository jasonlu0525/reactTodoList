import { Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Todo from './pages/Todo';
import NotFound404 from './pages/NotFound404';
// import LoginLayout from './components/LoginLayout';
import './style/all.css';

import 'https://kit.fontawesome.com/0f3f38a034.js';



function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="todo" element={<Todo />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
