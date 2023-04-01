//artwork and button population

//global variable definitions
const notPizza = document.querySelector('div.notPizza');
const pizza = document.querySelector('div.pizza');
const menu = document.querySelector('section.menu');

const ingredientList = [];
var buttons = [];

const requestURL = 'https://donkeybong.github.io/pizzabuilder/ingredients_artwork.json';
let ingredientArtwork = [];

//parses artwork json and populates ingredients into individual div elements
function retrieveArt() {

  fetch(requestURL).then(function (response) {

    return response.json();

  }).then(function (obj) {

    let length = ingredientArtwork.length;
    ingredientArtwork[length] = obj;
    console.log(ingredientArtwork);
    populateElements(ingredientArtwork);

  }).catch(function (error) {
    console.error('Something went wrong with retrieving the artwork.');
    console.error(error);
  })
  console.log('retrieval complete');
}

//populates ingredient artworks into individual hidden layered elements
function populateElements(arr) {

  let masterList = arr[0]["projectContents"];
  let ingredientsByClass = [];
  let ingredientInfo = [];
  let classInfo = [];

  //loops through every ingredient class and saves entire class to new array
  for (let i = 0; i < masterList.length; i++) {

    let family = masterList[i];
    ingredientsByClass.push(family);

  }

  console.log(ingredientsByClass);

  //loops through every individual ingredient and class and saves information to new arrays
  for (let j = 0; j < ingredientsByClass.length; j++) {

    let ingredientsOnly = ingredientsByClass[j]["classIngredients"];
    ingredientInfo.push(ingredientsOnly);

    let classesOnly = ingredientsByClass[j]["classType"];
    let classElement = document.createElement('article');
    let classHeader = document.createElement('h3')

    classElement.classList.add(classesOnly);
    classHeader.innerText = classesOnly;

    let classMultiplier = ingredientsOnly.length;
    for (var i = 0; i < classMultiplier; i++) {
      classInfo.push(classesOnly);
    }

    classElement.append(classHeader);
    menu.append(classElement);
  }

  //flattens the array of ingredients
  let flatIngredients = [].concat.apply([], ingredientInfo);
  ingredientList.push(flatIngredients);
  console.log(flatIngredients);

  //loops through flat ingredient array to assign each ingredient a button and a div element containing the image at each defined source
  for (var k = 0; k < flatIngredients.length; k++) {

    const button = document.createElement('span');
    const layer = document.createElement('div');
    const img = document.createElement("img");
    let ingredientZIndex = k;
    let eachIngredient = flatIngredients[k];
    console.log(eachIngredient);
    console.log('elements created');

    makeButton(button);
    makeLayer(layer);
    viewArt(img);
    notPizza.append(layer);
    console.log('elements populated');

    function makeButton() {
      const buttonName = eachIngredient.ingredientName;
      const buttonClass = classInfo[k];
      const buttonArticle = document.querySelector('.' + CSS.escape(buttonClass));

      button.classList.add("button");
      button.id = buttonClass;
      button.innerText = buttonName;

      buttonArticle.append(button);
      buttons.push(button);

      console.log("button created");
    }

    function makeLayer(zIndex) {
      layer.setAttribute("zIndex", ingredientZIndex);
    }

    function viewArt(src, width, height, alt, id) {
      let layerName = eachIngredient.ingredientName;
      let artSource = eachIngredient.ingredientSource;

      img.setAttribute("src", artSource);
      img.setAttribute("width", 300);
      img.setAttribute("height", 300);
      img.setAttribute("alt", layerName);
      img.setAttribute("id", layerName)

      layer.append(img);
      console.log('image filled');
    }
  }
}

//listen for clicks on page
function clickListen() {
  
  document.addEventListener('click', function (evt) {
    
    console.log('heard');
    let clicked = evt.target;
    
    if (clicked.classList.contains('button')) {
      let targetName = evt.target.innerText
      searchForImage(targetName);

    } else {
      evt.preventDefault;
    }
  });
}

//searches array for image source at clicked button
function searchForImage (term) {
  for (let m = 0; m < ingredientList.length; m++) {
    const wholeList = ingredientList[m];
    
    for (let n = 0; n < wholeList.length; n++) {
      const ingredient = wholeList[n];
      let type = ingredient.ingredientName;

      if (type === term) {
        putOnPizza(type);
      }
    }
  }
}

function putOnPizza(choice) {
  let addition = document.getElementById(choice);
  let button = document.querySelector('.button');
  if (pizza.contains(addition)) {
    takeOffPizza(choice);
  } else {
    notPizza.removeChild(addition);
    pizza.append(addition);
    button.classList.add('selected');
  }
}

function takeOffPizza(choice) {
  let removal = document.getElementById(choice);
  let button = document.querySelector('.button');
  pizza.removeChild(removal);
  notPizza.append(removal);
  button.classList.remove('selected');
}


retrieveArt();
clickListen();
