const app=require('express')();
const http=require('http').Server(app);
const io=require('socket.io')(http);

app.use(require('express').static(__dirname+'/web'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
});

var clients=0;

io.on('connect',(client)=>{
    clients++;
    console.log('User connected ');
   //client username assignment 
    client.on('username',data=>client.username=data||'Anonymous')
  //total online
    io.sockets.emit('totalclient',clients);
//client joined
client.broadcast.emit('joined',client.username+' joined');

  //msg showing  
    client.on('newmsg',(data)=>{ 
        io.sockets.emit('msgall',{data:data,username:client.username})
        console.log('msg :'+data)})


   //disconnect code     
    client.on('disconnect',()=>{
        clients--;
        io.sockets.emit('totalclient',clients);
        console.log('User Disconnected ')
    });
})

//running server at port 3000
http.listen(3000,()=>console.log('Server running at port 3000'));