import axios from "axios";
const baseURl = 'http://localhost:8000/api/chats';

interface Message {
  message: string
}

const config = {
  headers: { 'Authorization': `Token ${window.sessionStorage.getItem('authToken')}` }
};

export const createRoom = async () => {
  const response = await axios.post(`${baseURl}/`, '',config);
  return response.data;
}

export const sendMessageToServer = async (message: Message, uri: string) => {
  const response = await axios.post(`${baseURl}/${uri}/messages/`, message, config);
  return response.data;
}

export const getMessageHistory = async (uri: string) => {
  const response = await axios.get(`${baseURl}/${uri}/messages/`, config);
  return response.data
}

export const joinChatSession = async (username: string, uri: string) => {
  const data = {
    username: username
  }
  const response = await axios.patch(`${baseURl}/${uri}/`, data, config);
  return response.data;
}