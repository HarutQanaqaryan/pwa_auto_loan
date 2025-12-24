# Mock server

The mock server allows you to conduct local frontend development independently of the backend.

The mock server is implemented using the connect-api-mocker library.

Essentially, the Mock server intercepts requests to the server, returning the corresponding data.

## Starting the Mock server

- set the value of the environment variable `MOCK_SERVER=true`
- in the config.js file set the value `baseUrl=undefined`
- run the command: `yarn mock-server`

## Setting up endpoints

The list of locked endpoints is located in the `mock-server/settings.json` file in the `urls` field.

The data returned by endpoints is located in the `mock-server/api` folder.

For example, the file `mock-server/api/posts/GET.json` contains data for the posts GET request.

In addition to static data, it is possible to implement more complex processing of a request, taking into account its parameters and changing the returned result and status. More details can be found in the [official documentation](https://www.npmjs.com/package/connect-api-mocker).
