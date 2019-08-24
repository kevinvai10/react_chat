import React, {useState} from 'react'
import './Chatwindow.style.css'
import 'tachyons';
const Chatwindow = ({chatroom, submitMessage}) => {
    //console.log('my props : ', props)
    const [value, setValue] = useState(''); 
    const handleChange = (e) => {
        setValue(e.target.value);
    }   
    const handleSubmitMessage = () => {
        submitMessage(chatroom.id, value);
        setValue('');
    }

    return(
        <section>
            <header className="chat-window-header">
                <h1>{chatroom.user1.name + " talking to " + chatroom.user2.name}</h1>
                <p>{chatroom.user1.status}</p>
            </header>
            <div>
                {
                    chatroom.messageHistory && chatroom.messageHistory.map(message => {
                        return <p>{message}</p>
                    })
                }
            </div>
            <footer>
                <input 
                    onChange={handleChange}
                    value={value}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    placeholder="Type your message"
                />
                <button onClick={handleSubmitMessage}>Send</button>
            </footer>
        </section>
    )
}

export default Chatwindow;