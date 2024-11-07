export class Result<V, E> {
  public isSuccess: boolean;
  public isFailure: boolean;
  private error: E | null; 
  private value: V | null;

  private constructor(isSuccess: boolean, value: V | null, error: E | null) {
      this.isSuccess = isSuccess;
      this.isFailure = !isSuccess;
      this.value = value; 
      this.error = error; 
  }

    public static ok<V, E>(value: V): Result<V, E> {
        return new Result<V, E>(true, value, null);
        
    }

    public static fail<V, E>(error: E): Result<V, E> {
      return new Result<V, E>(false, null, error);
  }

    public getError(): E {
      if (this.isSuccess) {
          throw new Error('Successful result does not contain an error');
      }

      return this.error as E; 
  }

  public getValue(): V {
      if (this.isFailure) {
          throw new Error('Unsuccessful result does not contain a value');
      }

      return this.value as V; 
  }
}


  type RepoErrorCode = 404 | 500;
  
  export class RepoError extends Error {
    public code: RepoErrorCode;
    constructor(message: string, code: RepoErrorCode) {
      super(message);
      this.code = code;
    }
  }
  
  export type RepoResult<M> = Promise<Result<M, RepoError>>;
