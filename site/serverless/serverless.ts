import type { Serverless } from "serverless/aws";

const serverlessConfiguration: Serverless = {
  service: {
    name: "petri-works",
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  configValidationMode: "error",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
    "serverless-offline": {
      httpPort: 4000,
    },
    dynamodb: {
      stages: "v1",
      start: {
        port: 8000,
        migrate: false,
      },
    },
  },
  plugins: [
    "serverless-webpack",
    "serverless-dynamodb-local",
    "serverless-offline",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs12.x",
    region: "us-east-1",
    stage: "v1",
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
  },
  functions: {
    subscribePost: {
      handler: "lambdas/subscribePost.handler",
      events: [
        {
          http: {
            method: "post",
            path: "subscribe",
            cors: true,
          },
        },
      ],
    },
    hello: {
      handler: "lambdas/helloworld.handler",
      events: [
        {
          http: {
            method: "get",
            path: "hello",
            cors: true,
          },
        },
      ],
    },
    test: {
      handler: "lambdas/testailua.handler",
      events: [
        {
          http: {
            method: "get",
            path: "hello/test",
            cors: true,
          },
        },
      ],
    },
  },
  resources: {
    Resources: {
      subscriptionsTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "subscriptions",
          AttributeDefinitions: [
            {
              AttributeName: "email",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "email",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacity: 5,
            WriteCapacity: 5,
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
