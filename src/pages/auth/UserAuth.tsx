import { Tab, Tabs } from "react-bootstrap";
import { useEffect, useState } from "react";
import SignUp from "./components/SignUp";
import './auth.css'
import SignIn from "./components/SignIn";
import { useAppDispatch } from "../../hooks";
import { setUser, User } from "../../reducers/authReducer";

const UserAuth = () => {
  const dispatch = useAppDispatch()
  const [key, setkey] = useState('signUp')

  useEffect(() => {
      if (sessionStorage.getItem('authToken') !== null) {
        const user: User = {
          username: sessionStorage.getItem('username')!,
          token: sessionStorage.getItem('authToken')!
        }
  
        dispatch(setUser(user));
        console.log(user)
      }
    }, []);

  return(
    <div className="container">
      <h1 className="text-center">Welcome to LeviBot</h1>
      <div 
        id="auth-container" 
        className="row"
      >
        <div className="col-sm-4 offset-sm-4">
          <Tabs
            activeKey={key}
            onSelect={(key) => setkey(key!)}
            className="mb-3"
            fill
          >
            <Tab eventKey='signUp' title='Sign Up'>
              <SignUp />
            </Tab>
            <Tab eventKey='signIn' title='Sign In'>
              <SignIn />
            </Tab>
          </Tabs>


        </div>
      </div>
    </div>
  )
}

export default UserAuth;