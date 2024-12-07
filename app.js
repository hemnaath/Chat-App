require("dotenv").config();
const express = require("express");
const session = require("express-session");
const passport = require("./config/passport");
const authRoutes = require("./routes/authRoutes");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoutes);

app.use(express.static(path.join(__dirname, "views")));

io.on("connection", (socket) => {
	socket.on("register user", (username) => {
    	if (!username) {
      		console.warn("No username provided");
      		return;
    	}
    	socket.username = username;
  	});
  	socket.on("chat message", (msg) => {
    	const username = socket.username;
    	io.emit("chat message", { username, message: msg });
  	});
  	socket.on("disconnect", () => {
    	console.log(`${socket.username || "A user"} disconnected`);
  	});
});


server.listen(1731, ()=>{
	console.log("server connected");
})
