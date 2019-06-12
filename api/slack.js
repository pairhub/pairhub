import axios from 'axios';

const SLACK_INVITE_ENDPOINT = 'https://slack.com/api/users.admin.invite';

function inviteSuccess() {
  console.log('sent slack invite successfully');
}

function inviteError() {
  console.log('error when sending slack invite');
}

export default function inviteToSlack(email) {
  const QUERY_PARAMS = `email=${encodeURIComponent(email)}&token=${
    process.env.SLACK_TOKEN
  }&set_active=true`;
  axios
    .get(`${SLACK_INVITE_ENDPOINT}?${QUERY_PARAMS}`)
    .then(inviteSuccess)
    .catch(inviteError);
}
