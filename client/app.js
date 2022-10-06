const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');
let userName = ''

const validateUserName = (name) => {
    const notEmpty = name !== '';
    return notEmpty
}

const login = (e) => {
    e.preventDefault()
    if (validateUserName(userNameInput.value)){
        userName = userNameInput.value
        loginForm.classList.toggle('show')
        messagesSection.classList.toggle('show')
    } else {
        alert("Name is not valid!");
    }
}

loginForm.addEventListener('submit', login)