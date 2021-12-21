# Chat Application

>## Tech Stack:
Node , Express , Socket.io , Mongodb

>## Introduction :
In this application the users can connect to a room and send messages in that room.
</br>The messages sent by users will be only visible to the users connected to that room.

>## Database :
***file location :- database/mongoConnection.js***
</br>Data is saved in mongodb cloud. 
</br>DB Schema -> {roomname :name ,connectedusers:[{ id , name , isAdmin }] , messages:{ id , content , userId , time }}

>## Socket Events :
***file location :- sockets/ws.js***
</br>Socket event to join room :- "room"
</br>Socket event to send message :- "chat message"
</br>Socket event to leave room :- "leave room"

>## API :
***file location :- routes/room.route.js***
</br>The file contains code for making a get request on server.
</br>The response is a json object containing all rooms in the database , or response with a particular room if roomID is passed in URI.

>## Frontend :
***file location :- static/index.html***
</br>The index.html file contains the code for entering fields such as username , roomname & chat message.
</br>Contains the script tag for handling click events

>## How it works :
1. Start the node server on backend using the following command :
</br>`npm run dev`
</br>(*The server starts runnning on local machine port 3000*)

2. In the browser open url : 
</br>http://localhost:3000
</br>(*The index.html is served on this page*)

3. Enter the username , roomname to join & click join room button.
</br>(*If the room already exists then the user will be connected to that room , else new room will get created , data will be populated in database for
roomname & username*)

4. Write your message in text box & hit send message button.
</br>(*The message will get broadcasted to every connected user in the room , all the messages sent/recieved will be visible on top of the page
& will also get saved in the database in the room entry corresponding to the current connected room*)

5. Click on leave room button to exit from the connected room.
</br>(*User will exit from the room , corresponding entry against room for that user will also get deleted*)
