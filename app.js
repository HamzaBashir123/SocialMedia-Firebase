import { auth,db ,setDoc ,doc, createUserWithEmailAndPassword, signInWithEmailAndPassword} from './firebase.Config.js'



const brigth = document.querySelector(".brigth");
const crossIcon = document.querySelector(".crossIcon");
const createPage = document.querySelector(".createPage");
const CreateAccount = document.querySelector(".CreateAccount");
const login = document.querySelector(".login");




function showPass() {
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
}
window.showPass = showPass;
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
let genValue;

signUp.addEventListener("click", signUpHandler);

//          Sign Up function
 
function signUpHandler() {
  
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
          console.log(user ,"User signup successfully");
          console.log(user.uid)
          addUserHandler(user.uid);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
     alert(errorCode)
    });
}

async function addUserHandler(uid) {
    try {
        console.log(uid ,"mila gaya")
         await setDoc(doc(db, "users",uid), {
            username: firstname.value,
            surname : Surname.value,
            email: cellNumber.value,
            dateOfBirth: new Date(`${year.value}-${month.value}-${day.value}`),
            gender: genValue,

            

        });
      alert("SignUp Successfully")
      firstname.value = "";
      Surname.value = "";
      cellNumber.value = "";
      passWord.value = "";
      signUpClosed();
    
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
