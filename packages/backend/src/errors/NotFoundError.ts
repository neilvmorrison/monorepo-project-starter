export class NotFoundError extends Error {
  constructor(message: string = "Resource not found") {
    super(message);
    this.name = "NotFoundError";
    this.status = 404;
  }

  status: number;
}
