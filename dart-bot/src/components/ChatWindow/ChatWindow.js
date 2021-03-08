import React from 'react';
import './ChatWindow.css';

const ChatList = (props) => {
    const { message, poster } = props.message;

    return(

        <li className={`${poster} listItem`}>
            {poster} : {message}
        </li>
    )
}

export default ChatList;


