const socket = io();

const sendBtn = document.getElementById('send-btn');
const chatInput = document.getElementById('chat-input');
const messagesContainer = document.getElementById('messages');

// List of 15 random emojis
const emojis = [
    '😊', '😂', '❤️', '🔥', '🥳', '😎', '🤔', '😢', '🎉', '👍',
    '🤩', '💀', '😱', '🥺', '💯'
];

// Function to get a random emoji
function getRandomEmoji() {
    return emojis[Math.floor(Math.random() * emojis.length)];
}

sendBtn.addEventListener('click', () => {
    const message = chatInput.value;
    if (message) {
        const emoji = getRandomEmoji();  // Get a random emoji
        socket.emit('chatMessage', { content: message, username: 'User', emoji });
        chatInput.value = '';
    }
});

socket.on('chatMessage', (msg) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `${msg.username}: ${msg.content} <span class="emoji">${msg.emoji}</span>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});

// Emoji Buttons
document.querySelectorAll('.emoji-btn').forEach(button => {
    button.addEventListener('click', (event) => {
        const emoji = event.target.textContent;
        socket.emit('emojiMessage', { emoji });
    });
});

socket.on('emojiMessage', (emoji) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `Emoji: <span class="emoji">${emoji.emoji}</span>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
