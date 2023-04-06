# chat-app

Direct messaging web application with realtime messaging, connection status, and friend requests.

**Full website:** https://jlchung-chat.netlify.app

![image](https://user-images.githubusercontent.com/44554795/230207469-866fbbdd-c625-4c29-a322-a3409a115028.png)

## Why?

Passion project built with intentions to have a better understanding of a chat application architecture and how features like connection status can be implemented.

## Lessons Learned:

First time using a UI component library to build an application. Lots of time was spent learning how to use MaterialUI's system instead of speeding up the process of building a decent looking frontend. Some components, like the modal and icon buttons, were quick and easy to use, but I'd rather create layouts with more vanilla CSS instead.

First time using sessions for authentication instead of JSON Web Tokens (JWTs). Sessions were preferred over JWTs because we want to validate user actions with the server. Although JWTs have the advantage of saving user's info within the JWT session token, because JWTs are self-contained, it is difficult to invalidate/update them. The issue with sessions is that user info has to be retrieved from the database which makes an additional database call compared to using JWTs, but Redis can be used as a session store so database calls to get user information are very fast.

PostgreSQL was used only for a single table for user login information, so using Redis as the only database was a viable option. For future applications or later updates to this application, I understand how Redis can be used as a cache for frequent queries to a PostgreSQL database. If more tables were added that could be used with message information, then messages could also be stored in PostgreSQL to allow for more complex queries. Redis could then be used as a cache for frequently viewed messages.

This is the first experience I've had using any kind of WebSocket for realtime interactions through the Web. Socket.io provides a very easy to use library that allowed very easy connection from server to client. In the future I would opt to use a lighter weight WebSocket server library like "ws" instead, since many of the built-in functionality of socket.io is not needed.

## Client:

### Tech Used: React, MaterialUI, React Hook Form, Socket.io-Client

React allows a modular, component-based structure to allow easy updates and feature additions. MaterialUI allows an easy and quick chat UI to be created with React. React Hook Form is used alongside validation schema Yup to provide client-side form validation. Socket.io-client is paired with a Socket.io backend for realtime bidirectional interactions between client and server.

## Server:

### Tech Used: Express, Socket.io, Redis, PostgreSQL

Express is used to build a basic authentication API that uses PostgreSQL to store user information. User sessions are created on login, which are stored in Redis. Redis is also used to store user friends, friend requests, and messages. Redis is used over PostgreSQL for storing this information because of the need for only simple queries that need faster access time. Socket.io is used alongside Redis to provide users realtime updates for both the client and the server.

## Usage:

The main use case of this application is the realtime direct messaging, but some other features are:
- login/register authentication
- realtime friend requests
![friendReq](https://user-images.githubusercontent.com/44554795/230261459-ec409f73-16c3-4984-beb0-8956533809d8.gif)
- realtime connection status
![onlineStatus](https://user-images.githubusercontent.com/44554795/230261510-0c0144ca-ffae-4936-b25a-84307dd884cf.gif)

## Issues

- When deleting the last user in the sidebar, a MUI tab arrow appears that disappears on refresh. 

## Contact

Joshua Chung - joshlchung@gmail.com

Project Link - https://github.com/jlchuun/chat-app



