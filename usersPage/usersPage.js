
import {
    auth,
    db,
    app,
    getFirestore,
    collection,
    query,
    where,
    getDocs,
    createUserWithEmailAndPassword,
} from "../firebase.Config.js";
const bodyPageMain = document.querySelector(".bodyPageMain");
let home = document.querySelector(".home");
let allUsers = document.querySelector(".allUsers");

allUsers.addEventListener("click", () => {
  window.location.href = "./usersPage.html";
});
home.addEventListener("click", () => {
  window.location.href = "../dashboard/index.html";
});

async function getAllUsers() {
  const q = query(collection(db, "users"));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    const { username, email, surname ,gender} = doc.data();

    const columnHtml = document.createElement("div");
    columnHtml.setAttribute("class", "col m-3 userDiv");

    const content = `
        <div class="col innerContent">
        <div class="card" style="width: 100%;">
            <img src="..." class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${username} ${surname}</h5>
                <p class="card-text">User Email: ${email} <br/> Gender: ${gender}</p>
                <a href="#" class="btn btn-secondary">Follow</a>
            </div>
        </div>
    </div>
        `;
    columnHtml.innerHTML = content;

    bodyPageMain.appendChild(columnHtml);
  });
}

getAllUsers();
