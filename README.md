# Dribble API
## API

##### Connect lib

``` js
const DribbleOauth2 = require('dribble.oauth2');
const settings = {
  'client_id': YOUR_CLIENT_ID,
  'client_secret': YOUR_CLIENT_SECRET
};
const dribble = DribbleOauth(settings); // return instance of dribble (singleton)
```
##### init dribble and set your local url when you will get code (note, redirect url should be save in your dribble account)
```js
dribble.authorize(YOUR_LOCAL_REDIRECT_URL); retrun link (string)
```
go to link returned from method `authorize` and login into dribble use your credentials.
after login on dribble, you will be redirect on setted url.
use code in params and get the access_token.****
```js
app.get('/redirect', (req, res) => {        // example route
  const code = req.query.code;              // get code from url params

  dribble.getToken(code)                    // return promice
    .then(response => {
      if (response.status) {                // error check 
        res.json(response.statusText)
      } else {
        res.json(response)                  // here access_token, what you can use in future requests 
      }
    });
});
```


##### Use predefine access_token
``` js
const DribbleOauth2 = require('dribble.oauth2');
const settings = {
  'access_token': YOUR_ACCESS_TOKEN
};
const dribble = DribbleOauth(settings);
```