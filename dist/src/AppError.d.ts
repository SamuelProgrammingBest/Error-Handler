declare class AppError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    timestamp: string;
    constructor(message: string, statusCode: number);
}
export default AppError;
//# sourceMappingURL=AppError.d.ts.map