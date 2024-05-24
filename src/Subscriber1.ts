import { globalStock } from "./PubSub";
import { Subscribers } from "./PubSub";

let subscriber: Subscribers = {
  id: "1ex1231",
  name: "Sub1",
};

globalStock.subscribe(subscriber);
