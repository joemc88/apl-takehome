# apl-takehome
Apple take home test

**Objective**: 
_Create a small full stack web application to manage a simple inventory of products. The 
application should have a basic user interface where users can add, delete, and update products._

This application is designed to work as a pair of docker containers. One for the **Django** backend and SQLite DB and one for the **React** front end.

Because the backend includes the DB it will be necessary to initialise that with `python manage.py migrate`. 
You should also create a superuser in order to login using :`python manage.py createsuperuser`


I didn't get to deploying it on k8s so deployment is a bit more manual. 
There's a dockerfile and a docker-compose in each directory (frontend and back_end). To start the app open a terminal window in both directories and run:
`docker-compose up --build`

After that you should be good to go. The app will be available on http://localhost:3000.
