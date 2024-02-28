import { Schema, ValidationErrorItem } from "joi";

export class ValidationException extends Error {
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

export class Validator {
  static validate<T>(data: T, schema: Schema<T>): T {
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      const errors: Array<{ error: string; message: string }> = [];

      error.details.forEach((detail: ValidationErrorItem) => {
        if (detail.context && detail.context.key) {
          const key = detail.context.key;
          errors.push({ error: key, message: detail.message });
        }
      });
      throw new ValidationException(errors, 422);

    }

    return data;
  }
}