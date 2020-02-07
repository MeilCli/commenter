import * as core from "@actions/core";
import { getInputStringArray } from "./input";
import * as github from "@actions/github";
import * as webhooks from "@octokit/webhooks";
import * as octokit from "@octokit/rest";

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
        core.info("start action commenter");
        if (github.context.eventName != "issue_comment") {
            core.info("not issue comment");
            return;
        }
        const option = getOption();
        const payload = github.context.payload as webhooks.WebhookPayloadIssueComment;
        if ("pull_request" in payload.issue == false) {
            core.info("not pull request comment");
            return;
        }
        core.info("do");
        if (payload.comment.body.match(option.triggerRegex) == null) {
            core.info(`not match \n${payload.comment.body}\n\n${option.triggerRegex}`);
            return;
        }
        core.info(`token length: ${process.env.GITHUB_TOKEN?.length}`);
        const rest = new octokit.Octokit({ auth: `token ${process.env.GITHUB_TOKEN}` });
        if (option.assignReviewers != null) {
            rest.pulls.createReviewRequest({
                owner: payload.repository.owner.login,
                repo: payload.repository.name,
                number: payload.issue.number,
                reviewers: option.assignReviewers
            });
        }
        if (option.assignLabels != null) {
            rest.issues.addLabels({
                owner: payload.repository.owner.login,
                repo: payload.repository.name,
                number: payload.issue.number,
                labels: option.assignLabels
            });
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
