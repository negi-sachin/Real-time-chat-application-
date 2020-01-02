
var client=io();
var username='user';
 $('#message').on('input',()=>{ 
    let msg= $('#message').val();
    client.emit('msgdisplay',{username:username,msg:msg})
    
  })
    
   client.on('msgall',(data)=>{
    $('.msgdisplaytoall').text('')
      $('#future').append('<p>'+'<b>'+data.username+': </b>'+data.data+'</p>');        
   })
 
   client.on('totalclient',(data)=>{  //will show updated cleints that are online
    document.getElementById('totalclients').innerHTML=data;
 }) 


 client.on('msgdisplaytoall',msg=>{
     $('.msgdisplaytoall').text(msg.username+': '+msg.msg)
 })
 
 client.on('showtyping',username=>{
     $('.typing').text(username+' is typing...')
 })
 
 
 client.on('typingstopped',()=>{
     $('.typing').text('')
 }) 

 client.on('joined',(username)=>{
     $('.joined').text(username+' joined')
 })
 
   $('#chatpage').hide()

   $('.submitname').submit((e)=>{
      e.preventDefault();
     username= $('.username').val()
     client.emit('username',username);
     

    $('.submitname').hide()
   $('#chatpage').show()
  }) 
 
  

$('#submitmsg').submit((e)=>{
    e.preventDefault();  //to prevent form submission
     
   

     var message = $('#message').val();
     $('#message').val('');
     client.emit('newmsg', message);

     
      });

 $('.msg').keypress(()=>{

     client.emit('typing',username)

    
     })  
$('.msg').focusout(()=>{
    client.emit('stoptyping')
       

    })