
export interface IDomainException {
  statusCode: Number;
  message: String[];
  error: String;
};

export class DomainError extends Error {

  private status: Number;

  constructor(message='Domain Error', status=406) {
    super(message);
    this.status = status;
  }

  getStatus() {
    return this.status;
  }

  getResponse(): IDomainException {
    return {
      statusCode: this.status,
      message: [ this.message ],
      error: 'Domain Error'
    };
  }

}
