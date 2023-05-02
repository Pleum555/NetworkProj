import React, {useState, useEffect} from 'react'
const room_path = "http://localhost:4000/api/v1/rooms"
const ChatBar = ({socket}) => {
    const [users, setUsers] = useState([])
    useEffect(()=> {
        socket.on("newUserResponse", data => setUsers(data))
    }, [socket, users])

    const newroom = async (e) => {
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
            // let toServer = formData.name
            // console.log("toserver: "+ toServer)
            // localStorage.setItem("name", toServer)
            // socket.emit("newUser", {toServer, socketID: socket.id})
            // //localStorage.setItem('user',JSON.stringify(result))
            // //socket.emit("newUser", {email, socketID: socket.id})
            // console.log("success emit after login")
            // alert("Login completed");
            // //window.location.href="/";
            // navigate("/")
            console.log("create room successfully")
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
        <button className="sendBtn" onClick={newroom} style={{marginTop:"10px"}}>Create Room</button>
        </div>
        <div>
            <h4  className='chat__header'>ACTIVE USERS</h4>
            <div className='chat__users'>
                {users.map(user => <p key={user.socketID}>{user.userName}</p>)}
            </div>
        </div>
        <div>
            <h4  className='chat__header'>AVILABLE ROOMS</h4>
        </div>
  </div>
  )
}

export default ChatBar