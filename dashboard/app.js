import {
  auth,
  db,
  doc,
  getDoc,
  onAuthStateChanged,
  signOut,
  setDoc,
  addDoc,
  collection,
  getDocs,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteDoc,
  updateDoc,
} from "../firebase.Config.js";

let logout = document.querySelector(".logout");
let leftDiv = document.querySelector(".leftDiv");
let rightDiv = document.querySelector(".rightDiv");
let placeholderName = document.querySelector(".placeholderName");
let porfilePage = document.querySelector(".porfilePage");
let homePage = document.querySelector(".homePage");
let postBtm = document.querySelector(".postBtm");
let home = document.querySelector(".home");
let allUsers = document.querySelector(".allUsers");

allUsers.addEventListener("click", () => {
  window.location.href = "../usersPage/usersPage.html";
});
home.addEventListener("click", () => {
  window.location.href = "./index.html";
});

const postDiv = document.querySelector(".postDiv");
getPosts();

postBtm.addEventListener("click", postHandler);
let currentLoggedInUser;
let profilePicLocal;
let editPostFlag = false;
let postIdGlobal;

//                     Authentication code

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    console.log(uid);
    getUserData(uid);
    currentLoggedInUser = uid;
    // ...
  } else {
    // User is signed out
    console.log("sign out");
    window.location.href = "..index.html";
  }
});

//                     Get Data code

async function getUserData(uid) {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log("Document data:", docSnap.data());
      const {
        username,
        surname: firebaseSurname,
        profilePicture,
      } = docSnap.data();

      profilePicLocal = profilePicture;

      leftCreateData(username, firebaseSurname, profilePicture);
      placeholderNameSet(username, firebaseSurname, profilePicture);
      // userNameHTML.textContent = userName
      // emailAddressHTML.textContent = email
      // mobNumHTML.textContent = phNum
      // firstNameHTML.textContent = firstName
      // lastNameHTML.textContent = lastName
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.log(error, "==>>error in get User Data");
  }
}

//                     LogoutHandler code

const logoutHandler = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      // console.log("signout successfully")
      window.location.href = "../index.html";
    })
    .catch((error) => {
      // An error happened.
      console.log(error);
    });
};

logout.addEventListener("click", logoutHandler);

//                     placeholder Name set code

function placeholderNameSet(username, firebaseSurname, profilePicture) {
  username =
    username.slice(0, 1).toUpperCase() + username.slice(1).toLowerCase();
  firebaseSurname =
    firebaseSurname.slice(0, 1).toUpperCase() +
    firebaseSurname.slice(1).toLowerCase();

  document.querySelector(
    ".placeholderName"
  ).placeholder = `What's on your mind, ${username} ${firebaseSurname}`;
  document.querySelector(".centerProfilepic").src = profilePicture;
}

porfilePage.addEventListener("click", () => {
  window.location.href = "../EditPage/usersPage.html";
});
homePage.addEventListener("click", () => {
  window.location.href = "../dashboard/index.html";
});

//                     left sites  Name and pic create code

function leftCreateData(firstName, firebaseSurname, profilePicture) {
  firstName =
    firstName.slice(0, 1).toUpperCase() + firstName.slice(1).toLowerCase();
  firebaseSurname =
    firebaseSurname.slice(0, 1).toUpperCase() +
    firebaseSurname.slice(1).toLowerCase();
  // console.log(profilePicture);
  const objLeftDiv = [
    {
      img: `${profilePicture != "undefined" ? profilePicture : "profile.png"} `,
      text: `${firstName} ${firebaseSurname}`,
    },
    { img: "friemds.png", text: "Friends" },
    { img: "recent.png", text: "Feeds (Most Recent)" },
    { img: "group.png", text: "Groups" },
    { img: "market.png", text: "Marketplace" },
    { img: "watch.png", text: "Watch" },
    { img: "memories.png", text: "Memories" },
    { img: "saved.png", text: "Saved" },
    { img: "pages.png", text: "Pages" },
    { img: "addCenter.png", text: "Ad Center" },
    { img: "graph.png", text: "Ads Manager" },
  ];

  const leftData = objLeftDiv.map((item, index) => {
    return `  <div class="itemImgName">
    <img class="leftItemImg${index}" src="./assset/${item.img}" alt="Please update your Profile Picture" style="height: 40px; width: 40px; font-weight:bold;">
    <p>${item.text}</p>
</div>`;
  });
  leftDiv.innerHTML = leftData.join("");

  const profileImgGet = document.querySelector(".leftItemImg0");
  profileImgGet.src = profilePicture;
}

