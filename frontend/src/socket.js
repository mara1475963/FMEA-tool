import io from "socket.io-client";
const ENDPOINT = "http://localhost:3001";

export const mainSocket = io(ENDPOINT);
