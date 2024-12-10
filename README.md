### Requirements
- node@22.12.0
- pnpm@9.14.4
- docker / docker-desktop

### Initialize
- `cd docker; docker-compose up -d`
- `docker exec -it postgresql psql -U test -c 'CREATE DATABASE countries;'`

### Build
- `pnpm i`
- `pnpm build`

## Usage

### Fetcher
#### CLI
- `cd packages/data-fetcher`
- as CLI
  - `pnpm link .`
  - `pnpm exec fetcher`
- or 
  - `pnpm start:cli`

#### as a Service with RestAPI
- `pnpm start`

Rest API will listen on localhost:3000
- GET http://localhost:3000?page=<0,1,2,...>&pageCount=<1,...,20,...>

### RestAPI server with fetcher microservice 
- `pnpm start:micro` start fetcher as a microservice
- `pnpm start:api` start API -> connect to microservice

Rest API will listen on localhost:3001
- GET http://localhost:3001?page=<0,1,2,...>&pageCount=<1,...,20,...>

### AWS Lambda
- `cd packages/data-fetcher`
- `pnpm build`
- `pnpm start` or `node dist/data-fetcher/src/rest.main.js` <- start data-fetcher as a RestAPI service

```typescript
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
const url = 'https://your.server.com:xxxx/fetch';
export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        // fetch is available with Node.js 18
        const res = await fetch(url);
        return {
            statusCode: res.status,
            body: JSON.stringify({
                message: await res.text(),
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'some error happened',
            }),
        };
    }
};
```

# TODO
### 1) SWAGGER
- for API
- for Fetcher
### 2) Route aliases for better imports
### 3) Authentication
 - Fetch for admins ony

```typescript
import { UseGuards } from '@nestjs/common';

@UseGuards(AuthGuard)
async fetch ...
```