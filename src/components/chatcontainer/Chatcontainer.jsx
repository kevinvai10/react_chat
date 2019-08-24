import React from 'react'
import io from 'socket.io-client'
import Chatwindow from '../chatwindow/Chatwindow'
import './Chatcontainer.style.css'
/*const Chatcontainer = (props) => {
    const socket = io("http://localhost:3001")
    const [userList, setUserList] = useState([]);    
    //const user = props.user;    
    //-------------------socket logic----------------
    socket.on("connect", function(){
        socket.on('logout', function(user){
            /**
             * delete user from socket active users
             
        })/*
        /*socket.on('login', function (user) {
            //add user to active users
            /**
             * send the following body
             * user = {
             *      id,
             *      name,
             *      status,
             * }
             * 
             * room ={
             *      id,
             *      user1,
             *      user2,
             *      messages["user 1 says: hello man", "user2 says: hey what's up bro]
             * }
            });
            */
        /*socket.on('joinlobby', function(user){
            debugger;
            console.log('someone joined the lobby', user)
            let newUserList = [...userList];
            newUserList.push(user);
            setUserList(newUserList);
        })

        socket.on('login', function(userList){
            debugger;
            console.log('someone loggedin')
            setUserList(userList);
        })
    });
    //didmout sned
    return(
        <div>
            <h1>chat container</h1>
            <div>
                <h1>{"Welcome!"}</h1>
                <h2>User List</h2>
                {
                    userList && userList.map(user => {
                    if(user.status) return <><h1 key={user.id}>{user.name}></h1></>
                })
                }
            </div>
        </div>
    )
}*/
//const socket = io("http://localhost:3001");

class Chatcontainer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userList : [],
            user: this.props.user,
            activeRoom: null,
        }
        this.changeData = this.changeData.bind(this);
        this.updateData = this.updateData.bind(this);
        this.logout = this.logout.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.joinChat = this.joinChat.bind(this);
        this.submitMessage = this.submitMessage.bind(this);
    }

    changeData(userList){
        console.log('userlist received from socket: ', userList)
        this.setState({userList: userList})
    }

    submitMessage(id,msg){
        this.socket.emit('message', id,msg);
    }

    updateData(user){
        //user already in the list? just set it to online
        const [...userList] = this.state.userList;
        console.log('da user list: ' , userList);
        let userExists = false;
        for(let userObj of userList){
            if(userObj.id === user.id) userExists = true;
        }

        if(userExists){
            const newUserList = userList.map(userObj => {
                if(userObj.id === user.id){
                    userObj.status = 'online'
                    return userObj;
                }
                return userObj;
            })

            this.setState({userList: newUserList});
        }
        //user doesn't exist ? add it to the list
        else{
            let newUserList = [...userList]
            newUserList.push(user);
            this.setState({userList: newUserList});
            console.log('my new user list', newUserList);
        }
    }

    logout(user){
        console.log('logout entered becaue of arrow function and received', user.ChatcontaineruserId)
        const newUserList = this.state.userList.map(userObj => {
            debugger;
            if(userObj.id === user.userId){
                userObj.status = "offline"
                return userObj;
            } 
            return userObj;
        })

        this.setState({userList: newUserList})
    }

    joinChat = (user2) => {
        debugger;
        const {user} = this.state;
        this.socket.emit('joinchat', user, user2)
    }

    handleClick = (id) => {
        this.joinChat(id)
    }

    updateActiveRoom = room => {
        this.setState({activeRoom:room})
    }

    componentDidMount = () => {
        //socket emit login()
        console.log('who this? ' , this);
        const changeData = this.changeData;
        const updateData = this.updateData;
        //const updateData = this.updateData;
        this.socket = io("http://localhost:3001");
        this.socket.emit('login', this.props.user);
        this.socket.on('login', (userList) =>{
            //console.log('someone loggedin')
            changeData(userList);
        })
        this.socket.on('joinlobby', (user) => {
            updateData(user);
        })

        this.socket.on('messagereceived', (room) => {
            debugger;
            console.log('listener of messagereceived was launched');
            if(room.user1.id === this.state.user.id || room.user2.id === this.state.user.id){
                this.updateActiveRoom(room);
            }
        })

        this.socket.on('joinchat', (room) => {
            debugger;
            console.log('room received : ', room);
            //if we belong to the created room display info
            if(room.user1.id === this.state.user.id || room.user2.id === this.state.user.id){
                this.updateActiveRoom(room);
            }
        })

        this.socket.on('logout', (userid) => {
            this.logout(userid);
        })
    }
    render(){
        const {userList} = this.state;
        const myUser = this.state.user;
        console.log('my user list: ', userList);
        return(
            <div className="chat-container">
                <div className="user-list-container">
                    <header className="user-list-header">
                        <h2>User List</h2>
                    </header>
                {

                    userList && userList.map(user => {
                        if(user.status === 'online'){
                            if(user.id === myUser.id){
                                return <div key={user.id} className="user-list-element" onClick={() => this.joinChat(user)}><h4>{user.name + " (You)"}</h4></div>
                            }
                            return <div key={user.id} className="user-list-element"><h4 onClick={() => this.joinChat(user)}>{user.name}</h4></div>
                        }
                        else return null;
                    })
                }
                </div>
                <div className="chat-window-container">
                    {
                        this.state.activeRoom && <Chatwindow chatroom={this.state.activeRoom} submitMessage={this.submitMessage}/>
                    }
                </div>
            </div>
        )
    }
}

export default Chatcontainer;