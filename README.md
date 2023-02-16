# Project
<div style="display: flex; flex-direction: row; align-items:center; justify-content: start" >
    <span style="font-size: 100px; color: #ffc000; margin-right: 150px">Splashd</span>
    <img src="react-app/src/assets/icon.png"/>
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
