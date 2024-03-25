import { Logger } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST'],
    credentials: true
  }
})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('msgToClient', payload, client.id);
  }

  afterInit(server: Server) {
    this.logger.log('init');
  }

  handleConnection(client: Socket) {
    // this.logger.log(`Cliente conectou: ${client.id}`);
    console.log(`Cliente conectou: ${client.id}`)
  }

  handleDisconnect(client: Socket) {
    // this.logger.log(`Cliente desconectou: ${client.id}`);
    console.log(`Cliente desconectou: ${client.id}`)
  }
}
