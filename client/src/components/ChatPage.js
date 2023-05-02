import React, { useEffect, useState, useRef} from 'react'
import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'

const ChatPage = ({socket}) => { 
  const [messages, setMessages] = useState([])
  const [chatroomName, setchatroomName] = useState("")
  const [currentChatroom, setCurrentChatroom] = useState("")
  const [typingStatus, setTypingStatus] = useState("")
  const lastMessageRef = useRef(null);

  useEffect(()=> {
    socket.on("messageResponse", data => setMessages([...messages, data]))
  }, [socket, messages])

  useEffect(()=> {
    socket.on("typingResponse", data => setTypingStatus(data))
  }, [socket])

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);

  return (
    <div className="chat">
      <ChatBar setchatroomName={setchatroomName} setMessages={setMessages} current={currentChatroom} setchat={setCurrentChatroom} socket={socket}/>
      <div className='chat__main'>
        <ChatBody chatroomName={chatroomName} current={currentChatroom} messages={messages} typingStatus={typingStatus} lastMessageRef={lastMessageRef}/>
        <ChatFooter  current={currentChatroom} socket={socket}/>
      </div>
    </div>
  )
}

export default ChatPage