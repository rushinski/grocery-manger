// let properLoc = document.getElementById("item-list-id")
// properLoc.addEventListener("click", function() { clickCheck(); });

function addItem() {
  // Function called when the add button is clicked on the page
  let ele = document.getElementById("item"); // Item is the id of the text box so this code gets the id of the textbox
  let textValue = ele.value; // Using the id the value can now be grabbed to see what the user inputed

  if (textValue === "") {
    // Checks to make sure there is atleast a character as the value
    return; // Exits function if there is not
  } else {
    // For placing in the full list
    let loc = document.getElementById("item-list-id"); // Gets the location of where to place the text (places in full list)
    let fList = document.createElement("p"); // Creates a p tag
    fList.setAttribute("id", textValue); // Adds id to fList, the id will be the textValue (first parm is attribute name second is the name you give it)
    fList.innerHTML = textValue; // Sets the text that will be added to the screen with '= textValue' aswell as places it on the screen
    fList.classList.add("full-item-list"); // Adds the CSS element to the tag

    // For placing directly into the items left to purchase list
    let unPurchased = document.getElementById("items-remaining-id"); // Gets the location where to palce the text (places in items left)
    let newElementUn = document.createElement("p");
    newElementUn.textContent = textValue; // Sets the text for 'newElementUn' from textValue
    unPurchased.appendChild(newElementUn); // 'unPurchased' is where on the screen it will be placed 'appendChild' is the function to actually place it
    // On the screen '(newElementUn)' is the parameter of 'appendChild' and is the content of what will be placed
    // On to the screen

    fList.addEventListener("click", function () {
      // This adds an eventListener for all p tags inside of the container 'loc' (The full list)
      clickCheck(fList);
    });

    loc.appendChild(fList); // Appends fList into the correct body "loc" in the whole list
    ele.value = ""; // Emptys textValue after append
  }
}

function clickCheck(ele) {
  // 'ele' is fList
  if (ele.querySelector("s")) {
    // querySelector targets specific elements like <s> && <p>.  This if statement is checking to see if <s> tag exists
    // Inside <p> (ele/fList)
    let unstrikedText = ele.querySelector("s").textContent; // Gets the text content of the ele inside of the <s> tag
    ele.innerHTML = unstrikedText; // Changes the elements innerHTML to unstrikedText
    // Find and remove the item from the "purchased" list
    let purchased = document.getElementById("items-left-id");
    let purchasedItem = [...purchased.querySelectorAll("p")].find(function (p) {
      return p.textContent === unstrikedText;
      // '...' this converts the NodeList into an array.  A NodeList is a collection of DOM nodes.  We convert the NodeList to an array so
      // that we can use .find() because NodeList can't use all the functions an array can.  We get all the p tags inside of 'purchased' (List of
      // purchased items) from 'querySlectorAll('p')'.  It finds each p tag and then calls the function aswell as sends the p parameter.  It checks
      // the p.textContent which is retrieving the current content and seeing if it matchs with the striked content if it does it returns true or
      // false to purchasedItem
    });
    if (purchasedItem) {
      purchasedItem.remove(); // Removes the item from the purchased list
    }

    // Add the item back to the "unpurchased" list
    let unPurchased = document.getElementById("items-remaining-id"); // Gets the unpurchased container location
    let newElementUn = document.createElement("p"); // Creates p tag
    newElementUn.textContent = unstrikedText; // Adds text to the p tag, text is the value of what was inputed
    unPurchased.appendChild(newElementUn); // Places on page
  } else {
    // if no <s> tag exist inside, add it to the text insid<p>(strikethrough)
    let text = ele.textContent;
    ele.innerHTML = `<p><s>${text}</s></p>`; // Strikes it
    let unPurchased = document.getElementById("items-remaining-id");
    let unpurchasedItem = [...unPurchased.querySelectorAll("p")].find(function (
      p
    ) {
      return p.textContent === text;
    });
    if (unpurchasedItem) {
      unpurchasedItem.remove();
    }
    let purchased = document.getElementById("items-left-id");
    let newElementP = document.createElement("p");
    newElementP.textContent = text;
    purchased.appendChild(newElementP);
  }
}
