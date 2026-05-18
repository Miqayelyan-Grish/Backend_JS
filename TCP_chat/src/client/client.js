import net from "node:net";

const client = net.createConnection({ port: 3001, host: "localhost" }, () => {
  console.log("you are connected");
});

client.on("data", (message) => {
  console.log(message.toString());
});

client.on("close", () => {
  console.log("disconnected");
  process.exit();
});

client.on("error", (err) => {
  console.error("Connection error:", err.message);
});

process.stdin.on("data", (message) => {
  if (message.toString().trim() == "exit") {
    client.end();
    return;
  }

  client.write(message);
});
