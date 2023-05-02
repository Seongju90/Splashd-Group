# Project
<div style="display: flex; flex-direction: row; align-items:center; justify-content: start" >
    <img src="react-app/src/assets/remove2-removebg-preview.png"/>
    <img src="react-app/src/assets/icanfindthis-removebg-preview-removebg-preview.png"/>
</div>
<br>

[Splashd](https://splashd.onrender.com/) is a web application based of Untapped, and created by a team of 4 software engineers.

<br>

## Project Wiki
* [Database Schema](https://github.com/D0RK5TER/Splashd/wiki/Database-Schema)
* [Features List](https://github.com/D0RK5TER/Splashd/wiki/Features-List)
* [Redux Store Shape](https://github.com/D0RK5TER/Splashd/wiki/Redux-Store-Shape)
* [User Stories](https://github.com/D0RK5TER/Splashd/wiki/User-Stories)


## Built Using
### Frontend
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
### Backend
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
### Host
![Render](https://img.shields.io/badge/render-%4351e8.svg?style=for-the-badge&logo=sqlite&logoColor=white)


# The Splash Page!
<img width="1454" alt="Screenshot 2023-04-18 at 10 48 15 PM" src="https://user-images.githubusercontent.com/107891735/234065031-dd4ac191-ae00-44ed-96c8-63dfd6ff32c8.png">

# Once you enter the site, you should probably log in!
<img width="927" alt="Screenshot 2023-04-18 at 10 48 42 PM" src="https://user-images.githubusercontent.com/107891735/234065337-93d2ba85-5108-4ca1-86e2-8422ac9adc83.png">

# Earn Badges by checking in beers!
<img width="1128" alt="Screenshot 2023-04-18 at 10 48 59 PM" src="https://user-images.githubusercontent.com/107891735/234065540-71df1e6b-0cab-4446-a97b-2846d05245e1.png">


# Getting Started
1. Clone the repo:
```
https://github.com/D0RK5TER/Splashd
```

2. Install packages:
```
pipenv install
cd react-app
npm install
```

3. Create .env and add:
```
SECRET_KEY=<<Password of your choosing>>
DATABASE_URL=sqlite:///dev.db
```

4. Enter the shell, then Migrate and seed files:
```
pipenv shell
flask db init
flask db migrate
flask db upgrade
flask seed all
```

5. Run the server
```
flask run
cd react-app
npm start
```

6. Navigate to local site
```
http://localhost:3000/
```
