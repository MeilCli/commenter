import * as core from "@actions/core";

export function getInputStringArray(name: string, required = false): string[] | null {
    let result: string[] | null = core
        .getInput(name, { required: required })
        .split(",")
        .map(x => x.trim());
    if (result.length == 0 || (result.length == 1 && result[0].length == 0)) {
        result = null;
    }
    return result;
}
