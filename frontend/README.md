Movie Collection Manager is a simple web application that helps users store and manage information about movies. The system allows users to add, view, and organize movies in a structured way.

Users can keep track of movies they have watched or want to watch and filter them based on language, rating, and tracking status.

This project demonstrates basic backend development using **Node.js, Express.js, and MongoDB**.

---

- Store movie information in a database
- Organize a movie collection efficiently
- Allow users to filter movies by language, rating, and tracking status
- Demonstrate CRUD operations using REST APIs

---


- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JavaScript  

---
```
movie-collection-manager
│
├── config
│   └── db.js
│
├── controllers
│   └── movieController.js
│
├── models
│   └── movieModel.js
│
├── routes
│   └── movieRoutes.js
│
├── server.js
│
├── package.json
│
└── README.md
```
---
| Field | Description |
|------|-------------|
| title | Name of the movie |
| genre | Movie category (Action, Comedy, Drama etc.) |
| director | Director of the movie |
| release | Release date of the movie |
| language | Language of the movie |
| status | Watched or Not Watched |
| rating | Movie rating |

Users can add a new movie to the collection by entering details such as title, genre, director, release date, language, status, and rating.


Displays the complete list of movies stored in the database.

Users can filter movies according to their language.

Example API:
```
GET /movies/language/Hindi
```

---
Movies can be sorted or filtered based on their rating.

Example API:
```
GET /movies/rating
```

---


Allows users to track movies based on watch status.

Example API:
```
GET /movies/status/watched
```

---


```json
{
  "title": "3 Idiots",
  "genre": "Comedy-Drama",
  "director": "Rajkumar Hirani",
  "release": "2009-12-25",
  "language": "Hindi",
  "status": "Watched",
  "rating": 8.4
}
```

---


```
git clone https://github.com/yourusername/movie-collection-manager.git
```


```
cd movie-collection-manager
```


```
npm install
```
```
npm run dev
```
---
- Search movies by title
- Add movie posters
- User authentication system
- Watchlist feature
- Movie recommendation system

---

Movie Collection Manager is a beginner-friendly project that demonstrates how to build a simple backend application with database integration. It allows users to manage their movie collection efficiently and understand basic REST API development.

---