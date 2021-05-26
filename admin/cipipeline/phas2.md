# Status on the pipeline
## What is currently functional?
Currently, we have successfully implemented the base functionalities of our CI/CD pipeline. This is where we are in terms of completion:

- [x] Linting and code style enforcement (may happen in pipeline and/or in editor)
- [x] Code quality via tool  (ex. Codeclimate, Codacy, etc.)
- [X] Code quality via human review (ex. Pull Requests)
- [X] We plan to make our pipeline more robust by adding Unit Tests 
- [X] We need to integrate our code quality tool Codacy with our Github workflow.
- [ ] Unit tests via automation (ex. Jest, Tape, Ava, Cypress, Mocha/Chai, etc.)*
- [ ] Documentation generation via automation (ex. JSDocs)

## Phase 2 Highlights

* implemented linting for CSS, HMTL
* implemented linting for specific directory source
* wrote basic unit tests

All the tests were written in the "Unit Test" branch until the rest of the integration is ready and are stored in a top level directory `__tests__`

## What's happening

Our workflow has 3 jobs: build, test, and Lint Code Base. As of right now, the build job does a simple npm install and npm build:
```bash
npm install
npm run build --if-present
```

The test job is set as dependable on build job and therefore waits for this one to complete before executing the following commands:
```bash
npm install
npm test
```

The Lint Code Base job is set to run in parallel. This one is a github repo called [Super Linter](https://github.com/github/super-linter)that is able to run a linter on every programmming language available in our repo. 

Our current diagram looks like this:
![pipeline-diagram](phase1.drawio.png)

![phase1-diagram](phase1.png)

Additionally, we chose to setup our repo with a code quality tool, [Codacy](https://app.codacy.com/organizations/gh/cse110-sp21-group32/repositories).

## What is planned/in progress?


- We still have some points to discuss with our stakeholders about pipeline design 
