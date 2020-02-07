"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@actions/core"));
function getInputStringArray(name, required) {
    if (required === void 0) { required = false; }
    var result = core
        .getInput(name, { required: required })
        .split(",")
        .map(function (x) { return x.trim(); });
    if (result.length == 0 || (result.length == 1 && result[0].length == 0)) {
        result = null;
    }
    return result;
}
exports.getInputStringArray = getInputStringArray;
