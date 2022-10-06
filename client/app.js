const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');
let userName = ''

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
        messageContentInput.value = ''
    } else {
        alert("Message is not valid!");
    }
}
addMessageForm.addEventListener('submit', sendMessage)