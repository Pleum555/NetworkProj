import React, {useState, useEffect} from 'react'
const room_path = "http://localhost:4000/api/v1/rooms"
const ChatBar = ({socket}) => {
    const [users, setUsers] = useState([])
    const [allRoom, setAllRoom] = useState([]);
    useEffect(()=> {
        socket.on("newUserResponse", data => setUsers(data))
    }, [socket, users])

    const newchatroom = async (e) => {
        e.preventDefault()
        //console.log('aftersubmit')
        const data = {
            name: "new12"
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
            window.location.reload()
            console.log(result)
        }
        
    }

    useEffect(() => {
        const getRoom =async () =>{
            const respone = await fetch(room_path, { 
                method: "GET"
            });
            const result = await respone.json();
            if (!respone.ok) {
                alert(result.error);
            } else {
                setAllRoom(result)
                console.log(result)
            }
        }
        getRoom();
        console.log("all rooms: "+allRoom);
    },[]);


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
        <button className="sendBtn" onClick={newchatroom} style={{marginTop:"10px"}}>Create Room</button>
        </div>
        <div>
            <h4  className='chat__header'>ACTIVE USERS</h4>
            <div className='chat__users'>
                {users.map(user => <p key={user.socketID}>{user.userName}</p>)}
            </div>
        </div>
        <div>
            <h4  className='chat__header'>AVILABLE ROOMS</h4>
            <div className='chat__users'>
                {allRoom.map(room => <p>{room.name}</p>)}
            </div>
        </div>
  </div>
  )
}

export default ChatBar