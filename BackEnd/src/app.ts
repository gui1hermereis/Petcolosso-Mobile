import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { router, routerFormData } from "./routes";
import bodyParser from "body-parser";
const formidable = require('express-formidable');

const app = express();

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, { cors: { origin: "*" } });

io.on("connection", (socket) => console.log(`Usuário conectado no socket ${socket.id}`));

app.use(express.json());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(cors());
app.use("/csi-api", router)

app.use(formidable());
app.use(bodyParser.json());
app.use("/csi-api", routerFormData);

export { serverHttp, io };
