import { QueueAdapter } from "@domain/adapters/queue";
import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";

@Injectable()
export class QueueIntegration implements QueueAdapter {
  private readonly attempts: number = Number(process.env.QUEUE_ATTEMPTS) || 5;
  private readonly delayBetweenAttempts: number =
    Number(process.env.QUEUE_DELAY_BETWEEN_ATTEMPTS) || 10_000;

  constructor(@InjectQueue("email") private readonly queue: Queue) {}

  async addJob(jobName: string, object: object): Promise<void> {
    await this.queue.add(jobName, object, {
      attempts: this.attempts,
      backoff: { type: "exponential", delay: this.delayBetweenAttempts }
    });
  }
}
