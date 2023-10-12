"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatchBlock = void 0;
function CatchBlock(error, res) {
    console.log(`[error]: ${error.message}`);
    res.status(500).json({ errors: error.message });
}
exports.CatchBlock = CatchBlock;
