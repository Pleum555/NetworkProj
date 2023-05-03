import { Button, Form, Modal } from 'react-bootstrap'
import React, {useState, useEffect} from 'react'
const room_path = "http://172.20.10.3:4000/api/v1/rooms"
const direct_room = "http://172.20.10.3:4000/api/v1/directrooms"

const ChatBar = ({setchatroomName,setMessages,current,setchat,socket}) => {
    const [show, setShow] = useState(false);
    const [chatname, setChatname] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [users, setUsers] = useState([])
    const [allRoom, setAllRoom] = useState([]);
    //const [currentChatroom, setCurrentChatroom] = useState("")
    useEffect(()=> {
        socket.on("newUserResponse", data => setUsers(data))
    }, [socket, users])
    
    const changeroomHandler = (name) => {
        // console.log("this is old chat room "+current)
        // console.log("this is new chat room "+name)
        socket.emit("joinroom", 
            {
            oldchatname: current,
            chatname: name
            }
        )
        setMessages([]) ;
        setchat(name) ;
        setchatroomName(name) ;
    }

    const chatdmHandler = async (name) => {
        const data = {
            user1: name,
            user2: localStorage.getItem("userName")
       }
        const response = await fetch(direct_room, {
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
                socket.emit("joinroom", 
                {
                    myname: localStorage.getItem("userName"),
                    oldchatname: current,
                    chatname: result
                }
                )
                setMessages([]) ;
                setchatroomName(name) ;
                setchat(result) ;
        }
        }
        //console.log(name + " and " + localStorage.getItem("userName"))
    


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


    useEffect(() => {
        const getRoom =async () =>{
            const respone = await fetch(room_path, { 
                method: "GET"
            });
            
            const result = await (await respone).json();
            // console.log(result)
            //console.log("ok")
            if (!respone.ok) {
                alert(result.error);
                // console.log("result")
                // console.log("result")
            } else {
                setAllRoom(result)
                // console.log("result: "+result)
                // console.log("result: "+result)
            }
        }
        getRoom();
        // console.log("all rooms: "+allRoom);
        //console.log("result")
        //console.log("result")
    },[allRoom]);


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
                {users.map(user => <p key={user.socketID} onClick={() => chatdmHandler(user.userName)}>{user.userName}</p>)}
            </div>
        </div>
        <div>
            <h4  className='chat__header'>AVILABLE ROOMS</h4>
        </div>
        <Modal show={show} onHide={handleClose}>
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
        <div className='chat__users' style={{height: "20em",overflow: "scroll",overflowX: "hidden",objectFit: "cover"}}>
            {allRoom.map(room => (
                <p onClick={() => changeroomHandler(room.name)}>{room.name}</p>
            ))}
        </div>
        </div>
        //<p key={user.socketID} onClick={() => chatdmHandler(user.userName)}>{user.userName}</p>)}
  )
}

export default ChatBar