const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
// translation for request json
app.use(express.json());

let characters = [
  {
    id: 0,
    firstName: "Jake",
    lastName: "Peralta",
    gender: "male",
    age: 39,
    likes: ["Amy", "Die Hard", "Taylor Swift"],
  },
  {
    id: 2,
    firstName: "Rosa",
    lastName: "Diaz",
    gender: "female",
    age: 34,
    likes: ["motorcycles", "Nancy Meyers", "weapons"],
  },
  {
    id: 1,
    firstName: "Amy",
    lastName: "Santiago",
    gender: "female",
    age: 37,
    likes: ["binders", "grammar", "dancing"],
  },
  {
    id: 3,
    firstName: "Charles",
    lastName: "Boyle",
    gender: "male",
    age: 42,
    likes: ["Jake", "dogs", "food"],
  },
];

// end points we created, need exact tring on server
app.get("/characters", (req, res) => {
  console.log("hit chars");
  res.status(200).send(characters);
});

///endpoint - name
app.get("/character/:name", (req, res) => {
  const { name } = req.params;
  const index = characters.findIndex(
    (char) => char.firstName.toLowerCase() === name
  );
  res.status(200).send(characters[index]);
});

//endpoint - query, looking for age
//capturing age property on req.query object
//curly brackets: destructuring
app.get("/character", (req, res) => {
  const { age } = req.query;
  let filtered = characters.filter((char) => {
    return char.age > age;
  });

  res.status(200).send(filtered);
});

let id = 4;

//same endpoint needs differnet method, creating new obj
//send new character list with new character
app.post("/character", (req, res) => {
  let newChar = { ...req.body, id };
  newChar.likes = newChar.likes.slice(0, 3);
  characters.unshift(newChar);
  res.status(200).send(characters);
  id++;
});

// start server
app.listen(4000, () => console.log("up on 4000"));