//                     right sites  Name and pic create code

const objRightData = [
  { img: `profile.png`, text: "Faryan Ahmed" },
  { img: `profile.png`, text: "Muhammad Bilal" },
  { img: `profile.png`, text: "Muhammad Shaban" },
  { img: `profile.png`, text: "Muhammad shafeeq" },
  { img: `profile.png`, text: "Muhammad Shayan" },
  { img: `profile.png`, text: "Imran Shaikh" },
  { img: `profile.png`, text: "Usama Ikram" },
  { img: `profile.png`, text: "Moiz Rasheed" },
  { img: `profile.png`, text: "Muhammad Saif" },
  { img: `profile.png`, text: "Ali Ahmy" },
  { img: `profile.png`, text: "Hammad Shah" },
  { img: `profile.png`, text: "Muhammad Ashhad" },
  { img: `profile.png`, text: "Muhammad Reyyan" },
  { img: `profile.png`, text: "Muhammad Nabeel" },
  { img: `profile.png`, text: "Ubaid Ur Rehman" },
  { img: `profile.png`, text: "Yasir Hussain" },
];

const rightData = objRightData.map((item) => {
  return `<div class="itemImgName">
      <img src="./assset/${item.img}" alt="" style="height: 40px; width: 40px; font-weight:bold;">
      <p>${item.text}</p>
      <div class="onlineActive"></div>
  </div>`;
});
rightDiv.innerHTML = rightData.join("");

placeholderName.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    postHandler();
  }
});

const uploadPic = document.querySelector(".uploadPic");

async function postHandler() {
  let file = uploadPic.files[0];
  console.log(file);
  file ? file : alert("Please select the picture");

  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, "Post/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log("File available at", downloadURL);
        // console.log(placeholderName.value)
        try {
          const response = await addDoc(collection(db, "posts"), {
            postContent: placeholderName.value,
            authorId: currentLoggedInUser,
            postImageUrl: downloadURL,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
          });

          // console.log(response.id)
          getPosts();
          placeholderName.value = "";
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      });
    }
  );
}

