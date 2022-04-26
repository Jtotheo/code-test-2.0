// variabler för 1) element som skal erhålla htmlkoden 2) att spara datan från API-fetch
let userListDiv = document.querySelector(".cardContainer");
let userListElements = "";
let modal = document.getElementById("modal");

// funktion för att 1) hämta datan, loopa fram relevanta poster, och cacha till variabel userListElements i htmlForm.
// 2) deklarera variabler för de element som skall vara klickbara och tilldela dem eventlisteners
// som kör funktionen fetchUserData nedan.
async function fetchData() {
  await fetch("https://reqres.in/api/users/")
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.data.length; i++) {
        userListElements += `<div class= "userCard"><div id="user${data.data[i].id}">
            <img class="idImages" src=${data.data[i].avatar} alt="image of user"></img>
            <p class="name">${data.data[i].first_name} ${data.data[i].last_name}</p>
            <p class="email">${data.data[i].email}</p>
        </div></div>`;
      }
      userListDiv.innerHTML = userListElements;
      let user1 = document.getElementById("user1");
      let user2 = document.getElementById("user2");
      let user3 = document.getElementById("user3");
      let user4 = document.getElementById("user4");
      let user5 = document.getElementById("user5");
      let user6 = document.getElementById("user6");

      user1.addEventListener("click", () => fetchUserData(1));
      user2.addEventListener("click", () => fetchUserData(2));
      user3.addEventListener("click", () => fetchUserData(3));
      user4.addEventListener("click", () => fetchUserData(4));
      user5.addEventListener("click", () => fetchUserData(5));
      user6.addEventListener("click", () => fetchUserData(6));
    });
}
// funktionen ovan körs
fetchData();

// funktion som körs när respektive kort klickas (se rad 29-34 ovan) för 1) hämta data om respektive individ
// och tilldela till variabel modal som deklareras ovan 2) toggla synlighet för det modala fönstret
// 3) deklarera variabel och funktionalitet för det klickbara "X" som stänger det modala fönstret
async function fetchUserData(id) {
  await fetch(`https://reqres.in/api/users/${id}`)
    .then((res) => res.json())
    .then((data) => {
      userInfo = `<div class= indUser><div class= "modalCloseHolder"><p id= "closeModal">&#215</></div><div class=user${data.data.id}>
            <div class= "modalCard">
            <img class="idImages" src=${data.data.avatar} alt="image of user"></img>
            <p class="name">${data.data.first_name} ${data.data.last_name}</p>
            <a href="mailto:${data.data.email}">${data.data.email}</a>
            
            <p class="text">${data.support.text} </p><a href=${data.support.url} class= "supportLink"> Support</a> 
        </div></div></div>`;
      modal.innerHTML = userInfo;
      modal.style.display = "block";
      let closeModal = document.getElementById("closeModal");
      closeModal.addEventListener("click", function () {
        modal.style.display = "none";
      });
    });
}
// funktionalitet som stänger/osynliggör det modala fönstret om användare klickar i området utanför fönstret
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
