import { Form, Col, Button } from "react-bootstrap";
import { useField } from "../../../hooks";
import { useAppDispatch } from "../../../hooks";
import { userSignIn } from "../../../reducers/authReducer";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const username = useField('text');
  const password = useField('password');

  const handleSignUp = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(username.input.value);

    dispatch(userSignIn({
      username: username.input.value,
      password: password.input.value
    }))

    username.submit();
    password.submit();
    setTimeout(() => navigate('/'), 1000);
  }

  return(
    <Form onSubmit={handleSignUp}>
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control {...username.input} placeholder='Username' as='input'/>
      </Form.Group>
      <Form.Group as={Col}>
        <Form.Label>Password</Form.Label>
        <Form.Control {...password.input} placeholder='Password' as='input' />
      </Form.Group>
      <div className="d-grid gap-2" id="auth-button">
        <Button type="submit">Log In</Button>
      </div>
    </Form>
  )
}

export default SignIn;