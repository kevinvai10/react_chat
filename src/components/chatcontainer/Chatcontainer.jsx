import React from 'react'
import io from 'socket.io-client'
import Chatwindow from '../chatwindow/Chatwindow'
import './Chatcontainer.style.css'
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
        this.socket.emit('message', id,msg,this.state.user.id);
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
                        <h2 className="chat-container-text">User List</h2>
                    </header>
                    <div>
                        <h3 className="chat-container-text">Direct Messages</h3>
                    {
                        
                        userList && userList.map(user => {
                                if(user.id === myUser.id){
                                    return <div key={user.id} className="user-list-element" onClick={() => this.joinChat(user)}><strong className="chat-container-text">{user.name + " (You)"}</strong></div>
                                }
                                return <div key={user.id} className="user-list-element" onClick={() => this.joinChat(user)}><strong className="chat-container-text">{user.name + "(" + user.status + ")"}</strong></div>
                        })
                    }
                    </div>
                </div>
                <div className="chat-window-container">
                    {
                        this.state.activeRoom && <Chatwindow chatroom={this.state.activeRoom} submitMessage={this.submitMessage} user={this.state.user}/>
                    }
                </div>
            </div>
        )
    }
}

export default Chatcontainer;