

class AppError extends Error {
  statusCode: any;
  constructor(args:any) {
    super(args.message);
    this.statusCode = args.statusCode
  }
}

export default AppError;
