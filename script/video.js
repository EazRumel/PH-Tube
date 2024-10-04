function getTimeString(time){
  const hour = parseInt(time / 3600)
  let remainingSecond = parseInt(time % 3600)
  const minute = (remainingSecond % 60)
  remainingSecond = parseInt(remainingSecond % 60)
  return `${hour} hour ${minute} minute ${remainingSecond} seconds ago`
}
const removeActiveClass = () => {
 const buttons = document.getElementsByClassName('category-btn')
 for(let btn of buttons)
  btn.classList.remove('active')
}
//1 - Fetch, Load and show categories on html
//create load categories
const loadCategories = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
  .then((response) => response.json())
  .then((data) => displayCategories(data.categories))
  .catch((error) => console.log(error))
}
const loadCategoryVideos = (id) =>{

  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then((response) => response.json())
  .then((data) => {
     removeActiveClass()
    const activeBtn = document.getElementById(`btn-${id}`);
    activeBtn.classList.add('active');
  })
  .catch((error) => console.log(error))
} 
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById('categories')
  categories.forEach((item) => {
    console.log(item)
    //create a button
    const buttonContainer = document.createElement('div');
    buttonContainer.innerHTML = `
    <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">${item.category}
    </button>`
    categoryContainer.append(buttonContainer);
  })
 }
const loadVideos = (searchText = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
  .then((response) => response.json())
  .then((data) => displayVideos(data.videos))
  .catch((error) => console.log(error))
}
 const displayVideos = (videos) => {
  const videoContainer = document.getElementById('videos')
  videoContainer.innerHTML = ""
 if(videos.length === 0){
  videoContainer.classList.remove('grid')
  videoContainer.innerHTML = `<div class="min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
  <img src="assets/icon.png"/>
  <h2 class="font-bold text-center text-5xl">No content is here in this category</h2>
  </div>`
  return
 }
 else{
  videoContainer.classList.add('grid')
  
 };
 //Load Details
 const loadDetails = async(videoId) => {
  const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoid}`
  const response = await fetch(uri)
  const data = await response.json()
  displayDetails(data.video)
 } 
//display details
const displayDetails = (video) =>{
  console.log(video);
  const detailContainer = document.getElementById('modal-content')
  detailContainer.innerHTML = `<img src = '${video.thumbnail}'/>
  <p>${video.description}</p>`
  document.getElementById('showModalData').click();
  //alternate way to do the same thing 
  /**
   document.getElementById('customModal').showModal();
   */
}
  videos.forEach((video) => {
  console.log(video)
  const card = document.createElement('div');
  card.classList = 'card card-compact'
  card.innerHTML = `
  <figure class="h-[200px] relative">
    <img
    class="h-full w-full object-cover"
      src="${video.thumbnail}"
      alt="Shoes" />
      ${video.others.posted_date?.length === 0 ? "" : `<span class="absolute text-xs right-2 bottom-2 bg-black text-white rounded p-1">${getTimeString(video.others.posted_date)}</span>`}
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img class="w-10 h-10 rounded-full object-cover" src = "${video.authors[0].profile_picture}"/>
    </div>
    <div>
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex items-center gap-2">
    <p class="text-gray-400" src="">${video.authors[0].profile_name}</p>
    ${video.authors[0].verified === true ? `<img class="w-5" src ="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>` : ""}
    </div>
    
    <p>
    <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn btn-error">Details</button>
    </p>
    </div>
  </div>`;
  videoContainer.append(card);
  })
 }
 //call functions
 document.getElementById('search-input').addEventListener("keyup",(e) => {
  loadVideos(e.target.value)
 })
 loadCategories()
 loadVideos()
  