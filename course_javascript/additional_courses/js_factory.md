## JS Factory

## Factory Pattern

Ok, this is awesome, we are now a building development company that can create buildings and houses. But wouldn't it be great if we could have a factory that created our objects for us rather than creating directly using the new syntax? So, when we want a new house or office, we call our factory to create them for us. So, let's say we want our factory to initially just produce houses.

```
	var buildingsFactory =  {
		createHouse: function(sqFeet, bathrooms, bedrooms) {
			return {
				sqFeet: sqFeet,
				bathrooms: bathrooms,
				bedrooms: bedrooms
			}
		}
	}
	
	
	var new_house = buildingsFactory.createHouse(2500, 2, 2);
	var newer_house = buildingsFactory.createHouse(2500, 3, 5);
	
	console.log(new_house);
	console.log(newer_house);
```

[TASK]: We have houses being produced in our factory. In pairs, implement how we could also add offices into our factory.

```
	var buildingsFactory =  {
		createHouse: function(sqFeet, bathrooms, bedrooms) {
			return {
				sqFeet: sqFeet,
				bathrooms: bathrooms,
				bedrooms: bedrooms
			}
		},
		createOffice: function(desks, meetingRooms) {
			return {
				desks: desks,
				meetingRooms: meetingRooms
			}
		}
	}
	
	var new_house = buildingsFactory.createHouse(2500, 2, 2);
	var newer_house = buildingsFactory.createHouse(2500, 3, 5);
	
	var new_office = buildingsFactory.createOffice(25, 2);
	var newer_office = buildingsFactory.createOffice(3, 1);
	
	console.log(new_house);
	console.log(newer_house);
	
	console.log(new_office);
	console.log(newer_office);

```


### Object.create
We can create objects without a constructor function and directly set their prototype using Object.create

```
	var my_person = {
		talk: function() {
			console.log('good day')
		}
	}
	
	var my_warrior = Object.create(my_person)
	my_warrior.talk()
	my_warrior.attack = function() {
		console.log('rraaaar');
	}
```

### Lab

Take water bottle:
- Create constructor
- Create constructor with prototype
- Create factory
- Create factory with prototype
