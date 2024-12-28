import { createSlice } from "@reduxjs/toolkit";
import { AppDispatch } from "../store";
import { getMessageHistory, joinChatSession, sendMessageToServer } from "../services/chatService";

interface ServerMessages {
  user: {
    id: number,
    username: string,
    email: string
  },
  message: string,
  id: number
}

interface Message {
  uri: string,
  message: string,
  id: number,
  user: {
    username: string,
  }
}

interface MessageState {
  messages: Message[],
  validSession: boolean
}

interface Members {
  username: string
}

interface MemberFromServer {
  id: number,
  username: string,
  email: string
}


const initial_state: MessageState ={
  messages: [
    {
      "uri":"040213b14a02451",
      "message":"Hello!",
      "id": 1,
      "user": {
        "username":"test2",
      }
    },
    {
      "uri":"040213b14a02451",
      "message":"Hey whatsup! i dey",
      "id": 2,
      "user": {
        "username":"daniel",
      }
    }
  ],
  validSession: false
}

const messageSlice = createSlice({
  name: 'message',
  initialState: initial_state,
  reducers: {
    addMessage(state, action) {
      return {
        ...state,
        messages: state.messages.concat(action.payload)
      };
    },
    initializeSession (state, action) {
      return {
        ...state,
        messages: action.payload
      }
    },
    joinSession (state, action) {
      return {
        ...state,
        validSession: action.payload
      }
    }
  }
})

export const { addMessage, initializeSession, joinSession } = messageSlice.actions;

export const sendMessage = (message: string, uri: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const sentMessage = await sendMessageToServer({ message }, uri);
      dispatch(addMessage({
        uri: sentMessage.uri,
        message: sentMessage.message,
        id: sentMessage.id,
        user: {
          username: sessionStorage.getItem('username')
        }
      }));
    } catch (error) {
      console.log(error);
    }
  }
}

export const getHistory = (uri: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const history = await getMessageHistory(uri);
      const parsedMessage: Message = history.messages.map((message: ServerMessages) => {
        return {
          uri: history.uri,
          message: message.message,
          id: message.id,
          user: {
            username: message.user.username
          }
        }
      })
      dispatch(initializeSession(parsedMessage));
    } catch (error) {
      console.log(error)
    }
  }
}

export const joinChat = (uri: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const username: string = sessionStorage.getItem('username')!;
      const response = await joinChatSession(username, uri);
      const parsedMemeber: Members[] = response.members.map((member: MemberFromServer) => {
        return {
          username: member.username
        }
      });
      const foundUser: Members | undefined = parsedMemeber.find(user => username === user.username);
      if (foundUser) {
        dispatch(joinSession(true));
        dispatch(getHistory(uri));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default messageSlice.reducer;