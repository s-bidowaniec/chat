import { io } from 'https://cdn.socket.io/4.4.1/socket.io.esm.min.js';
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');
let userName = ''
const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content))

// Validators
const validate = (name) => {
    const notEmpty = name !== '';
    return notEmpty
}
// User login form
const login = (e) => {
    e.preventDefault()
    if (validate(userNameInput.value)){
        userName = userNameInput.value
        socket.emit('login', userName)
        loginForm.classList.toggle('show')
        messagesSection.classList.toggle('show')
    } else {
        alert("Name is not valid!");
    }
}
loginForm.addEventListener('submit', login)

// Message form
const addMessage = (author, message) => {
    const messageHTML = document.createElement("li");
    const header = document.createElement("h3");
    const content = document.createElement("div");
    messageHTML.classList.add("message", "message--received");
    if (author === userName) {
        messageHTML.classList.add("message--self");
        header.innerText = 'You'
    } else if (author === 'Chat Bot'){
        messageHTML.classList.add("message--chat");
        header.innerText = author
    } else {
        header.innerText = author
    }
    header.classList.add('message__author')
    content.classList.add('message__content')
    content.innerText = message
    messageHTML.appendChild(header)
    messageHTML.appendChild(content)
    messagesList.appendChild(messageHTML)
}
const sendMessage = (e) => {
    e.preventDefault()
    if (validate(messageContentInput.value)){
        const message = messageContentInput.value
        addMessage(userName, message)
        socket.emit('message', { author: userName, content: message })
        messageContentInput.value = ''
    } else {
        alert("Message is not valid!");
    }
}

addMessageForm.addEventListener('submit', sendMessage)