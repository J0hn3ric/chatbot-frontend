import { useEffect } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import ChatRoom from "./ChatRoom"
import "./chat.css"
import { setUser, User } from "../../reducers/authReducer"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { createRoom } from "../../services/chatService"
import { joinChat } from "../../reducers/messageReducer"


const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const validSession = useAppSelector(state => state.message.validSession);

  const { uri } = useParams();
  
  useEffect(() => {
    if (sessionStorage.getItem('authToken') === null) {
      navigate('/login');
    } else {
          const user: User = {
            username: window.sessionStorage.getItem('username')!,
            token: window.sessionStorage.getItem('authToken')!
          }
    
          dispatch(setUser(user));
          dispatch(joinChat(uri!));
          console.log(validSession)
        }
  }, []);

  const createNewRoom = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const newUri = await createRoom();
    navigate(`/chat/${newUri.uri}`);
  }

  return(
    <Container>
      <Row>
        <Col sm={{ span: 6, offset: 3 }}>
          {
            validSession 
            ? <ChatRoom />
            : 
            <div>
              <h3 className="text-center">Welcome !</h3>
              <br />
              <p className="text-center">
                To start chatting with friends click on the button below, it'll start a new chat session
                and then you can invite your friends over to chat!
              </p>
              <br />
              <div className="d-grid">
                <Button variant="primary" size="lg" onClick={createNewRoom}>Start Chatting</Button>
              </div>
            </div>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default Chat