export default class CustomException extends Error {
    errors: Array<{ error: string; message: string }>;
    status: number;
  
    constructor(errors: Array<{ error: string; message: string }>, status: number) {
      super('Validation failed');
      this.errors = errors;
      this.status = status;
      this.message = JSON.stringify(errors);
  
    }
  
    toResponseObject() {
      return {
        errors: this.errors.map(({ error, message }) => ({ error, message })),
      };
  
  }
}