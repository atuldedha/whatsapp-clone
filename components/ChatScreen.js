import {useState, useRef} from 'react'
import styled from 'styled-components'
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollection} from 'react-firebase-hooks/firestore'
import { useRouter } from 'next/router';
import {auth, db} from '../firebase'
import {Avatar, IconButton} from '@material-ui/core'
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import firebase from 'firebase'
import Message from './Message';
import getRecipientEmail from '../utils/getRecipientEmail'

const ChatScreen = ({chat, messages}) => {

    const [user] = useAuthState(auth);
    const route = useRouter();

    const endOfMessageRef = useRef(null) 

    const recipientEmail = getRecipientEmail(chat.users, user)


    const [input, setInput] = useState('');

    const [messagesSnapshot] = useCollection(db.collection('chats').doc(route.query.id).
        collection('messages').orderBy('timestamp', "asc"));

    
    const [recipientSnapshot] = useCollection(db.collection("users")
        .where("email", "==", recipientEmail)
     );


    const showMessages = () => {
        if(messagesSnapshot) {
            return messagesSnapshot.docs.map((message) =>(
                <Message 
                    key = {message.id} 
                    user = {message.data().user}
                    message = {{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime()
                    }}
                />
            ))
        }else{
            return JSON.parse(messages).map((message) => (
                <Message key = {message.id} user = {message.user} message = {message} />
            ))
        }
    }

    const scrollToBottom = () => {
        endOfMessageRef.current.scrollIntoView({
            behavior: "smooth",
            block : "start"
        })
    }

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        }, {merge: true})
        
        db.collection("chats").doc(route.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            user: user.email,
            photoURL: user.photoURL
        })

        setInput("");
        scrollToBottom();

    }

    const recipient = recipientSnapshot?.docs?.[0]?.data()
   
    return (
        <Container>
            <Header>

                {recipient ? (

                    <UserAvatar src = {recipient?.photoURL}/>
                ) : (
                    <UserAvatar src = {recipientEmail[0]}/>
                )}

                

                <HeaderInformation>

                    <h3>{recipientEmail}</h3>
                    

                    {recipientSnapshot ? (
                        <p>
                            last Seen {' '}

                            {recipient?.lastSeen?.toDate() ? (
                                <TimeAgo 
                                    datetime = {recipient?.lastSeen?.toDate()}
                                />
                            ): 'unavailable'}

                        </p>

                    ): (
                        <p>Loading last seen</p>
                    )} 

                </HeaderInformation>
 
                <HeaderIcons>
                    <IconButton>

                        <AttachFileIcon />

                    </IconButton>
                        
                        <MoreVertIcon />

                    <IconButton>


                    </IconButton>
                </HeaderIcons>
            </Header>

            <MessageContainer >

                {showMessages()}
                <EndOfMessage ref = {endOfMessageRef}/>

            </MessageContainer>

            <InputContainer >

                <InsertEmoticonIcon />

                <Input value = {input} onChange = {(e) => setInput(e.target.value)}/>
                <button hidden disabled = {!input} type = "submit" onClick = {sendMessage}> Send Message</button>

                <MicIcon />

            </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div``;

const Header = styled.div`
    position: sticky;
    background-color: white;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)``;

const HeaderInformation = styled.div`
    margin-left: 15px;
    flex: 1;

    >h3 {
        margin-bottom: 3px;
    }

    >p {
        font-size: 14px;
        color: gray;
        
    }
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height: 90vh;
`;

const EndOfMessage = styled.div`
    margin-bottom: 50px;
`;

const InputContainer = styled.form`
    display:flex;
    align-items: center;
    padding: 10px;
    background-color: white;
    z-index: 100;
    bottom: 0;
    position: sticky;
`;

const Input = styled.input`
    flex: 1;
    padding: 20px;
    background-color: whitesmoke;
    outline: 0;
    border: none;
    border-radius: 10px;
    margin: 0px 10px;
`;