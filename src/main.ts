import * as core from "@actions/core";
import { getInputStringArray } from "./input";
import * as github from "@actions/github";
import * as webhooks from "@octokit/webhooks";
import * as octokit from "@octokit/rest";

interface Option {
    githubToken: string;
    triggerRegex: string;
    assignLabels: string[] | null;
    assignReviewers: string[] | null;
}

function getOption(): Option {
    return {
        githubToken: core.getInput("github_token", { required: true }),
        triggerRegex: core.getInput("trigger_regex", { required: true }),
        assignLabels: getInputStringArray("assign_labels", false),
        assignReviewers: getInputStringArray("assign_reviewers", false)
    };
}

async function run() {
    try {
        if (github.context.eventName != "issue_comment") {
            return;
        }
        const option = getOption();
        const payload = github.context.payload as webhooks.WebhookPayloadIssueComment;
        if ("pull_request" in payload.issue == false) {
            return;
        }
        if (payload.comment.body.match(option.triggerRegex) == null) {
            return;
        }

        const rest = new octokit.Octokit({ auth: `token ${option.githubToken}` });
        if (option.assignReviewers != null) {
            rest.pulls.createReviewRequest({
                owner: payload.repository.owner.login,
                repo: payload.repository.name,
                // eslint-disable-next-line @typescript-eslint/camelcase
                pull_number: payload.issue.number,
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
