import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose, { set } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import { Users } from "./models/usersModel.js";
import { protectedRoute } from "./middleware/auth.js";
import { Requests } from "./models/requestsModel.js";
import { ChatHistory } from "./models/chatHistoryModel.js";


const PORT = 3000;

const app = express();
app.use(
  cors({
    origin: "*",
  })
);
const server = http.createServer(app);

dotenv.config();
set("strictQuery", false);

 // Add cors middleware
app.use(express.json());

let env = process.env.NODE_ENV;
let baseUrl, feURL;
if (env === "development") {
  feURL = "http://localhost:5173";
} else {
  feURL = "https://intertwined-fe.vercel.app";
}

async function connectMongoDB() {
  try {
    let res = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Success: Database connected successfully`);
  } catch (error) {
    console.log(`MongoDB Initial Connection Error: ${error}`);
  }
}
connectMongoDB();

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST', 'PUT']
  }
});
io.on("connection", (socket) => {

  // WHEN SOMEONE SENDS A MESSAGE
  socket.on("send", async (data) => {
    const { message, reqEmail, resEmail } = data;
    // message is from: resEmail(sender) => to: reqEmail(receiver)
    console.log(message, reqEmail, resEmail);

    // check if sender of message has a chat history
    let senderChats = await ChatHistory.findOne({ owner: resEmail });

    // chats array to store the chat history between sender and receiver of message that will be sent back to the front end
    let chatsArray = [];

    // if sender doesn't have a chat history
    if (!senderChats) {
      let chatHistory = {
        owner: resEmail,
        chats: [
          {
            with: reqEmail,
            history: [
              {
                id: resEmail,
                text: message,
              },
            ],
          },
        ],
      };
      //create a chat history for sender and update it with the incoming message details
      let newChatHistory = await ChatHistory.create(chatHistory);
      // update chats array that stores chat history between sender and receiver of message that will later be sent back to the front end
      chatsArray = [{ id: resEmail, text: message }];
    }
    // if sender has a chat history
    else if (senderChats && senderChats.owner === resEmail) {
      let flag = "";
      // check if any chat history exists between sender and receiver of message
      for (let chats of senderChats.chats) {
        // if any chat history exists between sender and receiver of message
        if (chats.with === reqEmail) {
          let newChats = [...chats.history];
          // update chat history with the incoming message details
          newChats.push({ id: resEmail, text: message });
          chats.history = newChats;
          // update chats array that stores chat history between sender and receiver of message that will later be sent back to the front end
          chatsArray = newChats;
          flag = "on";
        }
      }
      // if no chat history exists between sender and receiver of message
      if (flag === "") {
        // create a new chat history between sender and receiver of message
        let newChats = {
          with: reqEmail,
          history: [{ id: resEmail, text: message }],
        };
        // update chat history with the incoming message details
        senderChats.chats.push(newChats);
        // update chats array that stores chat history between sender and receiver of message that will later be sent back to the front end
        chatsArray = [{ id: resEmail, text: message }];
      }
      // save updated details to sender chat history database
      senderChats.save();
    }

    //check if receiver of message has a chat history
    let receiverChats = await ChatHistory.findOne({ owner: reqEmail });

    // if receiver doesn't have a chat history
    if (!receiverChats) {
      let chatHistory = {
        owner: reqEmail,
        chats: [
          {
            with: resEmail,
            history: [
              {
                id: resEmail,
                text: message,
              },
            ],
          },
        ],
      };
      //create a chat history for receiver and update it with the incoming message details
      let newChatHistory = await ChatHistory.create(chatHistory);
      // update chats array that stores chat history between sender and receiver of message that will later be sent back to the front end
      chatsArray = [{ id: resEmail, text: message }];
    }
    // if receiver has a chat history
    else if (receiverChats && receiverChats.owner === reqEmail) {
      let flag = "";
      // check if any chat history exists between receiver and sender of message
      for (let chats of receiverChats.chats) {
        // if any chat history exists between receiver and sender of message
        if (chats.with === resEmail) {
          let newChats = [...chats.history];
          // update chat history with the incoming message details
          newChats.push({ id: resEmail, text: message });
          chats.history = newChats;
          flag = "on";
          // update chats array that stores chat history between sender and receiver of message that will later be sent back to the front end
          chatsArray = newChats;
        }
      }
      // if no chat history exists between receiver and sender of message
      if (flag === "") {
        // create a new chat history between receiver and sender of message
        let newChats = {
          with: resEmail,
          history: [{ id: resEmail, text: message }],
        };
        // update chat history with the incoming message details
        receiverChats.chats.push(newChats);
        // update chats array that stores chat history between sender and receiver of message that will later be sent back to the front end
        chatsArray = [{ id: resEmail, text: message }];
      }
      // save updated details to receiver chat history database
      receiverChats.save();
    }

    // console.log("EMIT");
    // send chats array, receiver of message sent, sender of message sent as an array to the front end
    io.emit("receive", { message: [chatsArray, reqEmail, resEmail] });
  });
});

app.post("/get-user-chats", async (req, res) => {
  try {
    let history = await ChatHistory.findOne({ owner: req.body.email });

    // Back up plan; LOL
    // await ChatHistory.findOneAndDelete({owner: "joeslay007@gmail.com"})
    // await ChatHistory.findOneAndDelete({owner: "segunsunday619@gmail.com"})
    // await ChatHistory.findOneAndDelete({owner: "elijahdimeji549@gmail.com"})
    // return
    // Back up plan; LOL

    // if owner doesnt have a chat history
    if (!history) {
      res.status(202).send({ message: "No Chats" });
      return;
    }

    // if owner has a chat history
    let newHistory = [];
    for (let item of history.chats) {
      let user = await Users.findOne({ email: item.with });
      let updated;
      if (user) {
        updated = { ...item, photo: user.photo };
      } else {
        updated = { ...item, photo: "" };
      }
      newHistory.push(updated);
    }
    // history.chats = newHistory
    // history.save()
    // console.log(newHistory)
    res.status(201).send({ message: newHistory });
  } catch (error) {
    res.status(502).send({ message: "Request Failed" });
  }
});

app.get("/", (req, res) => {
  res.status(200).send("Welcome! intertwined");
});

app.get("/dashboard-analytics", async (req, res) => {
  try {
    let users = await Users.find();
    let requests = await Requests.find();
    res
      .status(201)
      .send({ message: { users: users.length, requests: requests.length } });
  } catch (eror) {
    res.status(502).send({ message: { users: 0, requests: 0 } });
  }
});

app.post("/signup", async (req, res) => {
  // console.log(req.body)
  try {
    let user = await Users.find({ email: req.body.email });
    // console.log(1)
    if (user.length >= 1) {
      res.status(202).send({ message: "User Already Exists" });
      return;
    }
    // console.log(2)
    let encryptPassword = await bcrypt.hash(req.body.password, 12);
    let userDetails = { ...req.body, password: encryptPassword };
    user = await Users.create(userDetails);
    // console.log("jwt1")
    let token = jwt.sign(
      { email: req.body.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );
    // console.log(token)
    res.status(201).send({ message: token });
  } catch (error) {
    res.status(502).send({ message: "Account Creation Failed" });
  }
});

app.post("/login", async (req, res) => {
  // console.log(req.body)
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (!user) {
      res.status(202).send({ message: "Invalid Login Details" });
      return;
    }
    let isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    console.log(isPasswordCorrect);
    if (user && isPasswordCorrect) {
      const token = jwt.sign(
        { email: req.body.email },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );
      res.status(201).send({ message: token });
    } else {
      res.status(202).send({ message: "Invalid Login Details" });
    }
  } catch (error) {
    res.status(502).send({ message: "Login Failed" });
  }
});

app.put("/change-password", async (req, res) => {
  // console.log(req.body)
  try {
    let user = await Users.findOne({ email: req.body.email });
    // console.log(user)
    if (user && req.body.newPassword === req.body.confirmPassword) {
      let encryptPassword = await bcrypt.hash(req.body.newPassword, 12);
      user.password = encryptPassword;
      user.save();
      res.status(201).send({ message: "Password Changed Successfully" });
    } else {
      res
        .status(202)
        .send({ message: "This email is not registered with our database" });
    }
  } catch (error) {
    res.status(502).send({ message: "Password Change Failed" });
  }
});

app.post("/get-user", async (req, res) => {
  try {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
      res.status(201).send({ message: user });
    } else {
      res.status(202).send({ message: "No such user" });
    }
  } catch (error) {
    res.status(502).send({ message: "Request Failed" });
  }
});

app.get("/user/home", protectedRoute, async (req, res) => {
  // console.log("OUT")
  if (req.user) {
    // console.log("IN")
    // console.log(req.user)
    res.status(201).send({ message: req.user });
    return;
  }
  res.status(502).send({ message: "Request Failed" });
});

app.post("/user/submit-request", async (req, res) => {
  // console.log(req.body)
  try {
    let request = await Requests.create({ ...req.body });
    if (request) {
      res.status(201).send({ message: "Request Submit Successful" });
    } else {
      res.status(502).send({ message: "Request Submit Failed" });
    }
  } catch (error) {
    res.status(502).send({ message: "Request Submit Failed" });
  }
});

app.get("/get-all-requests", async (req, res) => {
  try {
    let requests = await Requests.find();
    // console.log(requests)
    res.status(201).send({ message: requests });
  } catch (error) {
    res.status(502).send({ message: "Request Failed" });
  }
});

server.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT ${PORT}`);
});
