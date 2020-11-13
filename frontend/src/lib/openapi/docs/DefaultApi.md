# Netflop.DefaultApi

All URIs are relative to *http://localhost:3000*

Method | HTTP request | Description
------------- | ------------- | -------------
[**getEpisodes**](DefaultApi.md#getEpisodes) | **GET** /episodes | Your GET endpoint
[**getFavorites**](DefaultApi.md#getFavorites) | **GET** /favorites | Your GET endpoint
[**getLikes**](DefaultApi.md#getLikes) | **GET** /likes | Your GET endpoint
[**getMovies**](DefaultApi.md#getMovies) | **GET** /movies | Your GET endpoint
[**getReviews**](DefaultApi.md#getReviews) | **GET** /reviews | Your GET endpoint
[**getSeries**](DefaultApi.md#getSeries) | **GET** /series | Your GET endpoint
[**getVideos**](DefaultApi.md#getVideos) | **GET** /videos | Your GET endpoint
[**postFavorites**](DefaultApi.md#postFavorites) | **POST** /favorites | 
[**postLogin**](DefaultApi.md#postLogin) | **POST** /login | 
[**postRegister**](DefaultApi.md#postRegister) | **POST** /register | 
[**postReviews**](DefaultApi.md#postReviews) | **POST** /reviews | 



## getEpisodes

> [Episodes] getEpisodes()

Your GET endpoint

### Example

```javascript
import Netflop from 'netflop';

let apiInstance = new Netflop.DefaultApi();
apiInstance.getEpisodes((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[Episodes]**](Episodes.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getFavorites

> [OneOfMoviesSeries] getFavorites(opts)

Your GET endpoint

### Example

```javascript
import Netflop from 'netflop';

let apiInstance = new Netflop.DefaultApi();
let opts = {
  'usersId': 56 // Number | 
};
apiInstance.getFavorites(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **usersId** | **Number**|  | [optional] 

### Return type

[**[OneOfMoviesSeries]**](OneOfMoviesSeries.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getLikes

> getLikes(opts)

Your GET endpoint

### Example

```javascript
import Netflop from 'netflop';

let apiInstance = new Netflop.DefaultApi();
let opts = {
  'inlineObject2': new Netflop.InlineObject2() // InlineObject2 | 
};
apiInstance.getLikes(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **inlineObject2** | [**InlineObject2**](InlineObject2.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## getMovies

> [Movies] getMovies()

Your GET endpoint

### Example

```javascript
import Netflop from 'netflop';

let apiInstance = new Netflop.DefaultApi();
apiInstance.getMovies((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[Movies]**](Movies.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getReviews

> [Review] getReviews(opts)

Your GET endpoint

### Example

```javascript
import Netflop from 'netflop';

let apiInstance = new Netflop.DefaultApi();
let opts = {
  'moviesId': 56, // Number | 
  'seriesId': 56 // Number | 
};
apiInstance.getReviews(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **moviesId** | **Number**|  | [optional] 
 **seriesId** | **Number**|  | [optional] 

### Return type

[**[Review]**](Review.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getSeries

> [Series] getSeries()

Your GET endpoint

### Example

```javascript
import Netflop from 'netflop';

let apiInstance = new Netflop.DefaultApi();
apiInstance.getSeries((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[Series]**](Series.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## getVideos

> [OneOfMoviesSeries] getVideos()

Your GET endpoint

### Example

```javascript
import Netflop from 'netflop';

let apiInstance = new Netflop.DefaultApi();
apiInstance.getVideos((error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters

This endpoint does not need any parameter.

### Return type

[**[OneOfMoviesSeries]**](OneOfMoviesSeries.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


## postFavorites

> postFavorites(opts)



### Example

```javascript
import Netflop from 'netflop';

let apiInstance = new Netflop.DefaultApi();
let opts = {
  'inlineObject4': new Netflop.InlineObject4() // InlineObject4 | 
};
apiInstance.postFavorites(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **inlineObject4** | [**InlineObject4**](InlineObject4.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## postLogin

> InlineResponse200 postLogin(opts)



### Example

```javascript
import Netflop from 'netflop';

let apiInstance = new Netflop.DefaultApi();
let opts = {
  'inlineObject': new Netflop.InlineObject() // InlineObject | 
};
apiInstance.postLogin(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully. Returned data: ' + data);
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **inlineObject** | [**InlineObject**](InlineObject.md)|  | [optional] 

### Return type

[**InlineResponse200**](InlineResponse200.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


## postRegister

> postRegister(opts)



### Example

```javascript
import Netflop from 'netflop';

let apiInstance = new Netflop.DefaultApi();
let opts = {
  'inlineObject1': new Netflop.InlineObject1() // InlineObject1 | 
};
apiInstance.postRegister(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **inlineObject1** | [**InlineObject1**](InlineObject1.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined


## postReviews

> postReviews(opts)



### Example

```javascript
import Netflop from 'netflop';

let apiInstance = new Netflop.DefaultApi();
let opts = {
  'inlineObject3': new Netflop.InlineObject3() // InlineObject3 | 
};
apiInstance.postReviews(opts, (error, data, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log('API called successfully.');
  }
});
```

### Parameters


Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **inlineObject3** | [**InlineObject3**](InlineObject3.md)|  | [optional] 

### Return type

null (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

