import { Button, Form, Modal } from 'react-bootstrap'
import React, {useState, useEffect} from 'react'
const room_path = "http://localhost:4000/api/v1/rooms"
const ChatBar = ({socket}) => {

    const [show, setShow] = useState(false);
    const [chatname, setChatname] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [users, setUsers] = useState([])
    useEffect(()=> {
        socket.on("newUserResponse", data => setUsers(data))
    }, [socket, users])

    const createChatHandler = async (e) => {
        e.preventDefault() ;
        console.log(chatname)
        const data = {
            name: chatname
        };
        
        const response = await fetch(room_path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        const result = await response.json()
        if(!response.ok){
            console.log(result.error);
            alert(result.error);
        }
        else{
            console.log(result)
        }
    }

    const newchatroom = async (e) => {
        const data = {
            name: "new6"
        };
        
        const response = await fetch(room_path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        const result = await response.json()
        if(!response.ok){
            console.log(result.error);
            alert(result.error);
        }
        else{
            console.log(result)
        }
    }

    const newdm = async (e) => {
        e.preventDefault()
        //console.log('aftersubmit')
        const data = {
            name: "new"
        };
        
        const response = await fetch(room_path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    
        const result = await response.json()
        if(!response.ok){
            console.log(result.error);
            alert(result.error);
        }
        else{
            console.log("create dm successfully")
        }
    }

  return (
    <div className='chat__sidebar'>
        <h2>Rooms & Users</h2>
        <div>
        <button className="sendBtn" onClick={handleShow} style={{marginTop:"10px"}}>Create Room</button>
        </div>
        <div>
            <h4  className='chat__header'>ACTIVE USERS</h4>
            <div className='chat__users'>
                {users.map(user => <p key={user.socketID}>{user.userName}</p>)}
            </div>
        </div>
        <div>
            <h4  className='chat__header'>AVILABLE ROOMS</h4>
        </div><Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form  onSubmit={createChatHandler} style={{color: "black"}}>
              <div className="name" style={{marginBottom:"0.5em"}}>
                <label htmlFor="name" style={{ paddingRight: "10px" }}>Name:{" "}</label>
                <input
                  type="text"
                  id="name"
                  value={chatname}
                  onChange={(e) => setChatname(e.target.value)}
                />
              </div>

              <br />
              <Button type="submit">Save & Send</Button>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
  </div>
  )
}

export default ChatBar