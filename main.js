console.log("connected");

const getAllBtn = document.querySelector("#all");
const charBtns = document.querySelectorAll(".char-btns");
const ageForm = document.querySelector("#age-form");
const ageInput = document.querySelector("#age-input");
const createForm = document.querySelector("#create-form");
const newFirstInput = document.querySelector("#first");
const newLastInput = document.querySelector("#last");
const newGenderDropDown = document.querySelector("select");
const newAgeInput = document.querySelector("#age");
const newLikesText = document.querySelector("textarea");
const charContainer = document.querySelector("section");

// const baseURL =

function createCharacterCard(char) {
  let charCard = document.createElement("div");
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`;

  charContainer.appendChild(charCard);
}

function clearCharacters() {
  charContainer.innerHTML = ``;
}

//connect to app.get on server.js
// for of attached to array
function getAllChars() {
  axios
    .get("http://localhost:4000/characters")
    .then((res) => {
      clearCharacters();
      const newCharacterArr = res.data;
      for (let char of newCharacterArr) {
        createCharacterCard(char);
      }
    })
    .catch((err) => console.log(err));
}
//connect to button
getAllBtn.addEventListener("click", getAllChars);

//clearcharacter function will prevent unlimited list

//second get

function getSingleChar(event) {
  const name = event.target.id;
  axios.get(`http://localhost:4000/character/${name}`).then((res) => {
    clearCharacters();
    const newChar = res.data;
    createCharacterCard(newChar);
  });
}

//button
for (let btn of charBtns) {
  btn.addEventListener("click", getSingleChar);
}

//filter out array over certian age
//event to stop form from resubmitting
//forms default refresh page, prevent
// ? for queries
function getAllOldChars(event) {
  event.preventDefault();
  const age = ageInput.value;
  axios.get(`http://localhost:4000/character?age=${age}`).then((res) => {
    console.log(res.data);
    clearCharacters();
    const newCharacterArr = res.data;
    for (let char of newCharacterArr) {
      createCharacterCard(char);
    }
  });
}

function createNewChar(event) {
  event.preventDefault();

  const newLikes = newLikesText.value.split(", ");

  const body = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    gender: newGenderDropDown.value,
    age: parseInt(newAgeInput.value),
    likes: newLikes,
  };

  axios.post("http://localhost:4000/character", body).then((res) => {
    console.log(res.data);
    clearCharacters();
    const newCharacterArr = res.data;
    for (let char of newCharacterArr) {
      createCharacterCard(char);
    }
  });
}

newFirstInput.value = "";
newLastInput.value = "";
newGenderDropDown.value = "female";
newAgeInput.value = "";
newLikesText.value = "";

createForm.addEventListener("submit", createNewChar);
