const app=require('express')();
const http=require('http').Server(app);
const io=require('socket.io')(http);

app.use(require('express').static(__dirname+'/'));
const port = process.env.PORT || 3000
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
});

var clients=0;

io.on('connect',(client)=>{
    clients++;
    console.log('User connected ');
   //client username assignment 
   client.on('username',data=>{client.username=data||'Anonymous'
   client.broadcast.emit('joined',client.username);
  })
  //total online
    io.sockets.emit('totalclient',clients);
//client joined


  //msg showing  
    client.on('newmsg',(data)=>{ 
        io.sockets.emit('msgall',{data:data,username:client.username})
        console.log('msg :'+data)
        
      })
//show others what user is typing
client.on('msgdisplay',msg=>{
  client.broadcast.emit('msgdisplaytoall',msg)
})
client.on('typing',username=>{
  client.broadcast.emit('showtyping',username)
})

client.on('stoptyping',()=>{
  client.broadcast.emit('typingstopped')
})

   //disconnect code     
    client.on('disconnect',()=>{
        clients--;
        io.sockets.emit('totalclient',clients);
        console.log('User Disconnected ')
    });
})

//running server at port 3000
http.listen(port,()=>console.log('Server running at port: '+port ));