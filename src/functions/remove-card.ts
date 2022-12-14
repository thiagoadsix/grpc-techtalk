import { client } from "../client";

const ids: number[] = [1, 3];

let call = client.remove((err: any, response: any) => {
  if (err) throw err;
  console.log("client -> response", JSON.stringify(response));
});

async function sendIds(ids: number[]) {
  for (const id of ids) {
    console.log("Sending id...", { id });
    call.write({ id });
  }

  call.end();
}

sendIds(ids);
