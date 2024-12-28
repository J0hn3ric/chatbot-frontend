import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import LogOutButton from "./components/LogOutButton";
import { useAppDispatch } from "../../hooks";
import { setUser, User } from "../../reducers/authReducer";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if(sessionStorage.getItem('authToken') === null) {
      navigate('/login');
    } else {
      const user: User = {
        username: window.sessionStorage.getItem('username')!,
        token: window.sessionStorage.getItem('authToken')!
      }

      dispatch(setUser(user));
    }
  }, []);

  return(
    <div>
      <p>you are at home</p>

      <LogOutButton />
    </div>
  )
}

export default Home