1. What tech stack will you use for your final project? 

Node and React, using Websockets for live updating and using Reactstrap for stylizing.  Using Redux for session data management.

2. Is the front-end UI or the back-end going to be the focus of your project? Or are
you going to make an evenly focused full-stack application?

full-stack

3. Will this be a website? A mobile app? Something else?

Website for now, mobile app and PC app as stretch goals.

4. What goal will your project be designed to achieve?

A compartmentalized social forums.

5. What kind of users will visit your app? In other words, what is the demographic of
your users?

Those who want to be able to organize and communicate around a particular event/topic/organization/ect.

6. What data do you plan on using? How are you planning on collecting your data?



7. In brief, outline your approach to creating your project (knowing that you may not
know everything in advance and that these details might change later). Answer
questions like the ones below, but feel free to add more information:

a. What does your database schema look like?

I will list tables followed by the the data in those tables:

USERS:
- username
- id
- hashed_password
- picture_url
- settings 

SERVERS:
- name
- id
- picture_url
- settings 

INVITE:
- link
- role_id
- user_cap
- expiration_time

ROLES:
- id
- server_id
- color
- title
- is_admin
- settings 

MEMBERSHIP:
- id
- user_id
- role_id
- nickname
- settings 

ROOMS:
- id
- server_id
- type
- settings (stored as a hexadecimal number)

ACCESS:
- room_id
- role_id

POSTS:
- id
- room_id
- user_id
- content
- treaded_from

REACTIONS:
- post_id
- user_id
- type

c. Is there any sensitive information you need to secure?

passwords, maybe posts

d. What functionality will your app include?

Allow users to make servers and join servers through invite links

e. What will the user flow look like?

1. follow invite link
2. if not signed in prompt to sign-in
3. add user to server
4. user opens rooms and interacts

