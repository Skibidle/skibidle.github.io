export class NotificationManager {
    constructor() {
        this.notificationCenter = document.getElementById('notification-center');
        this.setupWebSocket();
    }

    setupWebSocket() {
        this.socket = new WebSocket('wss://api.yoursite.com/notifications');
        this.socket.onmessage = (event) => this.displayNotification(event.data);
    }

    displayNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        this.notificationCenter.appendChild(notification);
    }
}
