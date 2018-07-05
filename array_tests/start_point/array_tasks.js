var arrayTasks = {

	concat: function (arr1, arr2) {
		// var newArray = [];
		// newArray.push.apply(newArray, arr1);
		// newArray.push.apply(newArray, arr2);
		// return newArray;
		// var mySet = new Set(arr1);
		// for(var element of arr2){
		// 	mySet.add(element);
		// }

		// return Array.from(mySet);
		var mySet = new Array();
		mySet = arr1;

		for(var element of arr2){
			arr1.push(element);
		}


	},

	// insertAt: function (arr, itemToAdd, index) {
		
	// },

	// square: function (arr) {
		
	// },

	// sum: function (arr) {
		
	// },

	// findDuplicates: function (arr) {
	// 	return arr.filter(function(item, i){
	// 		return arr.slice( i + 1 ).includes(item) && arr.indexOf(item) === i;
	// 	})
	// },

	removeAndClone: function (arr, valueToRemove) {
		return arr.filter(function(item){
			return item !== valueToRemove;
		})
	},

	findIndexesOf: function (arr, itemToFind) {
		var results = [];

		arr.forEach(function(item, index){
			if (item === itemToFind) results.push(index);
		})

		return results;
	},

	sumOfAllEvenNumbersSquared: function (arr) {
		return arr.reduce(function(acc, element){
			return element % 2 === 0 ? acc + (element * element) : acc;
		}, 0)
	}
}

module.exports = arrayTasks
