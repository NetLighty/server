import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Prisma } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  /* transports: ['websocket'], */
  namespace: 'chat',
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  async handleMessage(
    client: Socket,
    payload: Prisma.ChatCreateInput,
  ): Promise<void> {
    //await this.chatService.createMessage(payload);
    console.log(payload);
    this.server.emit('message', payload);
  }

  afterInit(/* server: any */) {
    console.log('init');
  }

  handleConnection(client: Socket) {
    console.log(`Connected: ${client.id}`);
    if (!this.chatService.getClientId(client.id))
      this.chatService.addClient(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }
}
