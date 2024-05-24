import { createClient, RedisClientType } from "redis";

interface CompanyStock {
  id: string;
  name: string;
  country: string;
  value: number;
}

export interface Subscribers {
  id: string;
  name: string;
}

export class GlobalStock {
  private stocks: CompanyStock[] = [];
  private client: RedisClientType;
  private subscribers: Subscribers[] = [];

  private static instance = new GlobalStock();

  private constructor() {
    this.stocks = [];
    this.client = createClient();
    this.client.connect().catch(console.error);
  }

  public static getInstance(): GlobalStock {
    if (!GlobalStock.instance) {
      GlobalStock.instance = new GlobalStock();
    }

    return GlobalStock.instance;
  }

  public async subscribe(subscriber: Subscribers) {
    let is_Subscribed = this.subscribers.some((e) => e.id === subscriber.id);

    if (!is_Subscribed) {
      this.subscribers.push(subscriber);
    }

    await this.client.subscribe("appleStock", (message) => {
      console.log(message);
    });

    console.log(this.subscribers);
  }

  public async unsubscribe(subscriberId: string) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber.id !== subscriberId
    );
    await this.client.unsubscribe("appleStock");

    console.log(this.subscribers);
  }

  public async publishAppleStock(value: number) {
    await this.client.publish("appleStock", `${value}`);
  }
}

export const globalStock = GlobalStock.getInstance();
