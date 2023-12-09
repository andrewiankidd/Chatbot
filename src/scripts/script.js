document.addEventListener('alpine:init', () => {
    Alpine.store('threadStore', {
        activeThread: "thread-0",
        defaultThread: {
            loading: false,
            messages: [
                {
                    type: 'chatbot',
                    message: 'Hi! Ask me anything'
                }
            ]
        },
        threads: {},
        init() {
            console.log('init');
            this.newActiveThread()
        },
        getThread(threadName = this.activeThread) {
            console.log('getThread', threadName, this.threads[threadName]);
            return this.threads[threadName];
        },
        setActiveThread(threadName = this.activeThread) {
            console.log('setActiveThread', threadName);
            this.activeThread = threadName;
        },
        async newActiveThread(_threadName) {
            const threadName = _threadName ? _threadName : `thread-${Object.values(this.threads).length}`;
            console.log('newActiveThread', threadName);
            this.threads[threadName] = JSON.parse(JSON.stringify(this.defaultThread));
            this.setActiveThread(threadName);
        },
        async getThreadMessages(threadName = this.activeThread) {
            console.log('getThreadMessages', threadName);
            return this.threads[threadName].messages;
        },
        async newThreadMessage(threadName = this.activeThread, messagePayload) {
            console.log('newThreadMessage', threadName);
            this.threads[threadName].messages.push(messagePayload);
        },
        async toggleThreadLoading(threadName = this.activeThread) {
            console.log('toggleThreadLoading', threadName);
            this.threads[threadName].loading = !this.threads[threadName].loading;
        }
    });
})

document.addEventListener("DOMContentLoaded", function(_event) {

    (async function() {
        const ws = await connectToServer();

        async function connectToServer() {
            const ws = new WebSocket('ws://localhost:7071/ws');
            return new Promise((resolve, reject) => {
                const timer = setInterval(() => {
                    if(ws.readyState === 1) {
                        console.log('WS connected!');
                        clearInterval(timer);
                        resolve(ws);
                    } else {
                        console.log('WS connecting...');
                    }
                }, 10);
            });
        }

        ws.onmessage = (webSocketMessage) => {
            console.log(webSocketMessage);
            const messageBody = JSON.parse(webSocketMessage.data);
            console.log('onmessage', messageBody);
            Alpine.store('threadStore').toggleThreadLoading();
            Alpine.store('threadStore').newThreadMessage(Alpine.store('threadStore').activeThread, messageBody);
        };

        ws.onclose = () => {
            if (window.location.hostname === 'localhost' || window.confirm('connection lost reload?')) {
                window.location.reload();
            }
        }

        document.querySelector('form').addEventListener('submit', event => {
            event.preventDefault();
            const data = new FormData(event.target);
            const message = data.get('message');
            const messagePayload = { type: 'user', message };
            Alpine.store('threadStore').newThreadMessage(Alpine.store('threadStore').activeThread, messagePayload);
            ws.send(JSON.stringify(messagePayload));
            Alpine.store('threadStore').toggleThreadLoading();
            event.target.reset()
        });
    })();
});