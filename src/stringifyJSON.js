// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {

		if (typeof obj === 'string') {
			return '"' + obj.toString() + '"';
		}

		if (typeof obj === 'boolean' || typeof obj === 'number') {
			return obj.toString();
		}

		if (obj === null && typeof obj === 'object') {
			return 'null';
		}


	var primValues = function(prim) {
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

	function arrStringFunc (arr) {
			arrString = '';
			for (var i = 0; i < arr.length - 1; i++) {
				if (Array.isArray(arr[i])) {
					if (arr[i].length == 0) {
						arrString += '[],';
					}
					else {
					arrString += arrStringFunc(arr[i]) + ',';
					}
				}

				else if (typeof arr[i] === 'object' && !Array.isArray(arr[i])) {
					arrString += objStringFunc(arr[i]) + ',';
				}

				else {
					arrString += primValues(arr[i]) + ',';
					console.log(arrString);
				}
			}

			if (Array.isArray(arr[arr.length-1])) {
				arrString += arrStringFunc(arr[arr.length-1]);
			}

			else if (typeof arr[arr.length-1] === 'object' && !Array.isArray(arr[arr.length-1])) {
				arrString += objStringFunc(arr[arr.length-1]);
			}

			else {
				arrString += primValues(arr[arr.length - 1]);
				console.log(arrString);
			}

			return '[' + arrString + ']';
	};


	if (Array.isArray(obj)) {
		if (obj.length == 0) {
			return '[]';
		}
		// else if (obj.length == 1) {
		// 	return '[' + primValues(obj[0]) + ']';
		// }
		else {
			return arrStringFunc(obj);
		}
	}


		
	function objStringFunc (collection) {
		objString = '{';
		for (var key in collection) {
			if (collection[key] !== undefined && typeof collection[key] !== 'function') {
				if ((typeof collection[key] === 'object' && !Array.isArray(collection[key])) && collection[key] !== null) {
					objString += '"' + key + '":';
					objString += objStringFunc(collection[key]) + ',';
				}

				else if (Array.isArray(collection[key]) && collection[key].length == 0) {
					console.log(true);
					objString += '"' + key + '":';
					objString += '[],';
				}

				else if (Array.isArray(collection[key])) {
					console.log(true);
					objString += '"' + key + '":';
					objString += arrStringFunc(collection[key]) + ',';
				}

				else {
					objString += '"' + key + '":';
					if (typeof collection[key] === 'string') {
						objString += '"';
					} 
					objString += collection[key];
					if (typeof collection[key] === 'string') {
						objString += '"';
					}
					objString += ',';
				}
			}
		}

		objString += '}';
		objString = objString.replace(',}', '}');
		console.log(objString);

		return objString;
	}

	if (typeof obj === 'object')  {
		return objStringFunc(obj);
	}
};
