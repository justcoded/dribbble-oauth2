# Dribble-OAUTH2

Lib to easy access and use dribbble oauth2 api.

# Getting Started

``` js
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

# API

## Shots 
### Get all shots
```js 
dribble.api.shot.getAll()
```
### Get shot by id 
**Name**|**Type**|**Description**
:-----:|:-----:|:-----:
id|number|Shot id
```js 
dribble.api.shot.get(id)   
```
### Create a shot
**Name**|**Type**|**Description**
:-----:|:-----:|:-----:
image|file|Required. The image file.It must be exactly 400x300 or 800x600, no larger than eight megabytes, and be a GIF, JPG, or PNG.
title|string|Required. The title of the shot.
description|string|A description of the shot.
low\_profile|boolean|Specify true if the shot is Low Profile.
rebound\_source\_id|integer|An ID of a shot that the new shot is a rebound of.

The authenticated user must either be a member of the team or be authenticated as the same team.
```js 
dribble.api.shot.create(settings)
```
### Update a shot
**Name**|**Type**|**Description**
:-----:|:-----:|:-----:
id|number|Shot Id
description|string|A description of the shot.
low\_profile|boolean|Specify true if the shot is Low Profile.
scheduled\_for|timestamp|If the shot is not already published, will reschedule the shot to publish at the timestamp provided. Timestamp must be in ISO 8601 format.The authenticated user must be a pro, a team, or a member of a team.
tags|array|Tags for the shot. Limited to a maximum of 12 tags. If any existing tags are not provided they will be removed.
team\_id|integer|An ID of a team to associate the shot with. The authenticated user must be on the team. If any empty value is provided the team association will be removed.
title|string|The title of the shot.
```js 
dribble.api.shot.getAll(id, settings)
```

### Delete shot by id 
**Name**|**Type**|**Description**
:-----:|:-----:|:-----:
id|number|Shot id
```js 
dribble.api.shot.delete(id)   
```

## User  

### Get the authenticated user
```js 
dribble.api.user.get()   
```

## Projects

### List projects
```js 
dribble.api.project.getAll()   
```

### Create a project
**Name**|**Type**|**Description**
:-----:|:-----:|:-----:
name|string|Required The name of the project.
description|string|The project description.
```js 
dribble.api.project.create(settings)   
```

### Update a project
**Name**|**Type**|**Description**
:-----:|:-----:|:-----:
id|number|Project id
name|string|The name of the project.
description|string|The project description
```js 
dribble.api.project.create(id, settings)   
```

### Delete a project
**Name**|**Type**|**Description**
:-----:|:-----:|:-----:
id|number|Project id
```js 
dribble.api.user.delete(id)   
```

## Attachments

### Create an attachment
**Name**|**Type**|**Description**
:-----:|:-----:|:-----:
file|file|Required. The attachment file. It must be no larger than 10 megabytes.
```js 
dribble.api.attachment.create(shotId, settings)   
```

### Create an attachment
```js 
dribble.api.attachment.delete(shotId, attachmentId)   
```