# Dribble-OAUTH2

Library to easy access and use dribbble OAuth2 api.

# Getting Started

``` js
const settings = {
  'client_id': YOUR_CLIENT_ID,
  'client_secret': YOUR_CLIENT_SECRET
};
const dribble = require('./dribbble-oauth2/index')(settings); // return instance of dribble (singleton)
```
##### Init dribble and set local url when you will get code (note, redirect url should be save in a dribble account)
Scope can be 'public', 'upload' or 'public+upload';
```js
const url = dribble.authorize(redirectUrl, scope);
return link(string);
```
Go to link returned from the `authorize` method and login into Dribbble using your credentials.
After this you will be redirected to the setted url.
Use code in params and get the access_token.
```js
app.get('/redirect', (req, res) => {     // Example route
  const code = req.query.code;           // Get the code from url params

  dribble.getToken(code)                    
    .then(response => {
      if (response.status) {                
        res.json(response.statusText)
      } else {
        res.json(response)               // Contains an access_token which you can use in future requests
      }                                     
    });
});
```

##### Use predefined access_token
``` js
const dribble = DribbleOauth()();
dribble.setAccessToken(ACCESS_TOKEN);
```

# API

## Shots 
### Get all shots
```js 
dribble.api.shot.getAll();
```
### Get shot by id 
**Name**|**Type**|**Description**
-----|-----|-----
id|number|Shot id
```js 
dribble.api.shot.get(id);   
```
### Create a shot
**Name**|**Type**|**Description**
-----|-----|-----
image|file|**Required**. The image file must be exactly 400x300 or 800x600 resolution, no larger than 8 megabytes, and be a GIF, JPG or PNG.
title|string|**Required**. The title of the shot.
description|string|The shot description.
low\_profile|boolean|Specify true if the shot is Low Profile.
rebound\_source\_id|integer|An ID of a shot that the new shot is a rebound of.

The authenticated user must either be a member of the team or be authenticated as the same team.
```js 
dribble.api.shot.create(settings);
```
### Update a shot
**Name**|**Type**|**Description**
-----|-----|-----
id|number|Shot Id.
description|string|Shot description.
low\_profile|boolean|Specify true if the shot is Low Profile.
scheduled\_for|timestamp|If the shot is not already published, will reschedule the shot to publish at the timestamp provided. Timestamp must be in ISO 8601 format. The authenticated user must be a pro, a team, or a member of a team.
tags|array|Tags for the shot. Limited to a maximum of 12 tags. If any existing tags are not provided they will be removed.
team\_id|integer|An ID of a team to associate the shot with. The authenticated user must be on the team. If any empty value is provided the team association will be removed.
title|string|The title of the shot.
```js 
dribble.api.shot.getAll(id, settings);
```

### Delete shot by id 
**Name**|**Type**|**Description**
-----|-----|-----
id|number|Shot id.
```js 
dribble.api.shot.delete(id);   
```

## User  

### Get the authenticated user
```js 
dribble.api.user.get();   
```

## Projects

### List projects
```js 
dribble.api.project.getAll();   
```

### Create a project
**Name**|**Type**|**Description**
-----|-----|-----
name|string|**Required**. The name of the project.
description|string|The project description.
```js 
dribble.api.project.create(settings);   
```

### Update a project
**Name**|**Type**|**Description**
-----|-----|-----
id|number|Project id.
name|string|The name of the project.
description|string|The project description.
```js 
dribble.api.project.create(id, settings);   
```

### Delete a project
**Name**|**Type**|**Description**
-----|-----|-----
id|number|Project id.
```js 
dribble.api.user.delete(id);   
```

## Attachments

### Create an attachment
**Name**|**Type**|**Description**
-----|-----|-----
file|file|**Required.** The attachment file must be no larger than 10 megabytes.
```js 
dribble.api.attachment.create(shotId, settings);   
```

### Create an attachment
```js 
dribble.api.attachment.delete(shotId, attachmentId);   
```