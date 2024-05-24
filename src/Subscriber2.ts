import { globalStock } from "./PubSub";
import { Subscribers } from "./PubSub";

let subscriber: Subscribers = {
  id: "1ex1311",
  name: "Sub1",
};

globalStock.subscribe(subscriber);

setTimeout(() => {
  globalStock.unsubscribe("1ex1311");
}, 12000);
