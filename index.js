

var client=io();
var username='user';
//auth strt

var firebaseConfig = {
    apiKey: "AIzaSyBm4-z34aUVAsVCoNBG_BW7jRras2t2Q8c",
    authDomain: "auth-38516.firebaseapp.com",
    databaseURL: "https://auth-38516.firebaseio.com",
    projectId: "auth-38516",
    storageBucket: "auth-38516.appspot.com",
    messagingSenderId: "372230674711",
    appId: "1:372230674711:web:3e1b7ca6d0a08cf2cdbf52",
    measurementId: "G-ECKT7FTBKH"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  


function login(){
    $('.username_page ').hide()

    function newlogin(user){
        if(user){
            app(user);
        }
        else{
            var provider=new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider);

        }
    }
 firebase.auth().onAuthStateChanged(newlogin)
}

function app(user){
    $('.username_page ').show()
    console.log(user.displayName)
    
}
  window.onload= login


//socket strt
 $('#message').on('input',()=>{ 
    let msg= $('#message').val();
    client.emit('msgdisplay',{username:username,msg:msg})
    
  })

 $('.middle').dblclick(()=>{
     alert('hello')
 })   

   client.on('msgall',(data)=>{
    $('.msgdisplaytoall').text('')
      $('#future').append('<p class="animated  fadeInLeft">'+'<b>'+data.username+': </b>'+data.data+'</p>'); 
      var elem = document.getElementById('midscroll');
      elem.scrollTop = elem.scrollHeight+20;       
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
     $('#future').append(`<span class="animated  bounce"><kbd>${username}</kbd> has joined</span`)
 })
 
 client.on('animation',()=>{
     console.log('do animation')
     $('body').toggle()
 })
   $('#chatpage').hide()

   $('.submitname').submit((e)=>{
      e.preventDefault();
     username= $('.username').val()
     client.emit('username',username);
     

    $('.username_page').hide()
   $('#chatpage').show()
  }) 
 
  

$('#submitmsg').submit((e)=>{
    e.preventDefault();  //to prevent form submission
     
   
    
     var message = $('#message').val();
     $('#future').append('<div >'+'<b>You: </b>'+message+'</div>');  
     $('#message').val('');
     client.emit('newmsg', message);
     
     var elem = document.getElementById('midscroll');
     elem.scrollTop = elem.scrollHeight;
     
      });

 $('.msg').keypress(()=>{

     client.emit('typing',username)

    
     })  
$('.msg').focusout(()=>{
    client.emit('stoptyping')
       

    })

  $('#animate').click((e)=>{
      e.preventDefault()
      client.emit('animate')
  })  