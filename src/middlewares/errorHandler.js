import { HttpError } from 'http-errors';

export default function (err, req, res, next) {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err.message,
    });
    return;
  }

  const { status = 500, message = 'Something went wrong' } = err;

  res.status(status).json({
    status: status,
    message: err.name,
    data: message,
  });
}
