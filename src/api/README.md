# Masked Emails API

This API hosts a serverless Azure Function App that powers the "Masked Emails" api.
When run locally, this project is hosted on port 5001.

## Prerequisites

The WebAPI stores its data into a CosmosDb database.
You can use the [CosmosDb Emulator](https://docs.microsoft.com/en-us/azure/cosmos-db/local-emulator) to debug locally.

The WebAPI also sends commands to the mail server using an Azure Storage Account queue. You can use [Azurite Local Storage Emulator](https://docs.microsoft.com/en-us/azure/storage/common/storage-use-azurite) to debug locally.

The WebAPI is also client to a secondary *inbox* API for which it needs to retrieve a JWT token for authentication. You will need to have a valid
set of credentials that allow authentication to this API. Please, refer to [the documentation](https://github.com/springcomp/masked-emails-inboxapi#configuration) of the *masked-emails-inboxapi* server.

## Initializing

This project makes use of some configuration parameters. Most of which can be stored using the ASP.Net Secrets Manager:

- `TableStorage:ConnectionString`: connection string to an Azure Storage Account.

- `AppSettings:DomainName`: Top-level domain name for generated email addresses.
- `AppSettings:PasswordLength`: Length of auto-generated passwords.

- `CosmosDb:EndpointUri`: URI to the CosmosDb service.
- `CosmosDb:PrimaryKey`: primary key to the CosmosDb service.
- `CosmosDb:IgnoreSslServerCertificateValidation`: set to `true` to ignore certificate validation, useful when running the CosmosDb emulator from a Docker container, for instance. Defaults to `false`.

- `InboxApi:Endpoint`: URI to the inbox API to retrieve mailbox items.
- `InboxApi:ClientId`: client credentials identifier to the inbox API.
- `InboxApi:ClientSecret`: client secret to request a JWT token for the inbox API.
- `InboxApi:Audience`: client credentials resource grant.
- `InboxApi:IdentityProviderEndpoint`: URI to the identity provider.
- `InboxApi:Authority`: identity provider authority.


The storage account hosts a storage queue names `commands` that is used to communicate with the masked emails backend.

Use the following commands to initialize those configuration parameters:

```sh
> dotnet user-secrets set "TableStorage:ConnectionString" "<connection-string>"
```

The project comes with sample data that you must seed using the following command:

```sh
> cd /src/seed
> dotnet run -- /seed
```

This will create the initial CosmosDb database and container, and insert some sample records.

## Running locally using Visual Studio Code

> **Note**: The Inbox api is currently not supported when running the app locally. By default, HTTP calls are mocked. Please, update the [`environment.ts`](../angular/client/environments/environment.ts) `mocked` property to `false` to test the backend API locally.

First install the [Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/) CLI tool for local development.

You can also take advantage of Visual Studio Code’s [Azure Static Web Apps](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps) extension.

Make sure that the project builds successfully. Then, open the `src/angular/` folder in Visual Studio Code.

```sh
> cd /src/
> dotnet build
> cd /src/angular
> npm install
> npx browserslist --update-db
> ng build
> code .
```

In Visual Studio Code, open a new Terminal window and run the following command to serve the Angular front-end application:

```sh
> ng serve
```

Open yet another Terminal window and run the following command to run the static web app and API:

```sh
> swa start http://localhost:4200 --api-location ../api
```

You can then browse to the static web app at the following address `http://localhost:4280`.
