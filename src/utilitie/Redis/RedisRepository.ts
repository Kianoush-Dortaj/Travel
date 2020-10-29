import redis from "redis";

export class RedisManager {
  client = redis.createClient(6379, "127.0.0.1");

  Set(key, value) {
    try {
      return new Promise((resolve, reject) => {
        this.client.set(key.toString(), JSON.stringify(value), async (err, data) => {
          if (err) reject(err);
          resolve(data);
        });
      });
    } catch (error) { }
  }

  Get(key) {
    try {
      return new Promise((resolve, reject) => {
        this.client.get(key.toString(), async (err, data) => {
          if (err) reject(err);
          resolve(JSON.parse(data));
        });
      });
    } catch (error) { }
  }

  Remove(key) {
    this.client.del(key);
  }

  ResetSingleItem(key, value) {
    this.client.del(key, (err, data) => {
      this.Set(key, value);
    });
  }

  Connet() {
    this.client.on("connect", function () {
      console.log("Redis client connected");
    });
  }
}

export default new RedisManager();
