import { Card, Container, Image, Row, Col, Form, Button } from "react-bootstrap"
import "./chat.css";
import { useAppDispatch, useAppSelector, useField } from "../../hooks";
import { sendMessage } from "../../reducers/messageReducer";
import { useParams } from "react-router-dom";

interface User {
  username: string,
  token: string
}

const ChatRoom = () => {
  const dispatch = useAppDispatch();
  const { uri } = useParams();
  const messages = useAppSelector(state => state.message);

  const user: User = useAppSelector(state => state.user);
  const username: string = user.username;

  const message = useField('text');
  const submitMessage = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    dispatch(sendMessage(message.input.value, uri!));
    message.submit();
  }


  return(
    <Card>
      <Card.Header className="text-white text-center font-weight-bold subtle-blue-gradient">
        Share the page URL to invite new friends!!
      </Card.Header>

      <Card.Body>
        <Container className="chat-body">
          {
            messages.messages.map(message => 
              <Row className="chat-section" key={`${message.id}`}>
                {
                  message.user.username === username
                  ? 
                    <>
                      <Col sm={{ span: 7, offset: 3 }}>
                        <Card.Text className="float-end speech-bubble speech-bubble-user text-white subtle-blue-gradient">{ message.message }</Card.Text>
                      </Col>
                      <Col sm={2}>
                        <Image className="float-end" roundedCircle src="/images/petra-icon.jpg"/>
                      </Col>
                    </>
                  :
                    <>
                      <Col sm={2}>
                        <Image roundedCircle src="/images/levi-icon.jpg"/>
                      </Col>
                      <Col sm={7}>
                        <Card.Text className="float-left speech-bubble speech-bubble-peer">{ message.message }</Card.Text>
                      </Col>
                    </>
                }
              </Row>
            )
          }
        </Container>
      </Card.Body>

      <Card.Footer className="text-muted">
        <Form onSubmit={submitMessage}>
          <Row>
            <Col sm={10}>
              <Form.Control {...message.input} placeholder="Add a new message..." as='input'/>
            </Col>
            <Col sm={2}>
              <Button variant="primary" type="submit">Send</Button>
            </Col>
          </Row>
        </Form>
      </Card.Footer>
    </Card>
  );
}

export default ChatRoom;