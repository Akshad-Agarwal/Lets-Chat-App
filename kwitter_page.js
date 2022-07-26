//YOUR FIREBASE LINKS
const firebaseConfig = {
      apiKey: "AIzaSyBAJqeDTgF3GOzidb9qBrlggj5YcGw2l_I",
      authDomain: "chat-app-web-app.firebaseapp.com",
      databaseURL: "https://chat-app-web-app-default-rtdb.firebaseio.com",
      projectId: "chat-app-web-app",
      storageBucket: "chat-app-web-app.appspot.com",
      messagingSenderId: "167825594417",
      appId: "1:167825594417:web:bda632dabc87de9dc59d10"
};

firebase.initializeApp(firebaseConfig);

room_name = localStorage.getItem("room_name");
username = localStorage.getItem("username");


function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);

                        name1 = message_data['name'];
                        message = message_data['message'];
                        likes = message_data['like'];

                        name_html = '<h4>'+name1+'<img class="user_tick" src = "tick.png"></h4>';
                        message_html = '<h4 class="message_h4">' +message+        '</h4>';
                        like_html= '<button class= "btn btn-primary" onclick = "update_like(this.id)" value = "'+likes+'">'
                        icon_html= '<span class= "glyphicon glyphicon-thumbs-up">like: '+likes+'</span> </button> </hr>';

                        document.getElementById("output").innerHTML += name_html + message_html + like_html + icon_html;

                        //End code
                  }
            });
      });
}
getData();

function LOGOUT() {
      localStorage.removeItem("room_name");
      localStorage.removeItem("username");
      window.location = "index.html";
}


function sent() {
      SM = document.getElementById("message").value;
      firebase.database().ref(room_name).push({
            name: username, message: SM, like: 0
      });
      document.getElementById("message").value = "";
}

function update_like(message_id){
      buttonid = message_id;
      likes = document.getElementById(buttonid).value;
      update_likes = Number(likes)+1;
      firebase.database().ref(room_name).child(message_id).update({like: update_likes});
}