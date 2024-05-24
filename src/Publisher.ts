import { globalStock } from "./PubSub";

let i = 1299;

setInterval(() => {
  globalStock.publishAppleStock(i);
  i += 12;
}, 2000);
