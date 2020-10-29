import { Response } from 'express';

// Helper code for the API consumer to understand the error and handle is accordingly
enum StatusCode {
  SUCCESS = '10000',
  FAILURE = '10001',
  RETRY = '10002',
  INVALID_ACCESS_TOKEN = '10003',
}

export interface Data {
  data: any;
  count: number;
}

enum ResponseStatus {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

abstract class ApiResponse {
  constructor(
    protected status: ResponseStatus,
    protected message: string,
    protected success: boolean,
    protected result?: Data
  ) { }

  protected prepare<T extends ApiResponse>(res: Response, response: T): Response {
    return res.status(this.status).json(ApiResponse.sanitize(response));
  }

  public send(res: Response): Response {
    return this.prepare<ApiResponse>(res, this);
  }

  private static sanitize<T extends ApiResponse>(response: T): T {
    const clone: T = {} as T;
    Object.assign(clone, response);
    // delete {some_field};
    delete clone.status;
    for (const i in clone) if (typeof clone[i] === 'undefined') delete clone[i];
    return clone;
  }
}

export class AuthFailureResponse extends ApiResponse {
  constructor(message = 'Authentication Failure') {
    super(ResponseStatus.UNAUTHORIZED, message, false);
  }
}

export class NotFoundResponse extends ApiResponse {
  private url: string;

  constructor(message = 'Not Found') {
    super(ResponseStatus.NOT_FOUND, message, true);
  }

  send(res: Response): Response {
    this.url = res.req.originalUrl;
    return super.prepare<NotFoundResponse>(res, this);
  }
}

export class ForbiddenResponse extends ApiResponse {
  constructor(message = 'Forbidden') {
    super(ResponseStatus.FORBIDDEN, message, false);
  }
}

export class BadRequestResponse extends ApiResponse {
  constructor(message = 'Bad Parameters') {
    super(ResponseStatus.BAD_REQUEST, message, false);
  }
}

export class InternalErrorResponse extends ApiResponse {
  constructor(message = 'Internal Error') {
    super(ResponseStatus.INTERNAL_ERROR, message, false);
  }
}

export class SuccessMsgResponse extends ApiResponse {
  constructor(message="ُSuccess Operation") {
    super(ResponseStatus.SUCCESS, message, true);
  }
}


export class FailureMsgResponse extends ApiResponse {
  constructor(message: string) {
    super(ResponseStatus.SUCCESS, message, false);
  }
}

export class SuccessResponse extends ApiResponse {
  constructor(result: Data, message = "Success Oepration") {
    super(ResponseStatus.SUCCESS, message, true, result);

  }

  send(res: Response): Response {
    return super.prepare<SuccessResponse>(res, this);
  }
}

export class AccessTokenErrorResponse extends ApiResponse {
  private instruction = 'refresh_token';

  constructor(message = 'Access token invalid') {
    super(ResponseStatus.UNAUTHORIZED, message, false);
  }

}

export class TokenRefreshResponse extends ApiResponse {
  constructor(message: string, private accessToken: string, private refreshToken: string) {
    super(ResponseStatus.SUCCESS, message, false);
  }

  send(res: Response): Response {
    return super.prepare<TokenRefreshResponse>(res, this);
  }
}
