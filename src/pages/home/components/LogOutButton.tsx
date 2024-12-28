import { Button } from "react-bootstrap"
import { useAppDispatch } from "../../../hooks"
import { userSignOut } from "../../../reducers/authReducer";
import { useNavigate } from "react-router-dom";

const LogOutButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(userSignOut());
    
    localStorage.removeItem('authToken');
    navigate('/login');
  }

  return(<Button onClick={handleClick} variant="danger">
    LogOut
  </Button>)
}

export default LogOutButton;