<h1 align="center">
  <a href="https://pairhub.io"><img src="https://pairhub.io/static/pairhub-logo-white-180.png" alt="Markdownify" width="110"></a>
  <br>
  PairHub
  <br>
</h1>

[PairHub](https://pairhub.io) is a platform/community to help you find remote pair programming partners. 

### Vision/idea
Make remote pair programming more accessible!

### Features
- posting board (`"I'd like to pair on.."`)
  - ability to [tag with GitHub repositories](https://pairhub.io/pairhub/pairhub)
- [profile pages](https://pairhub.io/@gustavlrsn) with posts

# Contributing
Contributions of all forms are very welcome! 

## Tech stack
The project consists of two parts:
- `/api`: a GraphQL API built with Node.js, Express, MongoDB and Apollo Server.
- `/ui`: a front-end application built with React and Next.js.

## Run locally
### Prerequisites
1. [Install and run](https://docs.mongodb.com/manual/administration/install-community/) MongoDB.
2. [Register](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/) a GitHub OAuth app (for authentication) with Homepage URL: `http://localhost:3000` and Authorization callback URL: `http://localhost:3000/login/github/callback`
3. Add a `/api/.env` file with the client ID and client secret keys from the OAuth app you created (`SESSION_SECRET` can be anything):
```
GITHUB_CLIENT_ID="your github client ID here"
GITHUB_CLIENT_SECRET="your github client secret here"
SESSION_SECRET="anything"
```
### Running the project
1. Go to `/api` and run `npm install` and then `npm run dev` to start the API
2. Go to `/ui` and run `npm install` and then `npm run dev` to start the front end
