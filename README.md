

a. The title of your site and a link to the URL where it is deployed

Backend:https://cacophony-demo-app-backend.herokuapp.com
Frontend:cacophony-demo-app-frontend.surge.sh
Title: Cacophony

b. Describe what your website does

This is a site where a user can create and manage a set of chatrooms grouped together for a specific organization or purpose

c. List the features you implemented and explain why you chose those features to implement

-users can create "servers" which are a grouping of chatrooms
-administrators can manage their servers and add other users to their servers
-administrators can create new chatrooms inside their servers
-users can manage their profile, change their username and profile picture
-users can manage their membership profile in each server they are a member of
-users post messages to a chatroom and read the content

d. Where your tests are and how to run them

tests are in the _test folder and can be run from the command line with "npm test"

e. Walk someone through the standard user flow for the website

When you first join the site, you can sign-up by clicking the 'Sign Up' link on the left side of the navbar at the top of the screen.  From there you enter your information
and submit.  If you are already a member you can click on the 'Login' link also on the left side of the navbar. Once logged in, there will be a list of the servers you are a 
member of listed in a sidebar on the left side of the screen.  You can create a new server by clicking on the "Create New Server" link on the left side of the navbar at the top of
the screen.  Once you click on a server, you will be taken to a a server screen.  On the left side of the server screen there is a sidebar with a list of chatrooms that you can click
on.  On the right side there is a sidebar with a list of members of the server.  You can click on the members in the list to see their member profile. At the top of the screen, there will be a second navbar with the title of the current server at the left side. If you click on it there will be a drop down menu.  Depending on your status on the server you will be able to 
find all the server management screens from here.  If you are a server admin you can manage the rooms, the members, and the server settings.

f. Keep the API in there, and if you have anything to say about the API then
add some notes. If you have created your own API, please document the
process.

I built my own API backend.  See section a.

g. Identify the technology stack used to create your website

I have used axios, Redux, Redux-Thunk, Reactjs, React-router, React-redux, Reactstrap, Bootstrap, Bootstrap-icons, react-bootstrap-icons, uuid and jsonwebtoken for the frontend.
 For the backend I used Nodejs, Expressjs, jsonscheme and jsonwebtoken.

h. Include anything else that you feel is important to share 

When I started, I intended to build a lot bigger app than the final product.  I had to cut down the scope of the project for time constraints.  I plan to continue to develop this 
project in the future.  The backend is far more robust than the frontend actually uses, and there are lots of additional features that were only half developed for the sake of 
time.  