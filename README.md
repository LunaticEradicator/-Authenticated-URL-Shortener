# Authenticated URL Shortener Using node.js

## 1, Steps

**First Commit**

```
 Create a react app using vite with typescript.
 Implement React-Router since we need multiple screen for the URL Shortener Authentication.
 Create Custom Component which are used as different screen.
 Styling using Scss [Css Preprocessor ].
```

**Second Commit**

```
Setup Backend.
Setup Proxy.
Install Package [express, dotenv ,cors, nodemon, concurrently].
```

**Third Commit**

```
Setup MongDb Database [Atlas] .
Hash password on the userData [predefined User]
Setup User Model
Setup Seed File
Add Script to Run seedFile
Install Package [mongoose, colors, bcrypt].
```

**Fourth Commit**

```
Setup Routes and controller for API [Best Practice] .
Create Custom error handler
Create Custom Async handler
Fetch data from database
Test using postman [get request]
```

**Fifth Commit**

```
Create jsonwebtoken and store it in cookie
Create protectionMiddle [later use]
Create login route [email and password validation and save the user._id as cookie]
Create register route [save the user._id as cookie]
Create user logout [Clearing the cookie]
Install Package [jsonwebtoken,cookie-parser].
```

**Sixth Commit**

```
Setup redux [store and provider]
Create UserApi [login,register,logout]
Create UserSlice [loginCredentials,registerCredentials,logoutCredentials]
Change home screen [urlShorter]
Create Header Component
Create Footer Component
Install Package [react-redux, @reduxjs/toolkit].
```

**Seventh Commit**

```
Login functionality
Header Component Change [rebase]
Install Package [react-toastify].
```

**Eight Commit**

```
Register and Logout functionality
```

**Ninth Commit**

```
[Logic
 1, We save the user input in the database using a post route
 2, Then we create a random id [shortid] for that link
 3, Then we create another get route
 4, Where we will search the model id with the req.params[id]
 ]
Backend Implementation ShortUrl [Model, Routes, Controller]
Install Package [valid-url,shortid].
```

**Ten Commit**

```
Frontend Implementation ShortUrl [Redux API, mutation and query on Home-screen]
Backend : ProtectedRoute on ShortUrl [Only if user Login [Authentication] is done, api will be called]
Responsive Table to store the ShortUrl data
Minor Style Changes and responsive fix
```

**Eleven Commit**

```
ShortUrl post route change [shortUrlController]
add edge case [same link for different user if the link doesn't already exist]
```

**Twelve Commit**

```
Bug Fix : Automated Re-fetching [Redux]
```
