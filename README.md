# Projects

"Projects" as the name implies is a project management app.
You can create new projects, assign team members, set deadlines, change statuses.
It has user access rights the participants can see and edit only the projects they are part of.

Tech stack used:
 - backend => Node.js 
    - User authorization and authentication
    - RESTful API
 - frontend => ReacJs
 - database => MySQL 
 - serve images => AWS S3

# Endpoints backend API
UserEndpoint:
- POST: /register
- POST: /login
- POST: /user-profile
- GET:  authChecker
- GET:  /get/all-users
    
Projects endpoints:
- GET:  /get/projects
- POST: /post/newProject
- GET: /get/edit-project/:id
- PUT:  /put/edited/project/:id
- POST: /get/finished-project
- POST: /move/finished-project/:id
- DELETE: /delete/project/:id
  
Aws endpoints:
- POST: /setPath/user-profile-photo
  
  Photo:
    ![home](https://user-images.githubusercontent.com/63923347/191604634-5f43c4dc-488d-461c-8bdf-545ce6a7e138.png)
    ![dashboard](https://user-images.githubusercontent.com/63923347/191606380-f3f04784-1c00-446d-8f29-89e0b33475d7.png)
    ![edit project](https://user-images.githubusercontent.com/63923347/191606400-fd182a8c-d46c-4ff4-848b-5cae59a6acbc.png)
    ![project card](https://user-images.githubusercontent.com/63923347/191606424-938d376b-f8d9-4e9b-8624-3affd45bc273.png)
    ![finished project](https://user-images.githubusercontent.com/63923347/191606500-cb2f788f-fd2e-45c4-9c5a-bcaa4d45dd33.png)
