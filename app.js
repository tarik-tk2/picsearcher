

const imagesArea = document.querySelector('.images');
const gallery = document.querySelector('.gallery');
const galleryHeader = document.querySelector('.gallery-header');
const searchBtn = document.getElementById('search-btn');
const sliderBtn = document.getElementById('create-slider');
const sliderContainer = document.getElementById('sliders');
// selected image 
let sliders = [];

 
// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = '15674931-a9d714b6e9d654524df198e00&q';
const flower=document.getElementById("flower");
flower.addEventListener('click',function(){
buttonSearch("flower")
})
book.addEventListener('click',function(){
buttonSearch("book")
})
river.addEventListener('click',function(){
buttonSearch("river")
})
summer.addEventListener('click',function(){
buttonSearch("summer")
})
nature.addEventListener('click',function(){
buttonSearch("nature")
})
environment.addEventListener('click',function(){
buttonSearch("environment")
})

 function buttonSearch(param){
   document.getElementById('duration').style.border = '2px solid blue';
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(param)
  sliders.length = 0;
  search.value=" ";
 }
// show images 
const showImages = (images) => {

  imagesArea.style.display = 'block';
  gallery.innerHTML = '';
  // show gallery title
  galleryHeader.style.display = 'flex';

  images.forEach(image => {
 
    let div = document.createElement('div');
    div.className = 'col-lg-3 col-md-4 col-xs-6 img-item mb-2';
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div)
  })
 toggle();
}

const getImages = (query) => {
 toggle();
  fetch(`https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`)
    .then(response => response.json())
    .then(data => showImages(data.hits))

    .catch(err => console.log(err))
  //  console.log(data.hitS) ;
}

let slideIndex = 0;

const selectItem = (event, img) => {
  let element = event.target;
  
  element.classList.add('added');
  let item = sliders.indexOf(img);

  if (item === -1) {
   
    sliders.push(img);
    console.log(sliders)
   
  }if(item>=0){
    element.classList.remove('added')
    sliders.splice(sliders.indexOf(img),1)
      
  }
  //
  console.log(sliders)
 
}
 
var timer
const createSlider = () => {
  // check slider image length
  if (sliders.length < 2) {
    alert('Select at least 2 image.')
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = '';
  const prevNext = document.createElement('div');
  prevNext.className = "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext)
  document.querySelector('.main').style.display = 'block';
  // hide image aria
imagesArea.style.display = 'none';
  
  const time = document.getElementById('duration').value||1000;
  let duration=0;
 
   if(time<0){
   alert('Please enter valid DURATION number!!!')
   document.getElementById('duration').style.border = '2px solid red';
    const search = document.getElementById('search');
  
  getImages(search.value)
  sliders.length = 0;
 
 
  }else{
duration=time;

  }
 
 
  sliders.forEach(slide => {
    let item = document.createElement('div')
    item.className = "slider-item";
    item.innerHTML = `
   
    <img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item)
  })
  changeSlide(0)
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, duration);
 document.getElementById('duration').value=" ";
}

// change slider index 
const changeItem = index => {
  changeSlide(slideIndex += index);
}

// change slide item
const changeSlide = (index) => {

  const items = document.querySelectorAll('.slider-item');
  if (index < 0) {
    slideIndex = items.length - 1
    index = slideIndex;
  };

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach(item => {
    item.style.display = "none"
  })

  items[index].style.display = "block"
}


 function getSlider(){
   document.getElementById('duration').style.border = '2px solid blue';
  document.querySelector('.main').style.display = 'none';
  clearInterval(timer);
  const search = document.getElementById('search');
  getImages(search.value)
  sliders.length = 0;
  search.value=" ";
  }
// keypress
document.addEventListener("keypress",function(e){
 if(e.keyCode==13){
getSlider()
 }
})
//  button click press
searchBtn.addEventListener('click', function () {
getSlider();

})

sliderBtn.addEventListener('click', function () {
  
  createSlider();
  
})

 function toggle(){
   const spinner= document.getElementById("spinner-loading");
    spinner.classList.toggle('d-none');
 }


