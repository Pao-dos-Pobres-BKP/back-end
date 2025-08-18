import { createId } from "@paralleldrive/cuid2";
export class BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id?: string, createdAt?: Date, updatedAt?: Date) {
    this.id = id ?? createId();
    this.createdAt = createdAt ?? new Date();
    this.updatedAt = updatedAt ?? new Date();
  }

  setUpdatedAt(): void {
    this.updatedAt = new Date();
  }
  setCreatedAt(): void {
    this.createdAt = new Date();
  }
  setId(id: string): void {
    this.id = id;
  }
  getId(): string {
    return this.id;
  }
  getCreatedAt(): Date {
    return this.createdAt;
  }
  getUpdatedAt(): Date {
    return this.updatedAt;
  }
}
