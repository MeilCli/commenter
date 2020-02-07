import * as core from "@actions/core";
import { getInputStringArray } from "./input";
import * as github from "@actions/github";

interface Option {
    triggerRegex: string;
    assignLabels: string[] | null;
    assignReviewers: string[] | null;
}

function getOption(): Option {
    return {
        triggerRegex: core.getInput("trigger_regex", { required: true }),
        assignLabels: getInputStringArray("assign_labels", false),
        assignReviewers: getInputStringArray("assign_reviewers", false)
    };
}

async function run() {
    try {
        // const option = getOption();
        core.info("commenter");
        core.info(github.context.eventName);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
