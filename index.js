let arraySize,
  array = [];
setSize = (size) => {
  if (isNaN(size) || size < 1 || size > 20) {
    alert("Please enter a valid number between 1 - 20");
  } else {
    newSession();
    arraySize = size;
    alert(`Yeah! array size set to ${arraySize}`);
    document.getElementById(
      "generateButton"
    ).innerHTML = `Generate random array of size ${arraySize}`;
  }
};

generateArray = () => {
  if (arraySize === undefined) {
    alert("Sorry! First you need set the array size");
  } else {
    let i = 0;
    array = [];
    document.getElementById("originalArray").innerHTML = "";
    newSession();
    while (i < arraySize) {
      array[i] = Math.floor(Math.random() * 100 + 1);
      var node = document.createElement("SPAN");
      var textnode = document.createTextNode(array[i] + ", ");
      node.appendChild(textnode);
      document.getElementById("originalArray").appendChild(node);
      i++;
    }
  }
};

visualize = (algoName) => {
  if (array.length <= 0) {
    alert("Create an array first");
  }
  newSession();
  if (algoName === "ls" || algoName === "bs") {
    let itemToSearch = prompt("Enter a number you want to search");
    if (isNaN(itemToSearch)) {
      alert("Please enter a valid number");
    } else {
      if (algoName === "ls") {
        performLinearSearch(itemToSearch);
      } else {
        performBinarySearch(itemToSearch);
      }
    }
  } else {
    if (algoName === "bbs") {
      performBubbleSort();
    } else {
      performSelectionSort();
    }
  }
};

newSession = () => {
  document.getElementById("passData").innerHTML = "";
  document.getElementById("resultDiv").innerHTML = "";
};

performLinearSearch = (itemToSearch) => {
  let i = 0;
  while (i < array.length) {
    createVisualization(array, i + 1, i);
    if (array[i] == itemToSearch) {
      document.getElementById(
        "resultDiv"
      ).innerHTML = `Linear Search Result - the elemnt ${itemToSearch} found at position ${
        i + 1
      }`;
      return;
    }
    i++;
  }
  document.getElementById(
    "resultDiv"
  ).innerHTML = `We could not found the elemnt ${itemToSearch} in the array`;
};

performBinarySearch = (itemToSearch) => {
  let i = 0,
    up = array.length - 1,
    lw = 0,
    middle = parseInt((up + lw) / 2),
    sortedArray = array.sort(function (a, b) {
      return a - b;
    });
  while (lw <= up) {
    createVisualization(sortedArray, i + 1, middle);
    if (sortedArray[middle] == itemToSearch) {
      document.getElementById(
        "resultDiv"
      ).innerHTML = `Linear Search Result - the elemnt ${itemToSearch} found at position ${
        middle + 1
      }`;
      return;
    } else {
      if (sortedArray[middle] > itemToSearch) {
        up = middle - 1;
        middle = parseInt((up + lw) / 2);
      } else {
        lw = middle + 1;
        middle = parseInt((up + lw) / 2);
      }
    }
    i++;
    if (i === 100) return;
  }
  document.getElementById(
    "resultDiv"
  ).innerHTML = `We could not found the elemnt ${itemToSearch} in the array`;
};

performSelectionSort = () => {
  let newArray = [...array],
    passCounter = 0;
  for (let i = 0; i < newArray.length; i++) {
    let min = i;
    for (let j = i + 1; j < newArray.length; j++) {
      if (newArray[min] > newArray[j]) {
        min = j;
      }
    }
    if (min !== i) {
      let tmp = newArray[i];
      newArray[i] = newArray[min];
      newArray[min] = tmp;
      createVisualization(newArray, passCounter + 1, min, i);
      passCounter++;
    }
  }
  if (passCounter === 0)
    document.getElementById("resultDiv").innerHTML = `array is already sorted`;
};

performBubbleSort = () => {
  console.log(array);
  let i = 0,
    passCounter = 0,
    newArray = [...array];
  while (i < newArray.length) {
    let swap = false;
    for (let j = 0; j < newArray.length; j++) {
      if (newArray[j] > newArray[j + 1]) {
        let temp = newArray[j + 1];
        newArray[j + 1] = newArray[j];
        newArray[j] = temp;
        swap = true;
        createVisualization(newArray, passCounter + 1, j, j + 1);
        passCounter++;
      }
    }
    if (!swap) break;
    i++;
  }
  if (passCounter === 0)
    document.getElementById("resultDiv").innerHTML = `array is already sorted`;
};

createVisualization = (array, passNumber, markPosition, markPosition2 = -1) => {
  console.log(markPosition2);
  var divNode = document.createElement("DIV");
  var divNodeHeading = document.createElement("DIV");
  var textnode = document.createTextNode(`Pass ${passNumber}`);
  divNodeHeading.appendChild(textnode);
  divNode.appendChild(divNodeHeading);
  divNode.classList.add("array");
  divNodeHeading.classList.add("passHeading");
  array.map((data) => {
    var node = document.createElement("SPAN");
    var textnode = document.createTextNode(data + ", ");
    node.appendChild(textnode);
    divNode.appendChild(node);
  });
  document.getElementById("passData").appendChild(divNode);
  var child = divNode.querySelectorAll("span");
  if (markPosition !== -1) {
    child[markPosition].style.color = "#c34a36";
    child[markPosition].style.fontWeight = 900;
  }
  if (markPosition2 !== -1) {
    child[markPosition2].style.color = "#c34a36";
    child[markPosition2].style.fontWeight = 900;
  }
};
