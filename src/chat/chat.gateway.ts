import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway,  } from '@nestjs/websockets';
import { Socket } from 'socket.io';

interface userConnection{
  connectionID:string,
  user_id:string,
  meeting_id:string
}

@WebSocketGateway({allowEIO3:true})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect{
  private userConnections: userConnection[] = []

  handleDisconnect(socket: Socket) {
    console.log('Disconnected');
    const disUser = this.userConnections.find((p) => p.connectionID === socket.id);
    if (disUser) {
      const meetingid = disUser.meeting_id;
      this.userConnections = this.userConnections.filter((p) => p.connectionID !== socket.id);
      const list = this.userConnections.filter((p) => p.meeting_id === meetingid);
      list.forEach((v) => {
        const userNumberAfUserLeave = this.userConnections.length;
        socket.to(v.connectionID).emit('inform_other_about_disconnected_user', {
          connId: socket.id,
          uNumber: userNumberAfUserLeave,
        });
      });
    }
  }

 
  handleConnection(client:Socket){
    console.log("Socket id: "+client.id)

  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: any): string {
    return 'Hello world!';
  }

  

  @SubscribeMessage("userconnect")
  handleUserConnect(client:Socket, payload:any){
    
    const other_users = this.userConnections.filter((user)=> user.meeting_id === payload.meetingid)
    this.userConnections.push({
      connectionID:client.id,
      user_id:payload.displayName,
      meeting_id:payload.meetingid
    })
    other_users.forEach((user)=>{
      client.to(user.connectionID).emit('new_user_added',{
        other_user_id: payload.displayName,
        connId: client.id,
        userNumber: this.userConnections.length,
      })
      client.emit('inform_me_about_other_user', other_users);
    })
    
  }

  @SubscribeMessage('SDPProcess')
  handleSDPProcess(socket: Socket, data: any) {
    socket.to(data.to_connid).emit('SDPProcess', {
      message: data.message,
      from_connid: socket.id,
    });
  }

  @SubscribeMessage('sendMessage')
  handleSendMessage(socket: Socket, msg: string) {
    console.log(msg);
    const mUser = this.userConnections.find((p) => p.connectionID === socket.id);
    if (mUser) {
      const meetingid = mUser.meeting_id;
      const from = mUser.user_id;
      const list = this.userConnections.filter((p) => p.meeting_id === meetingid);
      list.forEach((v) => {
        socket.to(v.connectionID).emit('showChatMessage', {
          from: from,
          message: msg,
        });
      });
    }
  }

  @SubscribeMessage('fileTransferToOther')
  handleFileTransfer(socket: Socket, msg: any) {
    console.log(msg);
    const mUser = this.userConnections.find((p) => p.connectionID === socket.id);
    if (mUser) {
      const meetingid = mUser.meeting_id;
      const from = mUser.user_id;
      const list = this.userConnections.filter((p) => p.meeting_id === meetingid);
      list.forEach((v) => {
        socket.to(v.connectionID).emit('showFileMessage', {
          username: msg.username,
          meetingid: msg.meetingid,
          filePath: msg.filePath,
          fileName: msg.fileName,
        });
      });
    }
  }

  @SubscribeMessage('sendHandRaise')
  handleHandRaise(socket: Socket, data: any) {
    const senderID = this.userConnections.find((p) => p.connectionID === socket.id)!;
    console.log('senderID :', senderID.meeting_id);
    if (senderID.meeting_id) {
      const meetingid = senderID.meeting_id;
      const list = this.userConnections.filter((p) => p.meeting_id === meetingid);
      list.forEach((v) => {
        const userNumberAfUserLeave = this.userConnections.length;
        socket.to(v.connectionID).emit('HandRaise_info_for_others', {
          connId: socket.id,
          handRaise: data,
        });
      });
    }
  }
}

