function getProductDetails() {
  productDetails = {};
  productDetails["carrots"] = {};
  productDetails["carrots"]["image"] = "carrots-table_popidar-ss.jpg";
  productDetails["carrots"]["name"] = "Carrots (100g)";
  productDetails["carrots"]["description"] = "100g loose Carrots. Keep refrigerated";
  productDetails["carrots"]["units"] = "1kg";
  productDetails["carrots"]["price"] = 0.99;

  productDetails["bananas"] = {};
  productDetails["bananas"]["image"] = "bananas.jpg";
  productDetails["bananas"]["name"] = "Bananas (100g)";
  productDetails["bananas"]["description"] = "100g loose Bananas. Store in cool dry place";
  productDetails["bananas"]["units"] = "500g";
  productDetails["bananas"]["price"] = 1.29;

  productDetails["coconut"] = {};
  productDetails["coconut"]["image"] = "coconut.jpg";
  productDetails["coconut"]["name"] = "Coconut (100g)";
  productDetails["coconut"]["description"] = "100g of Coconuts Produce of Ivory Coast";
  productDetails["coconut"]["units"] = "1";
  productDetails["coconut"]["price"] = 2.99;

  productDetails["apples"] = {};
  productDetails["apples"]["image"] = "apples.jpg";
  productDetails["apples"]["name"] = "Apples (100g)";
  productDetails["apples"]["description"] = "100g Pink Lady Apples. Store in cool dry place";
  productDetails["apples"]["units"] = "1kg";
  productDetails["apples"]["price"] = 1.49;

  productDetails["cherries"] = {};
  productDetails["cherries"]["image"] = "cherries.jpg";
  productDetails["cherries"]["name"] = "Cherries (100g)";
  productDetails["cherries"]["description"] = "100g Cherries. Keep refrigerated";
  productDetails["cherries"]["units"] = "500g";
  productDetails["cherries"]["price"] = 1.99;

  productDetails["tomatoes"] = {};
  productDetails["tomatoes"]["image"] = "tomatos.jpg";
  productDetails["tomatoes"]["name"] = "Tomatoes (100g)";
  productDetails["tomatoes"]["description"] = "100g Tomatoes. Keep refrigerated";
  productDetails["tomatoes"]["units"] = "500g";
  productDetails["tomatoes"]["price"] = 1.99;

  productDetails["potatoes"] = {};
  productDetails["potatoes"]["image"] = "potatoes.jpg";
  productDetails["potatoes"]["name"] = "Potatoes (100g)";
  productDetails["potatoes"]["description"] = "100g Potatoes. Store in cool dry place";
  productDetails["potatoes"]["units"] = "1kg";
  productDetails["potatoes"]["price"] = 0.99;

  productDetails["beans"] = {};
  productDetails["beans"]["image"] = "beans.jpg";
  productDetails["beans"]["name"] = "Beans (100g)";
  productDetails["beans"]["description"] = "100g Green Beans. Keep refrigerated";
  productDetails["beans"]["units"] = "1kg";
  productDetails["beans"]["price"] = 1.29;

  return productDetails;
}

function getProductList() {
  var products = [];
  var productDetails = getProductDetails();

  for (var key in productDetails) {
    products.push(key);
  }

  return products;
}

function getProductQuantity(product) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + product + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function readBasket() {
  var basket = {};
  products = getProductList();
  var productcount = products.length;
  for (var i = 0; i < productcount; i++) {
    basket[products[i]] = getProductQuantity(products[i]);
  }

  return basket;
}

function calculateTotals() {
  var basket = readBasket();
  var productDetails = getProductDetails();

  total = 0;
  for (var product in basket) {
    total += parseInt(basket[product]) * parseFloat(productDetails[product]["price"]);
  }

  totals = {};
  totals["total"] = total.toString();
  totals["vat"] = (total - total / 1.175).toString();
  totals["totalnovat"] = (total / 1.175).toString();

  return totals;
}

function addToBasket(product, quantity) {
  if (document.cookie.indexOf(product) == -1) {
    createEmptyBasket();
  }

  oldquantity = parseInt(getProductQuantity(product));
  newquantity = oldquantity + parseInt(quantity);

  document.cookie = product + "=" + newquantity.toString() + ";path=/";
}

function removeProductFromBasket(product) {
  document.cookie = product + "=0;path=/";
}

function changeProductQuantity(product, newquantity) {
  document.cookie = product + "=" + newquantity.toString() + ";path=/";
}

function createEmptyBasket() {
  products = getProductList();
  var productcount = products.length;
  for (var i = 0; i < productcount; i++) {
    document.cookie = products[i] + "=0;path=/";
  }
}

function createEmptyOrder() {
  document.cookie = "title=;path=/";
  document.cookie = "firstname=;path=/";
  document.cookie = "surname=;path=/";
  document.cookie = "number=;path=/";
  document.cookie = "street=;path=/";
  document.cookie = "postcode=;path=/";
  document.cookie = "city=;path=/";
  document.cookie = "country=;path=/";
  document.cookie = "cardtype=;path=/";
  document.cookie = "cardnumber=;path=/";
  document.cookie = "month=;path=/";
  document.cookie = "year=;path=/";
}

function setName() {
  document.cookie = "title=" + document.getElementById('title').value + ";path=/";
  document.cookie = "firstname=" + document.getElementById('firstname').value + ";path=/";
  document.cookie = "surname=" + document.getElementById('surname').value + ";path=/";
}

function getName() {
  var name = {};
  name["title"] = getCookieVariableValue('title');
  name["firstname"] = getCookieVariableValue('firstname');
  name["surname"] = getCookieVariableValue('surname');

  return name;
}

function setPressed(pressed) {
  document.cookie = "pressed=" + pressed + ";path=/"
}

function setAddress() {
  document.cookie = "number=" + document.getElementById('number').value + ";path=/";
  document.cookie = "street=" + document.getElementById('street').value + ";path=/";
  document.cookie = "postcode=" + document.getElementById('postcode').value + ";path=/";
  document.cookie = "city=" + document.getElementById('city').value + ";path=/";
  document.cookie = "country=" + document.getElementById('country').value + ";path=/";
}

function getAddress() {
  var address = {};
  address["number"] = getCookieVariableValue('number');
  address["street"] = getCookieVariableValue('street');
  address["postcode"] = getCookieVariableValue('postcode');
  address["city"] = getCookieVariableValue('city');
  address["country"] = getCookieVariableValue('country');

  return address;
}

function setCardDetails() {
  if (document.getElementById('solo').checked) {
    document.cookie = "cardtype=Solo;path=/";
  }
  else if (document.getElementById('switch').checked) {
    document.cookie = "cardtype=Switch;path=/";
  }
  else if (document.getElementById('mastercard').checked) {
    document.cookie = "cardtype=Mastercard;path=/";
  }
  else if (document.getElementById('visa').checked) {
    document.cookie = "cardtype=Visa;path=/";
  }
  document.cookie = "cardnumber=" + document.getElementById('cardnumber').value + ";path=/";
  document.cookie = "month=" + document.getElementById('month').value + ";path=/";
  document.cookie = "year=" + document.getElementById('year').value + ";path=/";
}

function getCardDetails() {
  var cardDetails = {};
  cardDetails["cardtype"] = getCookieVariableValue('cardtype');
  cardDetails["cardnumber"] = getCookieVariableValue('cardnumber');
  cardDetails["month"] = getCookieVariableValue('month');
  cardDetails["year"] = getCookieVariableValue('year');

  return cardDetails;
}

function getCookieVariableValue(variable) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + variable + "=");
  if (parts.length == 2) return parts.pop().split(";").shift()
}