async function getPosts() {
  postDiv.innerHTML = "";
  const querySnapshot = await getDocs(collection(db, "posts"));

  querySnapshot.forEach(async (doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    let postId = doc.id;
    const { authorId, postContent, date, time, postImageUrl } = doc.data();
    // console.log(doc.id ,"=====> post Id " )
    // console.log(postContent ,"=====> post content ")

    let { username, surname, profilePicture } = await getAuthorData(authorId);
    username =
      username.slice(0, 1).toUpperCase() + username.slice(1).toLowerCase();
    surname =
      surname.slice(0, 1).toUpperCase() + surname.slice(1).toLowerCase();

    // console.log(authorDetails)

    var div1 = document.createElement("div");
    div1.setAttribute("class", "appendDiv");
    div1.innerHTML = `<div class="postDivUpper">
    <div class="d-flex">
      <div class="postProfileImg">
        <img class="postPic" src=${
          profilePicture || "./assset/profile.png"
        } alt="" />
      </div>
    <div class="postNameDateTime">
      <h4 class="ProfileName">${username} ${surname}</h4>
      <span>${date}</span><span> at</span>
      <span>${time}</span>
    </div>
  </div>
  <div class="postDivEditDelete">
    <img onclick="editPostHandler('${postId}')" class="postEditButton" src="./assset/edit1.png" alt="" />
    <img onclick="deletePostHandler('${postId}')" src="./assset/cross.png" alt="" />
  </div>
</div>
<h6 class="m-3 text-white">${postContent}</h6>
<div class="postDivImg">
  <img class="postImg" src= ${postImageUrl || "./assset/postPic.jpg"} alt="">
</div>
<div class="likeLogoCounterComment d-flex justify-content-between">
  <div class="d-flex">
    <img class="m-1" src="./assset/like.png" alt="" style="width: 20px ; height: 20px;" >
    <h6 class="text-white">1</h6>
  </div>
  <div class="d-flex text-white">
    <h6 class="text-white"> 1 </h6>&ThinSpace;
    <span>comment</span>&ThinSpace;
    <span>.</span>&ThinSpace;
    <h6>2</h6>&ThinSpace;
    <span>reposts</span>

  </div>
</div>
<div class="d-flex justify-content-evenly text-white my-4 commentBox">
  <div><img src="./assset/likeShow.png" alt="" style="width: 30px ; height: 30px;">&ThinSpace;Like</div>
  <div><img src="./assset/comment.png" alt="" style="width: 30px ; height: 30px;">&ThinSpace;Comment</div>
  <div><img src="./assset/repost.png" alt="" style="width: 30px ; height: 30px;">&ThinSpace;Repost</div>
  <div><img src="./assset/send.png" alt="" style="width: 30px ; height: 30px;">&ThinSpace;Send</div>

</div>
<div class="postCommentLastDiv">
  <img src=" ${profilePicLocal} || ./assset/profile.png" alt="" />
  <input type="text" placeholder="Write a comment..." />
  <button>Post</button>
</div>
`;
    postDiv.appendChild(div1);

    placeholderName.value = "";
  });
}

//      ////////////                      Delete Post           ////////////////////

async function deletePostHandler(postId) {
  console.log("delete funtion chal gaya");
  console.log(postId, "delete button working properly");

  await deleteDoc(doc(db, "posts", postId));

  alert("Your post deleted successfully");
  getPosts();
}

window.deletePostHandler = deletePostHandler;

//      ////////////                      Edit Post           ////////////////////
const textArea = document.querySelector(".textArea");
const popUPCapturefullScreen = document.querySelector(
  ".popUPCapturefullScreen"
);
const popUpButton = document.querySelector(".popUpButton");
const postImageChange = document.querySelector(".postImageChange");
const uploadPopUpPic = document.querySelector("#pop_image");
const popUpCross = document.querySelector(".popUpCross");

popUpCross.addEventListener("click", () => {
  popUPCapturefullScreen.style.display = "none";
});

uploadPopUpPic.addEventListener("change", () => {
  const file = uploadPopUpPic.files[0];
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };

  // Upload file and metadata to the object 'images/mountains.jpg'
  const storageRef = ref(storage, "images/" + file.name);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        // ...

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
        console.log("File available at", downloadURL);
        postImageChange.src = downloadURL;
        async function updateData() {
          try {
            const washingtonRef = doc(db, "posts", postIdGlobal);
            const response = await updateDoc(washingtonRef, {
              postContent: textArea.value,
              authorId: currentLoggedInUser,
              postImageUrl: downloadURL,
            });

            // await updateDoc(washingtonRef, {
            //     postContent: "kuch bhi"
            // });

            // console.log(response.id)
            getPosts();
            popUPCapturefullScreen.style.display = "none";
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
        window.updateData = updateData;
      });
    }
  );
});

console.log(textArea.value);
async function editPostHandler(postId) {
  console.log(postId, "edit button working properly");
  popUPCapturefullScreen.style.display = "block";
  const docRef = doc(db, "posts", postId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const { postContent, postImageUrl } = docSnap.data();
    textArea.innerHTML = postContent;
    postImageChange.src = postImageUrl;
    postIdGlobal = postId;
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

window.editPostHandler = editPostHandler;

async function getAuthorData(authorUid) {
  // console.log(authorUid, "==>>authorUid")

  const docRef = doc(db, "users", authorUid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
}

// ////////////////////
