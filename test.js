//artwork and button population

//global variables

const notPizza = document.querySelector('div.notPizza');
const pizza = document.querySelector('div.pizza');
const menu = document.querySelector('section.menu');

const ingredientList = [];
var buttons = [];

const requestURL = 'https://donkeybong.github.io/pizzabuilder/ingredients_artwork.json';
let ingredientArtwork = [];

//parses artwork json into master array
function retrieveArt(url) {

    fetch(url).then(function (response) {
  
      return response.json();
  
    }).then(function (obj) {
  
      let length = ingredientArtwork.length;
      ingredientArtwork[length] = obj;
      console.log(ingredientArtwork);
  
    }).catch(function (error) {
      console.error('Something went wrong with retrieving the artwork.');
      console.error(error);
    })
    console.log('retrieval complete');
}

//populates layers with ingredient information
function populateElements(arr) {
    let masterList = arr[0]["projectContents"];
    let ingredientsByClass = [];
    let ingredientInfo = [];
    let classInfo = [];

    for (let i = 0; i < masterList.length; i++) {
        let family = masterList[i];
        ingredientsByClass.push(family);
    }
    
}

retrieveArt(requestURL);
populateElements(ingredientArtwork);