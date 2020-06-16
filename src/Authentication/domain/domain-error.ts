
export class DomainError extends Error {

  private status: number;

  constructor(message='Domain Error', status=406) {
    super(message);
    this.status = status;
  }

  getStatus() {
    return this.status;
  }

}
