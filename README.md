# commenter
auto set PR reviewers & labels by PR comment
```yaml
name: PullReqeust Comment bot

on:
  issue_comment:
    types: [created]

jobs:
  check_comment:
    runs-on: ubuntu-latest
    steps:
      - uses: MeilCli/commenter@master
        with: 
          github_token: ${{ secrets.GITHUB_TOKEN }}
          trigger_regex: レビュー開始
          assign_reviewers: MeilCli,MeilCli-bot
          assign_labels: documentation
```

## input
- `github_token`
  - required
- `trigger_regex`
  - required
- `assign_reviewers`
  - optional
- `assign_labels`
  - optional
  
## Author
[@MeilCli](https://github.com/MeilCli)

## License
MIT

### Using libraries
- [actions/toolkit](https://github.com/actions/toolkit), published by [MIT License](https://github.com/actions/toolkit/blob/master/LICENSE.md)
- [octokit/rest.js](https://github.com/octokit/rest.js), published by [MIT License](https://github.com/octokit/rest.js/blob/master/LICENSE)
