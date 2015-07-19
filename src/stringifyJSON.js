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

	var arrStringFunc = function(arr) {
			arrString = '[';
			for (var i = 0; i < arr.length - 1; i++) {
				if (Array.isArray(arr[i])) {
					console.log(arrString);
					arrString += arrStringFunc(arr[i]) + ',';
				}
				else {
//					console.log(arrString);
					arrString += primValues(arr[i]) + ',';
				}
			}

			if (Array.isArray(arr[arr.length-1])) {
				arrString += arrStringFunc(arr[arr.length-1]);
			}
			else {
				arrString += primValues(arr[arr.length - 1]) + ']';
			}
			
			return arrString;
	};


	if (Array.isArray(obj)) {
		if (obj.length == 0) {
			return '[]';
		}
		else if (obj.length == 1) {
			return '[' + primValues(obj[0]) + ']';
		}
		else {
			return arrStringFunc(obj);
		}
	}


	if (typeof obj === 'object')  {
		objString = '{ ';
		for (var key in obj) {
			objString += '"' + key + '": ';
			if (typeof obj[key] === 'string') {
				objString += '"';
			} 
			objString += obj[key];
			if (typeof obj[key] === 'string') {
				objString += '"';
			}
			objString += ', ';
		}
	}
};
