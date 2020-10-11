# Farm-Chats API Documentation

This is an documentation for API that stores and handles CRUD operations for users and chats resources.

## API End Points

|Resource | Verb   | Request URI            |Request Headers|Request Body   | Action          |Response        |
|--------|--------|------------------------|---------------|---------------|------------------|----------------|
|User    | POST   | `/sign-up`             |      Empty    |credentials    | `user signup`    |201, Created    |
|        | POST   | `/sign-in`             |      Empty    |credentials    | `user signin`    |201, OK         |
|        | DELETE | `/sign-out`            |      Token    |Empty          | `user signout`   |204, No Content |
|        | PATCH  | `/change-password`     |      Token    |passwords      | `user changepw`  |204, No Content |
|        | GET    | `/users`               |      Token    |Empty          | `user Index`     |200, OK         |
|Chat    | GET    | `/chatmsg`             |      Token    |Empty          | `Chats Index`    |200, OK         |
|        | POST   | `/chatmsg`             |      Token    |chats          | `Chat Create`    |201, Created    |
|        | PATCH  | `/chatmsg/:id`         |      Token    |chat           | `Chat Update`    |204, No Content |
|        | DELETE | `/chatmsg/:id`         |      Token    |Empty          | `Chat Delete`    |204, No Content |
