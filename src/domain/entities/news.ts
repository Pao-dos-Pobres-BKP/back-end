export class News {
  constructor(
    public readonly id: string,
    public title: string,
    public description: string,
    public date: Date | null,
    public location: string | null,
    public url: string | null,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {}
}
