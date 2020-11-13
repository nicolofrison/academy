# netflop

Netflop - JavaScript client for netflop
No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
This SDK is automatically generated by the [OpenAPI Generator](https://openapi-generator.tech) project:

- API version: 1.0
- Package version: 1.0
- Build package: org.openapitools.codegen.languages.JavascriptClientCodegen

## Installation

### For [Node.js](https://nodejs.org/)

#### npm

To publish the library as a [npm](https://www.npmjs.com/), please follow the procedure in ["Publishing npm packages"](https://docs.npmjs.com/getting-started/publishing-npm-packages).

Then install it via:

```shell
npm install netflop --save
```

Finally, you need to build the module:

```shell
npm run build
```

##### Local development

To use the library locally without publishing to a remote npm registry, first install the dependencies by changing into the directory containing `package.json` (and this README). Let's call this `JAVASCRIPT_CLIENT_DIR`. Then run:

```shell
npm install
```

Next, [link](https://docs.npmjs.com/cli/link) it globally in npm with the following, also from `JAVASCRIPT_CLIENT_DIR`:

```shell
npm link
```

To use the link you just defined in your project, switch to the directory you want to use your netflop from, and run:

```shell
npm link /path/to/<JAVASCRIPT_CLIENT_DIR>
```

Finally, you need to build the module:

```shell
npm run build
```

#### git

If the library is hosted at a git repository, e.g.https://github.com/GIT_USER_ID/GIT_REPO_ID
then install it via:

```shell
    npm install GIT_USER_ID/GIT_REPO_ID --save
```

### For browser

The library also works in the browser environment via npm and [browserify](http://browserify.org/). After following
the above steps with Node.js and installing browserify with `npm install -g browserify`,
perform the following (assuming *main.js* is your entry file):

```shell
browserify main.js > bundle.js
```

Then include *bundle.js* in the HTML pages.

### Webpack Configuration

Using Webpack you may encounter the following error: "Module not found: Error:
Cannot resolve module", most certainly you should disable AMD loader. Add/merge
the following section to your webpack config:

```javascript
module: {
  rules: [
    {
      parser: {
        amd: false
      }
    }
  ]
}
```

## Getting Started

Please follow the [installation](#installation) instruction and execute the following JS code:

```javascript
var Netflop = require('netflop');


var api = new Netflop.DefaultApi()
var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
};
api.getEpisodes(callback);

```

## Documentation for API Endpoints

All URIs are relative to *http://localhost:3000*

Class | Method | HTTP request | Description
------------ | ------------- | ------------- | -------------
*Netflop.DefaultApi* | [**getEpisodes**](docs/DefaultApi.md#getEpisodes) | **GET** /episodes | Your GET endpoint
*Netflop.DefaultApi* | [**getFavorites**](docs/DefaultApi.md#getFavorites) | **GET** /favorites | Your GET endpoint
*Netflop.DefaultApi* | [**getLikes**](docs/DefaultApi.md#getLikes) | **GET** /likes | Your GET endpoint
*Netflop.DefaultApi* | [**getMovies**](docs/DefaultApi.md#getMovies) | **GET** /movies | Your GET endpoint
*Netflop.DefaultApi* | [**getReviews**](docs/DefaultApi.md#getReviews) | **GET** /reviews | Your GET endpoint
*Netflop.DefaultApi* | [**getSeries**](docs/DefaultApi.md#getSeries) | **GET** /series | Your GET endpoint
*Netflop.DefaultApi* | [**getVideos**](docs/DefaultApi.md#getVideos) | **GET** /videos | Your GET endpoint
*Netflop.DefaultApi* | [**postFavorites**](docs/DefaultApi.md#postFavorites) | **POST** /favorites | 
*Netflop.DefaultApi* | [**postLogin**](docs/DefaultApi.md#postLogin) | **POST** /login | 
*Netflop.DefaultApi* | [**postRegister**](docs/DefaultApi.md#postRegister) | **POST** /register | 
*Netflop.DefaultApi* | [**postReviews**](docs/DefaultApi.md#postReviews) | **POST** /reviews | 


## Documentation for Models

 - [Netflop.Episodes](docs/Episodes.md)
 - [Netflop.InlineObject](docs/InlineObject.md)
 - [Netflop.InlineObject1](docs/InlineObject1.md)
 - [Netflop.InlineObject2](docs/InlineObject2.md)
 - [Netflop.InlineObject3](docs/InlineObject3.md)
 - [Netflop.InlineObject4](docs/InlineObject4.md)
 - [Netflop.InlineResponse200](docs/InlineResponse200.md)
 - [Netflop.Movies](docs/Movies.md)
 - [Netflop.Review](docs/Review.md)
 - [Netflop.Series](docs/Series.md)


## Documentation for Authorization

All endpoints do not require authorization.