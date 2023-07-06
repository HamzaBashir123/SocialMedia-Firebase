import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA_DRp6Ug-ZrxKy5LLMBMDDqXuvfUbvyyU",
  authDomain: "social-media-70e81.firebaseapp.com",
  projectId: "social-media-70e81",
  storageBucket: "social-media-70e81.appspot.com",
  messagingSenderId: "150864508831",
  appId: "1:150864508831:web:9ed47017c9cde032a66faa",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const brigth = document.querySelector(".brigth");
const crossIcon = document.querySelector(".crossIcon");
const createPage = document.querySelector(".createPage");
const CreateAccount = document.querySelector(".CreateAccount");
const login = document.querySelector(".login");
// const rightChild = document.querySelector(".rightChild");
// console.log(rightChild)

const signUpClosed = () => {
  createPage.style.display = "none";
  brigth.style.display = "none";
  CreateAccount.style.zIndex = 1;
  login.style.zIndex = 1;
};
crossIcon.addEventListener("click", signUpClosed);

const openSignUpForm = () => {
  // console.log('hello')
  createPage.style.display = "block";
  brigth.style.display = "block";
  CreateAccount.style.zIndex = 0;
  login.style.zIndex = 0;
};
CreateAccount.addEventListener("click", openSignUpForm);

// signUp Button and Form fields
const signUp = document.querySelector(".signUp");
const firstname = document.querySelector(".firstname");
const Surname = document.querySelector(".lastname");
const cellNumber = document.querySelector(".cellNumber");
const passWord = document.querySelector(".passWord");
const day = document.querySelector(".day");
const month = document.querySelector(".month");
const year = document.querySelector(".year");
const gender = document.getElementsByName("inlineRadioOptions");

// const users = JSON.parse(localStorage.getItem('users')) || []
// let date;
// let month;
// let year;
// let gender;

signUp.addEventListener("click", signUpHandler);

//          Sign Up function

function signUpHandler() {
  let genValue;
  for (let i = 0; i < gender.length; i++) {
    if (gender[i].checked) {
      genValue = gender[i].value;
    }
  }
  // if (firstname.value !== "" && Surname.value !== "" && cellNumber.value !== "" && passWord.value !== "" &&  genValue !== undefined) {
  //     if (passWord.value.length < 8) return alert("password should contain 8 characters")
  //     if (cellNumber.value.length != 11) return alert("Phone no not correct")

  //     const userObj = {
  //         firstName: firstname.value,
  //         surName: Surname.value,
  //         mobileNum: cellNumber.value,
  //         password: passWord.value,
  //         dateOfBirth: new Date(`${year.value}-${month.value}-${day.value}`),
  //         gender: genValue,
  //     }
  //     users.push(userObj)
  //     localStorage.setItem('users', JSON.stringify(users))
  createUserWithEmailAndPassword(auth, cellNumber.value, passWord.value)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
          console.log("User signup successfully");
          addUserHandler();
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
}
async function addUserHandler() {
    try {
        console.log("mila gaya")
        const docRef = await addDoc(collection(db, "users"), {
            username: firstname.value,
            email: cellNumber.value

        });
        
    console.log("Document written with ID: ", docRef.id);
    if (docRef.id) {
      console.log("document is saved");
    //   firstname.value = "";
    //   Surname.value = "";
    //   cellNumber.value = "";
    //   passWord.value = "";
    //   signUpClosed();
    }
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

/////////////////////////////////////////////////////////////

//              Login Funtion

const emailInput = document.getElementById("emailInput");
const passwordInput = document.getElementById("passwordInput");

function loginHandler() {
  console.log(emailInput.value);

//   if (!emailInput.value || !passwordInput.value)
//     return alert("Please write email and password to continue");
//   const userCheck = users.filter((item) => {
//     return item.mobileNum === emailInput.value;
//   });
//   //   console.log(userCheck)
//   if (!userCheck.length)
//     return alert("This user is not registered, kindly create an account first");
//   if (userCheck[0].password == passwordInput.value) {
//     alert("user is logging in");

//     localStorage.setItem("isLoggedInUser", JSON.stringify(userCheck[0]));

//     window.location.href = "./dashboard/index.html";
//   } else {
//     alert("password is incorrect");
//   }
signInWithEmailAndPassword(auth, emailInput.value, passwordInput.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            if(user) {
                window.location.href = './dashboard/index.html'
            }
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorCode)
            console.log(errorMessage)
            
        });
}

login.addEventListener("click", loginHandler);

// Also Enter Button to tun the Login Function

passwordInput.addEventListener("keydown", (a) => {
  if (a.key === "Enter") {
    console.log("je");
    loginHandler();
  }
});
