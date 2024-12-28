import { Form, Row, Col, Button } from "react-bootstrap";
import { useField } from "../../../hooks";
import { useAppDispatch } from "../../../hooks";
import { userSignUp } from "../../../reducers/authReducer";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const email = useField('email');
  const username = useField('text');
  const password = useField('password');

  const handleSignUp = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(email.input.value);
    console.log(username.input.value);

    dispatch(userSignUp({
      email: email.input.value,
      username: username.input.value,
      password: password.input.value
    }));

    email.submit();
    username.submit();
    password.submit();
    navigate('/');
  }

  return(
    <Form onSubmit={handleSignUp}>
      <Form.Group className="mb-3">
        <Form.Label>E-mail Address</Form.Label>
        <Form.Control {...email.input} placeholder='Example@email.com' as='input'/>
      </Form.Group>
      <Row className="align-items-center">
        <Form.Group as={Col}>
          <Form.Label>Username</Form.Label>
          <Form.Control {...username.input} placeholder='Username' as='input' />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Password</Form.Label>
          <Form.Control {...password.input} placeholder='Password' as='input' />
        </Form.Group>
      </Row>
      <Form.Group>
        <Form.Check
          type='checkbox'
          label='Accept terms and Conditions'
        />
      </Form.Group>
      <div className="d-grid gap-2" id="auth-button">
        <Button type="submit">Sign Up</Button>
      </div>
    </Form>
  )
}

export default SignUp;