import net from "node:net";
import { HOST, PORT, MAX_CLIENTS } from "../utilities/constants.js";
import console, { log } from "node:console";

const clients = new Map();

const currTime = () => {
  return new Date().toLocaleTimeString();
};

const broadcast = (socket, message) => {
  for (const client of clients.values()) {
    if (client !== socket) {
      client.write(message);
    }
  }
};

const privateMSG = (sender, message) => {
  return `[${currTime()}] ${sender} send: ${message}\n`;
};

const serverMSG = (message) => {
  return `[${currTime()}] server send: ${message}\n`;
};

const server = net.createServer((socket) => {
  if (clients.size >= MAX_CLIENTS) {
    socket.write(
      serverMSG("The Server reached maximum size of clients, try later.\n"),
    );
    socket.end();
    return;
  }

  console.log(
    `The new user soccessfully connected, ${socket.remoteAddress}: ${socket.remotePort}`,
  );
  let username = null;

  socket.write(serverMSG(` Welcome, enter you username\n`));

  socket.on("data", (message) => {
    let text = message.toString().trim();

    if (!text) {
      return;
    }

    if (username === null) {
      if (clients.has(text)) {
        socket.write(
          serverMSG(`username ${text} already exists, try again!!! \n`),
        );
        return;
      }
      clients.set(text, socket);
      username = text;

      socket.write(`Welcome user ${username}\n`);
      broadcast(socket, `${username} joined the chat`);
      return;
    }
    const command = text.split(" ");

    if (text.startsWith("/dm")) {
      if (command.length < 3) {
        socket.write(
          serverMSG("Invalid format. Use: /dm <username> <message>\n"),
        );
        return;
      }

      const recepier = command[1];

      const messageText = command.slice(2).join(" ");

      const recepierSocket = clients.get(recepier);

      if (!recepierSocket) {
        socket.write(serverMSG(`user "${recepier}" does not exist.\n`));
        return;
      }

      recepierSocket.write(privateMSG(username, messageText));
      return;
    }

    broadcast(socket, `${username}: ${text}\n`);
  });

  socket.on("close", () => {
    clients.delete(username);

    broadcast(socket, `${username} left the chat\n`);
  });

  socket.on("error", (err) => {
    console.error(err.message);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`The server running on ${HOST}:${PORT}\n`);
});
