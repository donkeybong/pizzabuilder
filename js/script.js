//artwork and button population

//global variable definitions
const notPizza = document.querySelector('div.notPizza');
const pizza = document.querySelector('div.pizza');
const menu = document.querySelector('section.menu');

const ingredientList = [];
let buttons = [];

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

    let ingredientZIndex = k;
    let eachIngredient = flatIngredients[k];
    const button = document.createElement('span');
    const layer = document.createElement('div');
    const img = document.createElement("img");
    console.log(eachIngredient);
    console.log('elements created');

    makeButton(button);
    viewArt(img);
    notPizza.append(layer);
    console.log('elements populated');

    function viewArt(src, width, height, alt) {
      const layerName = eachIngredient.ingredientName;
      img.src = eachIngredient.ingredientSource;
      layer.id = layerName;

      img.width = 40;
      img.height = 80;
      img.alt = 'Our mistake! Image will not load.';
      img.style.zIndex = ingredientZIndex;

      layer.append(img);
      console.log('image filled');
    }

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
  }
}

//loop through buttons to add click listener to each one
function listenForClicks() {

  console.log(buttons);

  for (var l = 0; l < buttons.length; l++) {
    let eachButton = buttons[i];
    console.log(eachButton);
    eachButton.addEventListener(click, unhideFood);
    console.log('listening');
  }
}

//unhides element with corresponding ingredient
function unhideFood() {

  console.log('heard');

  let type = span.innerText;
  let foundIngredient = ingredientList.find(checkIngredient);
  pizza.append(foundIngredient);

  function checkIngredient(ingredient) {
    return id = type;
  }
}

//function calls
retrieveArt();
listenForClicks();
