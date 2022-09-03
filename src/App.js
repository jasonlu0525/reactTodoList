import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";
import NotFound404 from "./pages/NotFound404";
import "./style/all.css";
import { useState } from 'react';
import { AuthContext, UserContext } from './util/context';
import { ProtectedRoute } from './components/ProtectedRoute';
import { } from './util/useInfo';


function App() {
  const [token, updateToken] = useState(JSON.parse(localStorage.getItem("token") || null));
  const [userInfo, updateUserInfo] = useState( JSON.parse(localStorage.getItem("userInfo")))
  return (
    <div className="App">
      <AuthContext.Provider value={{ token, updateToken }}>
        <UserContext.Provider value={{ userInfo, updateUserInfo }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route element={<ProtectedRoute />}>

              <Route path="todo" element={<Todo />} />
            </Route>
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </UserContext.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
