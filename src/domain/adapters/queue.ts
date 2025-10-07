export abstract class QueueAdapter {
  abstract addJob(jobName: string, object: object): Promise<void>;
}
