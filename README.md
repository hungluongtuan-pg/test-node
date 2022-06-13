# blog-service
# Serverless Nodejs Rest API with TypeScript And DynamoDb

This is simple REST API example for AWS Lambda By Serverless framework with TypeScript and DynamoDb.

## Use Cases

* Serverless Framework - Lamda

* CRUD

* Store data in `DynamoDB`

* CI/CD and support multi-stage deployments on `serverless ci/cd`

## Project structure

```
.src
.
├── controller.ts // process logic
├── services
│   └── blogService.ts // process with database
└── tranformer
    └── response.ts // prosess with api response
```
## Deploy

* Run ```npm install``` to install all the necessary dependencies.
* Run ```npm run local``` use serverless offline for locally environment.
* Run ```npm run deploy``` Deploy on AWS.

## List enpoint

```
  POST - https://f0sxvdg209.execute-api.ap-southeast-1.amazonaws.com/blog
  GET - https://f0sxvdg209.execute-api.ap-southeast-1.amazonaws.com/blog
  GET - https://f0sxvdg209.execute-api.ap-southeast-1.amazonaws.com/blog/{id}
  PUT - https://f0sxvdg209.execute-api.ap-southeast-1.amazonaws.com/blog/{id}
  DELETE - https://f0sxvdg209.execute-api.ap-southeast-1.amazonaws.com/blog/{id}
```

## CI/CD & multi-stage deployments

* Created 2 environments: `dev` and `prod`
  ![alt text](https://github.com/phuthuyxamPg/blog/blob/main/images/app-cicd.png?raw=true)

* Auto deploy When push to `dev` or `prod` branch:
  ![alt text](https://github.com/phuthuyxamPg/blog/blob/main/images/log-build.png?raw=true)

