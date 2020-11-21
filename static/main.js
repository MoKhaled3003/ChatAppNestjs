const app = new Vue({
    el: '#app',
    data: {
        title: 'Nestjs Websockets Chat',
        name: '',
        text: '',
        messages: [],
        socket: null
    },
    methods: {
        sendMessage() {
            if(this.validateInput()) {
                const message = {
                    name: this.name,
                    text: this.text
                }
                this.socket.emit('messageToServer', message)
                this.text = ''
            }
        },
        receivedMessage(message) {
            this.messages.push(message)
        },
        validateInput() {
            return this.name.length > 0 && this.text.length > 0
        }
    },
    created() {
        this.socket = io('http://localhost:3000/', { transports: ['websocket'], path: '', query: { token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1vb29rZWVrayIsImlhdCI6MTYwNTk2NjY4N30.zun9VDLcdjHdmg3UBCtoHpz1Hv5vRCcM43cXKRqT7Sw' } })
        this.socket.on('messageToClient', (message) => {
            this.receivedMessage(message)
        })
    }
})