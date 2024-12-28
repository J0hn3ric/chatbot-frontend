import {
  BrowserRouter as Router,
  Routes, Route
} from "react-router-dom";
import UserAuth from "./pages/auth/UserAuth";
import Chat from "./pages/chats/Chat";
import Home from "./pages/home/Home";

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserAuth />} />
        <Route path="/chat/:uri?" element={<Chat />} /> 
      </Routes>
    </Router>
  )
}

export default App
