# Full Stock Application

Full Stock is an application to buy and sell stocks in easy way

- RESTful endpoint for asset's CRD operation
- JSON formatted response

## RESTful Endpoints

### POST /register

> Create new user

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "<email to get insert into>",
  "password": <password to get insert into>,
}
```

_Response (201 - Created)_

```
{
  "id": <given id by system>,
  "email": "<posted email>",
}
```

_Response (400 - SequelizeValidationError)_

```
{
  "message": "Must be email format"
}
```

_Response (400 - SequelizeValidationError)_

```
{
  "message": "Email is required"
}
```

_Response (400 - SequelizeUniqueConstraintError)_

```
{
  "message": "email must be unique"
}
```

_Response (400 - SequelizeValidationError)_

```
{
  "message": "Password is required"
}
```

### POST /login

> Log in to homepage

_Request Header_

```
not needed
```

_Request Body_

```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
}
```

_Response (200)_

```
{
  "access_token": "<your access token>",
}
```

_Response (400 - Bad Request)_

```
{
  "message": "Email/Password is required"
}
```

_Response (401 - Unauthorized)_

```
{
  "message": "User not found"
}
```

### POST /login/google

> Log in to homepage

_Request Header_

```
{
  "access_token": "<google access token>"
}
```

_Request Body_

```
{
  "userName": "<name from google account>",
  "email": "<email from google account>",
}
```

_Response (200)_

```
{
  "access_token": "<your jwt access token>",
}
```

_Response (400 - Bad Request)_

```
{
  "message": "Email/Password is required"
}
```

### GET /stocks

> Get stocks data and news

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200 - Ok)_

```
 [
        {
            "ticker": "<Stock ticker>",
            "name": "<Stock name>",
            "exchange_short": "<Stock short>",
            "exchange_long": "<Stock long>",
            "mic_code": "<Stock mic code>",
            "currency": "<Stock currency>",
            "price": <Stock price>,
            "day_high": <Stock price day high>,
            "day_low": <Stock price day low>,
            "day_open": <Stock open price>,
            "52_week_high": <Stock 52 week high price>,
            "52_week_low": <Stock 52 week low price>,
            "market_cap": <Stock market cap>,
            "previous_close_price": <Stock previous close price>,
            "previous_close_price_time": "<Stock previous close time>",
            "day_change": <Stock price day change>,
            "volume": <Stock volume>,
            "is_extended_hours_price": <Stock extended hours price>,
            "last_trade_time": "<Stock last traded time>"
        },
        {
            "ticker": "<Stock ticker>",
            "name": "<Stock name>",
            "exchange_short": "<Stock short>",
            "exchange_long": "<Stock long>",
            "mic_code": "<Stock mic code>",
            "currency": "<Stock currency>",
            "price": <Stock price>,
            "day_high": <Stock price day high>,
            "day_low": <Stock price day low>,
            "day_open": <Stock open price>,
            "52_week_high": <Stock 52 week high price>,
            "52_week_low": <Stock 52 week low price>,
            "market_cap": <Stock market cap>,
            "previous_close_price": <Stock previous close price>,
            "previous_close_price_time": "<Stock previous close time>",
            "day_change": <Stock price day change>,
            "volume": <Stock volume>,
            "is_extended_hours_price": <Stock extended hours price>,
            "last_trade_time": "<Stock last traded time>"
        },
        {
            "ticker": "<Stock ticker>",
            "name": "<Stock name>",
            "exchange_short": "<Stock short>",
            "exchange_long": "<Stock long>",
            "mic_code": "<Stock mic code>",
            "currency": "<Stock currency>",
            "price": <Stock price>,
            "day_high": <Stock price day high>,
            "day_low": <Stock price day low>,
            "day_open": <Stock open price>,
            "52_week_high": <Stock 52 week high price>,
            "52_week_low": <Stock 52 week low price>,
            "market_cap": <Stock market cap>,
            "previous_close_price": <Stock previous close price>,
            "previous_close_price_time": "<Stock previous close time>",
            "day_change": <Stock price day change>,
            "volume": <Stock volume>,
            "is_extended_hours_price": <Stock extended hours price>,
            "last_trade_time": "<Stock last traded time>"
        }
    ]
```

_Response (400 - Bad Request)_

```
{
  "message": "Invalid requests"
}
```

### GET /stocks/:ticker

> Get products by ticker

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Request Params_

```
{ ticker : <ticker>}
```

_Response (200)_

```
[
    {
            "ticker": "<Stock ticker>",
            "name": "<Stock name>",
            "exchange_short": "<Stock short>",
            "exchange_long": "<Stock long>",
            "mic_code": "<Stock mic code>",
            "currency": "<Stock currency>",
            "price": <Stock price>,
            "day_high": <Stock price day high>,
            "day_low": <Stock price day low>,
            "day_open": <Stock open price>,
            "52_week_high": <Stock 52 week high price>,
            "52_week_low": <Stock 52 week low price>,
            "market_cap": <Stock market cap>,
            "previous_close_price": <Stock previous close price>,
            "previous_close_price_time": "<Stock previous close time>",
            "day_change": <Stock price day change>,
            "volume": <Stock volume>,
            "is_extended_hours_price": <Stock extended hours price>,
            "last_trade_time": "<Stock last traded time>"
        }
]
```

_Response (404 - Bad Request)_

```
{
  "message": "Not Found"
}
```

### POST /payments

> Generate payment link to buy stocks

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Params_

```
not needed
```

_Request Body_

```
{
  "ticker": "<ticker to get insert into>",
  "amount": "<amount to get insert into>",
}
```

_Response (200)_

```
redirect to payment page
```

### POST /mystocks

> Create new stock to user's stock list

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Params_

```
not needed
```

_Request Body_

```
{
  "ticker": "<stock ticker to get insert into>"
  "name": "<stock name to get insert into>"
  "buyPrice": "<buy price to get insert into>"
  "currentPrice": "<current price to get insert into>"
  "amount": "<amount to get insert into>"

}
```

_Response (200)_

```
{
  message: "Success"
}
```

### GET /mystocks

> Get all stocks from my stocks

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```
[
    {
        "id": 1,
        "ticker": "<stock ticker>",
        "name": "<stock name>",
        "buyPrice": <stock buy price>,
        "currentPrice": <stock current price>,
        "share": <stock smount of share>,
        "amount": <stock amount of money>,
        "roe": <stock return of equity>,
        "UserId": 2,
        "createdAt": "2023-09-28T10:43:29.495Z",
        "updatedAt": "2023-09-28T10:43:29.495Z"
    },
    {
        "id": 2,
        "ticker": "<stock ticker>",
        "name": "<stock name>",
        "buyPrice": <stock buy price>,
        "currentPrice": <stock current price>,
        "share": <stock smount of share>,
        "amount": <stock amount of money>,
        "roe": <stock return of equity>,
        "UserId": 2,
        "createdAt": "2023-09-28T10:45:10.473Z",
        "updatedAt": "2023-09-28T10:45:10.473Z"
    }
]
```

### DELETE /mystocks/:id

> Delete stock from my stock by id

_Request Header_

```
{
  "access_token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Request Params_

```
{ id : <id>}
```

_Response (200)_

```
    {
        message : "Successfully sold"
    },
```

_Response (404 - Bad Request)_

```
{
  "message": "Not Found"
}
```

## GLOBAL ERROR

_Response (401 - Unauthorized)_

```
{
  "message": "Invalid Token"
}
```

_Response (403 - Forbidden)_

```
{
  "message": "Forbidden"
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```
