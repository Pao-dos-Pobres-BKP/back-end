import { TransactionAdapter } from "@domain/adapters/transaction";

export class TransactionServiceStub implements TransactionAdapter {
  transaction<R>(): Promise<R> {
    return;
  }
}
