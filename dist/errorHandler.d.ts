import { Response, Request, NextFunction } from "express";
type CustomRules = {
    match: any;
    statusCode: number;
    message: string;
};
type ErrorConfig = {
    customRules: CustomRules[];
    defaultMessage?: string;
};
export declare const errorHandler: (config: ErrorConfig) => (err: Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export {};
//# sourceMappingURL=errorHandler.d.ts.map