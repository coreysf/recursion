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

	if (Array.isArray(obj) && obj.length == 0) {
		return '[]';
	}

	if (Array.isArray(obj)) {
		arrString = '[';
		for (var i = 0; i < obj.length - 1; i++) {
			arrString += obj[i] + ', ';
		}
		arrString += obj[obj.length - 1] + ']';
		return arrString;
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
