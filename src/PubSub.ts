import { createClient, RedisClientType } from "redis";

interface CompanyStock {
  id: string;
  name: string;
  country: string;
  value: number;
}

interface Subscribers {
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
    this.client.connect();
  }

  public static getInstance(): GlobalStock {
    if (!GlobalStock.instance) {
      GlobalStock.instance = new GlobalStock();
    }

    return GlobalStock.instance;
  }

  public subscribe(subscriber: Subscribers) {
    this.subscribers.push(subscriber);
  }

  public unsubscribe(subscriberId: string) {
    this.subscribers = this.subscribers.filter(
      (subscriber) => subscriber.id !== subscriberId
    );
  }

  public async checkRedis() {}
}

const globalStock = GlobalStock.getInstance();