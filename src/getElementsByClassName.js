// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:


var getElementsByClassName = function(className){
  // your code here

  	elementsByClassName = [];			// STEP 1: Create empty array for elements filtered by class name

	function getAllElements (node) {     // STEP 2: Create funtion that gets ALL elements of the DOM starting from the node specified as the argument
		var allElements  = [];

		var domIterator = function (node) {  // STEP 3: Recursively iterate through the siblings of the function argument, and the children of each node
			while (node) {
				if (node.nodeType == 1) {    // Only gets elements within the DOM (i.e., doesn't get text nodes, which don't contain class attributes)
					allElements.push(node);
				}

				if (node.childNodes.length) {   // Recursively calls domIterator()on the firstChild of the current 'node' variable, if there is one
					domIterator(node.firstChild);
				}
				node = node.nextSibling;  // Assigns the next sibling to the node variable. When there are no more siblings, the loop breaks.
			}
		}

		domIterator(node);
		return allElements;
	}

	var allElements = getAllElements(document.body); // STEP 4: Use getAllElements() to get all DOM elements starting with document.body

	for (var i = 0; i < allElements.length; i++) {				// STEP 5: Iterate through all elements and get those that contain the specified class name, pushing them onto an array
		if (allElements[i].classList.contains(className)) {
			elementsByClassName.push(allElements[i]);
		}
	}

	return elementsByClassName;		// STEP 6: Return the array containing all elements with the specified class name

};
