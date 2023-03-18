Welcome to LeafList

Project Description:
I created a full-stack web application designed to help users keep track of their daily tasks. The app allows users to create, edit, mark as complete, and delete their tasks. The app was built using Node.js, Mongoose, Express, Tailwind, and EJS, adhering to the MVC structure. The app includes a model for tasks with all 7 RESTful routes and a second model for users. 

Wireframes:

[Task Page](https://media.git.generalassemb.ly/user/46542/files/846e920e-7eb8-4e47-ab01-7f5465e912ff)

[Edit Page](https://media.git.generalassemb.ly/user/46542/files/e6d1fd38-f48d-4e7e-b2e4-ccb8b8c7c0b8)

[New Page](https://media.git.generalassemb.ly/user/46542/files/be7cebf8-4761-4ed5-ae9c-7f5ac3bbcc79)

Problem: Many people struggle to keep track of their daily tasks and end up forgetting important to-dos. Leaflist is a to-do app that allows users to keep track of their daily tasks, so they can better manage their time. My target audience are busy professionals, students, and anyone who wants to stay organized and productive.


Routes used:
- GET /home - Landing Page
- GET /sign-up - New profile form
- POST /sign-up - Create new profile
- GET /log-in - Log in form
- POST /log-in - Log in to the profile
- GET /sign-out - Destroy session and redirect back to landing page
- POST /sign-out - Sign user out
- GET /no-user - If user is not logged in and tries to go to another route, it redirects them to a log in/sign up page
- GET /tasks - Retrieve all tasks
- GET /tasks/new - Display a form to create a new task
- POST /tasks - Create a new task
- GET /tasks/:id - Retrieve a single task by ID
- GET /tasks/:id/edit - Display a form to edit an existing task
- PUT /tasks/:id - Update an existing task
- DELETE /tasks/:id - Delete a task by ID


User Stories:
- As a user, I want to be able to create a new task.
- As a user, I want to be able to view all of my tasks in a list.
- As a user, I want to be able to edit a task.
- As a user, I want to be able to delete a task.
- As a user, I want the app to be aesthetically pleasing.

MVP Goals:
- The app must let the user create a new task
- The app must let the user edit an existing task
- The app must let the user delete an existing task
- The app must display the tasks on the index page
- The apps forms should be clear to the user
- The app must contain a Readme file

Stretch Goals:
Stretch goals for the app include adding a second model for categories and allowing users to assign tasks to categories, implementing sign-up/log-in functionality with encrypted passwords and authorization flow, using EJS Partials to reduce repetition in views, incorporating a third-party API for a calendar, and connecting it to Atlas to retain the information the user includes.

Accomplished Stretch Goals: 
- Incorporated user authentication into the app.
- Connected the app to MongoDb Atlas
- Used partials to modularize the app

Unsolved Problems:
- Wasn't able to connect to the Google Calendar API due to login restriction.
- Wasn't able to set up reminders at the time of the task

Hosted App:
(Wasn't able to deploy to Heroku do to technical difficulties with my account, will add the link here once I get that sorted out)