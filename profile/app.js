const isLoggedInUser = JSON.parse(localStorage.getItem("isLoggedInUser"));

let logout = document.querySelector(".logout");
let leftDiv = document.querySelector(".leftDiv");
let rightDiv = document.querySelector(".rightDiv");
let placeholderName = document.querySelector(".placeholderName");
let porfilePage = document.querySelector(".porfilePage");
let homePage = document.querySelector(".homePage");


const postDiv = document.querySelector(".postDiv");

// const [first, last] = [isLoggedInUser.firstName, isLoggedInUser.surName];
// const firstName =
//   first.slice(0, 1).toUpperCase() + first.slice(1).toLowerCase();
// const lastName = last.slice(0, 1).toUpperCase() + last.slice(1).toLowerCase();


porfilePage.addEventListener('click',()=>{
   window.location.href = "#"
   porfilePage.style.backgroundColor = 'black'
})
homePage.addEventListener('click',()=>{
   window.location.href = "../dashboard/index.html"
})

logout.addEventListener("click", () => {
  window.location.href = "../index.html";
});

if (!isLoggedInUser) {
  window.location.href = "../index.html";
}

const objLeftDiv = [
  { img: `profile.png`, text: `${firstName} ${lastName}` },
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

const leftData = objLeftDiv.map((item) => {
  return `  <div class="itemImgName">
    <img src="./assset/${item.img}" alt="" style="height: 40px; width: 40px; font-weight:bold;">
    <p>${item.text}</p>
</div>`;
});
leftDiv.innerHTML = leftData.join("");

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

// Profile Name Change

const posts = JSON.parse(localStorage.getItem("posts")) || [];


posts.filter((post) => post.userNumber === isLoggedInUser.mobileNum).forEach((post) => {
  var div1 = document.createElement("div");
  div1.setAttribute('class', 'appendDiv')
  div1.innerHTML = `<div class="postDivUpper">
  <div class="d-flex">
    <div class="postProfileImg">
      <img src="./assset/profile.png" alt="" />
    </div>
    <div class="postNameDateTime">
      <h4 class="ProfileName">${post.userName}</h4>
      <span>${post.date}</span><span> at</span>
      <span>${post.time}</span>
    </div>
  </div>
  <div class="postDivEditDelete">
    <img src="./assset/3Dots.png" alt="" />
    <img src="./assset/cross.png" alt="" />
  </div>
</div>
<h6 class="m-3 text-white">${post.postContent}</h6>
<div class="postDivImg">
  <img class="postImg" src="./assset/postPic.jpg" alt="">
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
  <img src="./assset/profile.png" alt="" />
  <input type="text" placeholder="Write a comment..." />
  <button>Post</button>
</div>
`;
postDiv.prepend(div1)

})
// document.querySelector('.ProfileName').innerHTML = `${firstName} ${lastName}`;
document.querySelector(
  ".placeholderName"
).placeholder = `What's on your mind, ${firstName} ${lastName}`;



placeholderName.addEventListener('keypress',(e)=>{
if(e.key === 'Enter'){
  postHandler()

}

})

function postHandler() {
  var div1 = document.createElement("div");
  div1.setAttribute('class', 'appendDiv')
  div1.innerHTML = `<div class="postDivUpper">
  <div class="d-flex">
    <div class="postProfileImg">
      <img src="./assset/profile.png" alt="" />
    </div>
    <div class="postNameDateTime">
      <h4 class="ProfileName">${firstName} ${lastName}</h4>
      <span>${new Date().toLocaleDateString()}</span><span> at</span>
      <span>${new Date().toLocaleTimeString()}</span>
    </div>
  </div>
  <div class="postDivEditDelete">
    <img src="./assset/3Dots.png" alt="" />
    <img src="./assset/cross.png" alt="" />
  </div>
</div>
<h6 class="m-3 text-white">${placeholderName.value}</h6>
<div class="postDivImg">
  <img class="postImg" src="./assset/postPic.jpg" alt="">
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
  <img src="./assset/profile.png" alt="" />
  <input type="text" placeholder="Write a comment..." />
  <button>Post</button>
</div>
`;
postDiv.prepend(div1)

const postObj = {
  userName: `${firstName} ${lastName}`,
  userNumber: isLoggedInUser.mobileNum,
  postContent: placeholderName.value,
  date: new Date().toLocaleDateString(),
  time: new Date().toLocaleTimeString()
}

posts.push(postObj)

localStorage.setItem('posts', JSON.stringify(posts))

placeholderName.value = "";
}
