"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatch = void 0;
const tryCatch = async (callback, show) => {
    return (req, res, next) => {
        try {
            callback(req, res, next);
        }
        catch (error) {
            if (show)
                console.error(error);
            next(error);
        }
    };
};
exports.tryCatch = tryCatch;
