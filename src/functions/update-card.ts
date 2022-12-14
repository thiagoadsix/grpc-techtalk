import { client } from "../client";
import { CardI } from "../types/card";
import { sleepFor } from "../utils/sleep";

const call = client.update();

const updateFirsCard = () => {
  const card: CardI = { id: "1", companyId: "1", name: "Tools", category: "Purple" };
  console.log("Updating card for the first time...", card);
  call.write(card);

  sleepFor(2500);
};

updateFirsCard();

call.on("data", (data: any) => {
  console.log("Card updated", data);

  const card: CardI = { id: "1", companyId: "1", name: "Tools", category: "Brown" };
  console.log("Updating card for the second time...", card);
  call.write(card);

  sleepFor(2500);
  console.log("Card updated", data);
});

call.on("end", () => {
  sleepFor(2500);
  console.log("\nTask ended on client.");
});
