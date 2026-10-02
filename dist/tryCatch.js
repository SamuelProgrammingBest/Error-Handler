"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatch = void 0;
const tryCatch = (callback, show) => {
    return (req, res, next) => {
        callback(req, res, next).catch((err) => next(err));
    };
};
exports.tryCatch = tryCatch;
