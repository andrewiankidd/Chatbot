import WebSocket, { RawData, WebSocketServer } from 'ws';
import { v4 as uuid } from 'uuid';
import {EventEmitter} from 'events';

export default class wshelper extends EventEmitter {

    private wss: WebSocketServer;
    private wsc: Map<WebSocket, any>;

    constructor() {
        super();
        this.wss = new WebSocket.Server({ port: 7071 });
        this.wsc = new Map();
        this.wss.on('connection', (ws) => this.onConnection(ws));
    }

    private getClientById(id: string){
        return [...this.wsc.entries()].find(entry => entry[1].id === id)?.[0]
    }

    private getClientByWS(ws: WebSocket){
        return this.wsc.get(ws);
    }

    private onConnection(ws: WebSocket) {
        const metadata = {
            id: uuid(),
            color: Math.floor(Math.random() * 360)
        };

        this.wsc.set(ws, metadata);
        ws.on('message', (messageAsString) => this.onMessage(ws, messageAsString.toString()));
    }

    private onMessage(ws: WebSocket, messageAsString: string) {
        const metadata = this.getClientByWS(ws);
        const message = JSON.parse(messageAsString);
        console.log('onMessage', message, metadata);
        this.emit('onMessage', message, metadata);
    }

    public sendMessage(messageAsString: string, metadata: any) {
        console.log('sendMessage', messageAsString, metadata);
        const client = this.getClientById(metadata.id)
        client?.send(messageAsString)
    }
}