import {
  Server,
  loadPackageDefinition,
  ServerCredentials,
} from "@grpc/grpc-js";
import { loadSync } from "@grpc/proto-loader";
import { join } from "path";
import { CardI } from "./types/card";
import { sleepAsync, sleepFor } from "./utils/sleep";

const packageDefinition = loadSync(join(__dirname, "../src/protos/card.proto"));
const proto = loadPackageDefinition(packageDefinition) as any;

const cards: CardI[] = [
  {
    id: "1",
    companyId: "1",
    name: "Energy",
    category: "Red",
  },
  {
    id: "2",
    companyId: "2",
    name: "Food",
    category: "Blue",
  },
  {
    id: "3",
    companyId: "2",
    name: "Technology",
    category: "Pink",
  },
];

let card: CardI;

const server = new Server();

async function list(call: any) {
  console.log("Client calling LIST from the server...");

  for (const card of cards) {
    call.write(card);
    await sleepAsync(2500);
  }

  console.log("Call ended on server. \n");
  call.end();
}

function add({ request }: any, callback: any) {
  console.log("Client calling ADD from the server...");
  cards.push(request);
  callback(null, {});
}

function remove(call: any, callback: any) {
  console.log("Client calling REMOVE from the server...");

  call.on("data", (data: any) => {
    console.log("server -> removing card: ", JSON.stringify(data));
    sleepFor(2500);

    cards.splice(
      cards.findIndex((card) => card.id === data.id),
      1
    );

    console.log("server -> quantity cards: ", JSON.stringify(cards.length));
  });

  call.on("end", () => callback(null, { removed: true }));
}

function update(call: any) {
  console.log("Client calling UPDATE from the server...");

  call.on("data", (data: any) => {
    console.log("Updating card...", JSON.stringify(data));

    const cardIndex = cards.findIndex((card) => card.id === data.id);
    card = Object.assign({}, cards[cardIndex], { ...data });
    cards[cardIndex] = card;

    console.log(JSON.stringify(card));
  });

  call.write({ status: "UPDATED" });
  sleepFor(2500);

  call.end();
}

server.addService(proto.CardService.service, {
  list,
  add,
  remove,
  update,
});

server.bindAsync("127.0.0.1:50051", ServerCredentials.createInsecure(), () => {
  server.start();
  console.log("Server running at http://127.0.0.1:50051 \n");
});
