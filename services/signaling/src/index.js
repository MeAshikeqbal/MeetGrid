import { WebSocketServer } from "ws";

const PORT = process.env.PORT || 8080;

const wss = new WebSocketServer({ port: PORT });

console.log(`🚀 Signaling server running on ws://localhost:${PORT}`);

let clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  console.log("Client connected. Total:", clients.size);

  ws.on("message", (message) => {
    const data = JSON.parse(message.toString());

    // Broadcast all WebRTC signaling messages to OTHER peers
    clients.forEach((client) => {
      if (client !== ws && client.readyState === client.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Client disconnected");
  });
});
