document.getElementById("user_name").innerHTML = "Welcome " + localStorage.getItem("username");

//ADD YOUR FIREBASE LINKS HERE
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

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
                  console.log(Room_names);
                  //Start code
                  row = "<div class='room_name' id=" + Room_names + " onclick = 'redirectToRoomNmae(this.id)'>" + Room_names + "</div><hr>";
                  document.getElementById("output").innerHTML += row;
                  //End code
            });
      });
}
getData();

function redirectToRoomNmae(name) {
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}



function logout() {
      localStorage.removeItem("room_name");
      localStorage.removeItem("username");
      window.location("index.html");
}

function addRoom() {
      room_name = document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({ purpose: "addingRoom" });
      localStorage.setItem("room_name", room_name);
      window.location = "kwitter_page.html";
}