class Message {
    constructor(content, username, emoji = null) {
        this.content = content;
        this.username = username;
        this.emoji = emoji;  // emoji can be null if not included
        this.timestamp = new Date();
    }
}

module.exports = Message;
