import { Injectable } from "@nestjs/common";
import * as path from "node:path";
import mime from "mime";
import { randomUUID } from "node:crypto";

@Injectable()
export class S3IntegrationHelper {
  public bucket(): string {
    return process.env.S3_BUCKET!;
  }

  public prefix(): string {
    return process.env.S3_PREFIX ?? "";
  }

  public publicUrl(key: string): string {
    return `${process.env.S3_URL}/${key}`;
  }

  private resolveExt(originalName: string, contentType?: string): string {
    const byMime = contentType ? mime.getExtension(contentType) : null;
    if (byMime) return `.${byMime}`;

    const byName = mime.getType(originalName);
    if (byName) {
      const e = mime.getExtension(byName);
      if (e) return `.${e}`;
    }

    const ext = path.extname(originalName);
    return ext || ".bin";
  }

  public buildKey(originalName: string, contentType?: string): string {
    const ext = this.resolveExt(originalName, contentType);
    return `${this.prefix()}${randomUUID()}${ext}`;
  }
}
