import { DeleteFileResponse } from "@application/dtos/s3storage/delete";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3IntegrationHelper } from "@infra/integrations/s3";

export class DeleteFileUseCase {
  constructor(
    private readonly s3: S3Client,
    private readonly s3Helper: S3IntegrationHelper
  ) {}

  async execute(key: string): Promise<DeleteFileResponse> {
    await this.s3.send(
      new DeleteObjectCommand({ Bucket: this.s3Helper.bucket(), Key: key })
    );
    return { deleted: true };
  }
}
