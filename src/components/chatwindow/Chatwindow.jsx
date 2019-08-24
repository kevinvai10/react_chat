import React, {useState} from 'react'
import './Chatwindow.style.css'
import 'tachyons';

const Chatwindow = ({chatroom, submitMessage, user}) => {
    //console.log('my props : ', props)
    const [value, setValue] = useState(''); 
    const handleChange = (e) => {
        setValue(e.target.value);
    }   
    const handleSubmitMessage = (event) => {
        event.preventDefault();
        submitMessage(chatroom.id, value);
        setValue('');
    }
    
    return(
        <section>
            <header className="chat-window-header">
                <h1>{chatroom.user1.id === user.id ? chatroom.user2.name  : chatroom.user1.name }</h1>
            </header>
            <div className="chat-messages" id="messageBody">
                {
                    chatroom.messageHistory && chatroom.messageHistory.map(message => {
                        if(message.senderId === user.id){
                            return <div className="chat-message-box-user1"><strong>{message.message}</strong></div>
                        } else{
                            return <div className="chat-message-box-user2"><strong>{message.message}</strong></div>
                        }
                    })
                }
            </div>
            <footer className="chat-footer">
                <form onSubmit={handleSubmitMessage}>
                <input 
                    onChange={handleChange}
                    value={value}
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90 chat-message-input"
                    placeholder="Type your message"
                />
                </form>
            </footer>
        </section>
    )
}

export default Chatwindow;