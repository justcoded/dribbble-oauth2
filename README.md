# Dribble API

Lib to easy access and use dribbble oauth2 api.

## Getting Started

``` js
const DribbleOauth2 = require('dribble.oauth2');
const settings = {
  'client_id': YOUR_CLIENT_ID,
  'client_secret': YOUR_CLIENT_SECRET
};
const dribble = require('./dribbble-oauth2/index')(settings); // return instance of dribble (singleton)
```
##### Init dribble and set local url when you will get code (note, redirect url should be save in dribble account)
Scope can be 'public', 'upload', public+upload';
```js
const url = dribble.authorize(redirectUrl, scope); retrun link (string)
```
go to link returned from method `authorize` and login into dribble use your credentials.
after login on dribble, you will be redirect on setted url.
use code in params and get the access_token.
```js
app.get('/redirect', (req, res) => {        // example route
  const code = req.query.code;              // get code from url params

  dribble.getToken(code)                    
    .then(response => {
      if (response.status) {                
        res.json(response.statusText)
      } else {
        res.json(response)                  // Here access_token
      }                                     // Can use in future requests 
    });
});
```

##### Use predefine access_token
``` js
const dribble = DribbleOauth()();
dribble.setAccessToken(ACCESS_TOKEN)
```