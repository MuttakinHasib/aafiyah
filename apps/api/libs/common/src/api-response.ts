import moment from 'moment';
import { ResponseType } from '@app/types';
import { HttpStatus } from '@nestjs/common/enums';

type Source = 'success' | 'error';

export class ApiResponse<TData> {
  public readonly code: number;

  public readonly message: string;

  public readonly timestamp: string;

  public readonly data: TData | null;

  private constructor(code: number, message: string, data?: TData) {
    this.code = code;
    this.message = message;
    this.data = data || null;
    this.timestamp = moment().format('LLLL');
  }

  public static response<TData>(
    response: ResponseType<TData>,
    type: Source,
  ): ApiResponse<TData> {
    let resultCode: number;
    let resultMessage: string;

    if (type === 'success') {
      resultCode = response.code || HttpStatus.OK;
      resultMessage = response.message || 'Success.';
    } else {
      resultCode = response.code || HttpStatus.INTERNAL_SERVER_ERROR;
      resultMessage = response.message || 'Internal server error.';
    }

    return new ApiResponse(resultCode, resultMessage, response.data);
  }

  public static success<TData>(
    response: ResponseType<TData>,
  ): ApiResponse<TData> {
    return this.response(response, 'success');
  }

  public static error<TData>(
    response: ResponseType<TData>,
  ): ApiResponse<TData> {
    return this.response(response, 'error');
  }
}
