
//ADD YOUR FIREBASE LINKS HERE
const firebaseConfig = {
      apiKey: "AIzaSyBtX69rbUebTkdFfMqVhz2CaiIgAt2VZdk",
      authDomain: "letschat-web-app---1-2124e.firebaseapp.com",
      databaseURL: "https://letschat-web-app---1-2124e-default-rtdb.firebaseio.com",
      projectId: "letschat-web-app---1-2124e",
      storageBucket: "letschat-web-app---1-2124e.appspot.com",
      messagingSenderId: "969487261528",
      appId: "1:969487261528:web:ded6213a94b5f99c318f2d"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
user_name = localStorage.getItem("username");
document.getElementById("user_name").innerHTML = "Welcome "+user_name+"!";

function add_room() {
      room_name = document.getElementById("room_name").value;

    localStorage.setItem("roomname", room_name);

    window.location="kwitter_page1.html";

    firebase.database().ref("/").child(room_name).update({
      purpose: "Adding Room Name"
    });
}
function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       firebase_message_id = childKey; 
       message_data=childData;
      //Start 
       console.log(firebase_message_id);
       console.log(message_data);
      name=message_data['name'];
      message=message_data['message'];
      like=message_data['like'];
      name_with_tag="<h4>"+ name +"<img class='user_tick' src='tick.png'></h4>";
      message_with_tag="<h4 class='message_h4'>" + message + "</h4>";
      like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
      span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

      row=name_with_tag + message_with_tag + like_button + span_with_tag;

      document.getElementById("output").innerHTML += row;
      //End code
      });});}
getData();

function updateLike(message_id)
{
  console.log("click on like button - " + message_id);
  button_id=message_id;
  likes=document.getElementById(button_id).value;
  updated_likes=Number(likes) + 1;
  console.log(updated_likes);

  firebase.database().ref(room_name).child(message_id).update({
    like : updated_likes
  });
}

function logout()
{
  localStorage.removeItem("user_name");
  localStorage.removeItem("room_name");
  window.location.replace("index.html");
}