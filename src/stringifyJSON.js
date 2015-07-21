// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

/*
BRIEF DESCRIPTION OF SOLUTION:
stringifyJSON() stringifies the passed-in argument using 3 sub-functions - 
1 to stringify primitive values & null, 1 for arrays, and 1 for objects.
*/

var stringifyJSON = function(obj) {

	if ((typeof obj === 'string' || typeof obj === 'boolean' || typeof obj === 'number') || (obj === null && typeof obj === 'object')) {
		return primStringFunc(obj);
	}

	if (Array.isArray(obj)) {
		return arrStringFunc(obj);
	}

	if (typeof obj === 'object')  {
		return objStringFunc(obj);
	}

	function primStringFunc(prim) {  // The output of this function is dependent on the data type of the passed-in argument.
		if (typeof prim === 'string') {
			return '"' + prim.toString() + '"';
		}

		if (typeof prim === 'boolean' || typeof prim === 'number') {
			return prim.toString();
		}

		if (prim === null && typeof prim === 'object') {
			return 'null';
		}
	};

	function arrStringFunc(arr) {		
		arrString = '[';
		for (var i = 0; i < arr.length; i++) {  // If the array is empty, this code is skipped
			if (Array.isArray(arr[i])) {
				arrString += arrStringFunc(arr[i]) + ','; // Processes sub-arrays within the array using recursion
			}

			else if (typeof arr[i] === 'object' && !Array.isArray(arr[i])) {
				arrString += objStringFunc(arr[i]) + ','; // Processes objects within the array using our built function
			}

			else {
				arrString += primStringFunc(arr[i]) + ',';  // Processes primitive data types (and null) within the array using our built function
			}
		}

		arrString += ']';
		arrString = arrString.replace(',]', ']');  // Removes final comma in list of array elements

		return arrString;
	};
		
	function objStringFunc(collection) {
		objString = '{';
		for (var key in collection) {  // If the object is empty, this code is skipped
			if (collection[key] !== undefined && typeof collection[key] !== 'function') {  // If an object property value is undefined or consists of a function, this code is skipped
				if ((typeof collection[key] === 'object' && !Array.isArray(collection[key])) && collection[key] !== null) {
					objString += '"' + key + '":' + objStringFunc(collection[key]) + ',';  // Processes nested objects within the object using recursion
				}

				else if (Array.isArray(collection[key])) {
					objString += '"' + key + '":' + arrStringFunc(collection[key]) + ',';  // Processes property values consisting of arrays using our built function
				}

				else {
					objString += '"' + key + '":' + stringQuotes(collection[key]) + collection[key] + stringQuotes(collection[key]) + ',';  // Ensures that string property values includes the requisite quotation marks
				}
			}
		}

		objString += '}';
		objString = objString.replace(',}', '}'); // Removes final comma in list of properties

		return objString;
	}

	function stringQuotes(val) {  // This function is used within objStringFunc() to format property values consisting of strings
		return typeof val === 'string' ? '"' : '';
	}
};
