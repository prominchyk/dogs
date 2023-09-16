'use strict';

import arrBreeds from './breeds.js';
import shuffleElements from './functions.js';

 let getRandomPhotoButton = document.querySelector('#getRandomPhotoButton');
 let getPhotoByBreedButton = document.querySelector('#getPhotoByBreedButton');
 let getPhotoForTestButton = document.querySelector('#getPhotoForTestButton');
 let photoDog = document.querySelector('#photoDog');
 let breedDogName = document.querySelector('#breedDogName');
 let breedSelect = document.querySelector('#menu select');
 let testVariantsText = document.querySelectorAll('#dogTest span');
 let dogTest = document.querySelector('#dogTest');
 let radios = document.querySelectorAll('[name = radioDodBreed]');

 getRandomPhotoButton.addEventListener('click', function() {
  this.disabled = true;
   fetch('https://dog.ceo/api/breeds/image/random').then(response => {
    if(response.ok) {
      return response.json();
    } else {
      throw new Error('Вибачте, сталася помилка. Спробуйте ще раз через деякий час.');
    }
   }).then(data => {
    photoDog.innerHTML = '';
    breedDogName.style.display = 'block';
    dogTest.style.display = 'none';
    let img = new Image;
    let url = new URL(data.message);
    img.src = data.message; 
    img.style.width = '100%';
    img.addEventListener('load', function() {
        photoDog.append(img);
    })
    img.addEventListener('error', function() {
      alert('Помилка завантаження фото! Спробуйте ще раз.');
    })
    let dogBreed = url.pathname.split('/')[2];
    if(dogBreed === 'mix') {
      throw new Error('Помилка завантаження фото! Спробуйте ще раз.');
    }
    for(let elem of arrBreeds) {
      if(elem.url === dogBreed) {
        breedDogName.textContent = elem.ua;
      }
    }
    this.disabled = false;
   }).catch(error => alert(error));
 })
 
 let urlSelected = 'akita';
 let breedSelected = '';
 let arrBreedsUa = [];
 for(let elem of arrBreeds) {
  arrBreedsUa.push(elem.ua);
 }
arrBreedsUa.sort();

for(let i = 0; i < arrBreeds.length; i++) {
  let option = new Option;
  option.textContent = arrBreedsUa[i];
  if(option.textContent === 'МІКС') {
    continue;
  }
  breedSelect.append(option);
}

let options = document.querySelectorAll('option');
breedSelect.addEventListener('change', function() {
  for(let option of options) {
    if(option.selected) {
      breedSelected = option.textContent;
    }
    for(let elem of arrBreeds) {
      if(elem.ua === breedSelected) {
        urlSelected = elem.forRequest;
      }
    }
  }
})
  

 getPhotoByBreedButton.addEventListener('click', function() {
  this.disabled = true;
   fetch('https://dog.ceo/api/breed/' + urlSelected + '/images/random').then(response => {
    if(response.ok) {
      return response.json();
    } else {
      throw new Error('Вибачте, сталася помилка. Спробуйте ще раз через деякий час.');
    }
   }).then(data => {
    photoDog.innerHTML = '';
    breedDogName.style.display = 'block';
    dogTest.style.display = 'none';
    let img = new Image;
    let url = new URL(data.message);
    img.src = data.message;
    img.style.width = '100%';
    img.addEventListener('load', function() {
        photoDog.append(img);
    })
    img.addEventListener('error', function() {
      alert('Помилка завантаження фото! Спробуйте ще раз.');
    })
    let dogBreed = url.pathname.split('/')[2];
    for(let elem of arrBreeds) {
      if(elem.url === dogBreed) {
        breedDogName.textContent = elem.ua;
      }
    }
    this.disabled = false;
   }).catch(error => alert(error));
 })

 getPhotoForTestButton.addEventListener('click', function() {
  this.disabled = true;
   fetch('https://dog.ceo/api/breeds/image/random').then(response => {
    if(response.ok) {
      return response.json();
    } else {
      throw new Error('Вибачте, сталася помилка. Спробуйте ще раз через деякий час.');
    }
   }).then(data => {
    photoDog.innerHTML = '';
    breedDogName.style.display = 'none';
    dogTest.style.display = 'block';
    let img = new Image;
    let url = new URL(data.message);
    img.src = data.message; 
    img.style.width = '100%';
    img.addEventListener('load', function() {
        photoDog.append(img);
    })
    img.addEventListener('error', function() {
      alert('Помилка завантаження фото! Спробуйте ще раз.');
    })
    let dogBreed = url.pathname.split('/')[2];
    let rightBreed = '';
    if(dogBreed === 'mix') {
      throw new Error('Помилка завантаження фото! Спробуйте ще раз.');
    }
    let testVariantsArr = [];
    let randomBreedIndex = function() {
      return Math.floor(Math.random() * arrBreeds.length);
    }
    for(let elem of arrBreeds) {
      if(elem.url === dogBreed) {
        testVariantsArr.push(elem.ua);
        rightBreed = elem.ua;
      }
    }
    while(testVariantsArr.length < 3) {
      let randomBreed = arrBreeds[randomBreedIndex()].ua;
      if(!testVariantsArr.includes(randomBreed) || randomBreed !== 'МІКС') {
        testVariantsArr.push(randomBreed);
      }
    }
    shuffleElements(testVariantsArr);
    for(let i = 0; i < testVariantsText.length; i++) {
      testVariantsText[i].textContent = testVariantsArr[i];
    }
    for(let radio of radios) {
      radio.checked = false;
      radio.nextElementSibling.style.backgroundColor = 'rgb(245, 245, 237)';
      radio.addEventListener('change', function() {
        let selectedBreed = radio.nextElementSibling;
        if(selectedBreed.textContent === rightBreed) {
          selectedBreed.style.backgroundColor = 'rgba(0, 128, 0, 0.6)';
        } else {
          selectedBreed.style.backgroundColor = 'rgba(255, 0, 0, 0.6)';
        }
      })
    }
    this.disabled = false;
   }).catch(error => alert(error));
 })

 


