export class ResponseDto {
    status: string;
    message: string;
    data?: {
        username: string,
        token: string,
    };
  }