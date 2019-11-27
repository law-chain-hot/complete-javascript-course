// let x = 5 // block scope
// const c = 1;




// //string 
// let firstName = 'James';
// let lastName = 'Smith';

// console.log(`This is ${firstName} ${lastName} .`);


////////////////////////////////////////////////////////////////////////////
//Arrow function

/*
const year = [1990, 1965, 1995, 1996];

//ES5
var ages5 = year.map(function(cur){
    return 2019 - cur;
})
console.log(ages5);

//ES6
let ages6 = year.map(cur => 2016 - cur);
console.log(ages6);

ages6 = year.map((cur, index) => `Age element ${index + 1}: ${2019 - cur}`);
console.log(ages6);

ages6 = year.map((cur, index) => {
    const now = new Date().getFullYear();
    const age = now - cur;
    return `Age element ${index + 1}: ${now - cur}`;
});
console.log(ages6);
*/

////////////////////////////////////////////////////////////////////////////
//Arrow function: this key word

/*
//ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function() {
        var self = this;
        document.querySelector('.green').addEventListener('click', function() {
            var str = 'This is box number ' + self.position + ' and it is ' + self.color;
            alert(str);
            console.log(this);
        })
    }
}
// box5.clickMe(); // this point to window project

//ES6
const box6 = {
    color: 'green',
    position: 1,
    //arrow function
    clickMe: function() {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
            console.log(this);
        });
    },
};
// box6.clickMe(); // this point to window project

//ES6
const box66 = {
    color: 'green',
    position: 1,
    //arrow function
    clickMe: () => {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box number ' + this.position + ' and it is ' + this.color;
            alert(str);
            console.log(this);
        });
    },
};
// box66.clickMe(); // this point to window project


//ES5
function Person(){
    this.name = 'John';
}

Person.prototype.myFriends5 = function(friends) {
    
    var arr = friends.map(function(el) {
       return this.name + ' is friends with ' + el; 
    }.bind(this));
    
    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];
// new Person('John').myFriends5(friends);


Person.prototype.myFriends6 = function(friends) {
    
    var arr = friends.map((el) =>  {
        return  `${this.name} is friends with ${el}`;
        
    })
    
    console.log(arr);
}

new Person('John').myFriends6(friends);
*/





// ////////////////////////////////////////////////////////////////////////////
// // Arrays

// const boxes = document.querySelectorAll('.box');

// //ES5
// var boxesArray5 = Array.prototype.slice.call(boxes); //convert list -> array
// boxesArray5.forEach(cur => cur.style.backgroundColor = 'dodgerblue');


// //ES6
// var boxesArray6 = Array.from(boxes);



// var ages = [1, 12, 11, 21];

// //ES6
// console.log(ages.findIndex(cur => cur >= 18));
// console.log(ages.find(cur => cur >= 18));






// ////////////////////////////////////////////////////////////////////////////
// spread operator

/*
const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
console.log(boxes);
console.log(typeof boxes);
const all = [h, ...boxes];
console.log(all);
console.log(typeof all);
// console.log(Array.from(all));
// console.log(typeof Array.from(all));

// Array.from(all).forEach(cur => cur.style.color = 'purple');
all.forEach(cur => cur.style.color = 'purple');

*/




// ////////////////////////////////////////////////////////////////////////////
// rest parameters

// //ES5
// function isFullAge5() {
//     console.log(arguments);
//     var argsArr = Array.prototype.slice.call(arguments);
    
//     argsArr.forEach(function(cur) {
//         console.log((2016 - cur) >= 18);
//     })
// }


// isFullAge5(1990, 1999, 1965);
// isFullAge5(1990, 1999, 1965, 2016, 1987);


// //ES6
// function isFullAge6(...years) {
//     years.forEach(cur => console.log( (2016 - cur) >= 18));
// }

// isFullAge6(1990, 1999, 1965, 2016, 1987);


// //ES5
// function isFullAge5(limit) {
//     console.log(arguments);
//     console.log(typeof arguments);
//     console.log(limit);

//     var argsArr = Array.from(arguments);

//     argsArr.forEach(function(cur) {
//         console.log((2016 - cur) >= limit);
//     })
// }


// isFullAge5(16, 1990, 1999, 1965);
// isFullAge5(1990, 1999, 1965, 2016, 1987);


// //ES6
// function isFullAge6(limit, ...years) {
//     years.forEach(cur => console.log( (2016 - cur) >= limit));
// }

// isFullAge6(16, 1990, 1999, 1965, 2016, 1987);







// ////////////////////////////////////////////////////////////////////////////
// // map


// const question = new Map();
// question.set('question', 'What is the official name of the latest major JavaScript version?');
// question.set(1, 'ES5');
// question.set(2, 'ES6');
// question.set(3, 'ES2015');
// question.set(4, 'ES7');
// question.set('correct', 3);
// question.set(true, 'Correct answer :D');
// question.set(false, 'Wrong, please try again!');

// console.log(question.get('question'));
// console.log(question.size);

// // question.delete(4);
// if(question.has(4)) {
//     // question.delete(4);
//     console.log('Answer 4 is here')
// }

// // question.clear();


// question.forEach((value, key) => console.log(`This is ${key}, and it's set to ${value}`));


// for (let [key, value] of question.entries()) {
//     if (typeof(key) === 'number') {
//         console.log(`Answer ${key}: ${value}`);
//     }
// }

// const ans = parseInt(prompt('Write the correct answer'));
// console.log(question.get(ans === question.get('correct')));







// ////////////////////////////////////////////////////////////////////////////
// subclass


// var Person5 = function(name, yearOfBirth, job) {
//     this.name = name;
//     this.yearOfBirth = yearOfBirth;
//     this.job = job;
// }

// Person5.prototype.calculateAge = function() {
//     var age = new Date().getFullYear() - this.yearOfBirth;
//     console.log(age);
// }

// var Athlete5 = function(name, yearOfBirth, job, olymicGames, medals) {
//     Person5.call(this, name, yearOfBirth, job);
//     this.olymicGames = olymicGames;
//     this.medals = medals;
// }
// console.log(Athlete5); // test-------------------


// Athlete5.prototype = Object.create(Person5.prototype);
// console.log(Athlete5.prototype); // test-------------------


// Athlete5.prototype.wonMedal = function() {
//     this.medals++;
//     console.log(this.medals);
// }
// console.log(Athlete5.prototype); // test-------------------

// var johnAthlete5 = new Athlete5('John', 1990, 'swimmer', 3, 10);
// console.log(Athlete5); // test-------------------
// console.log(johnAthlete5); // test-------------------

// johnAthlete5.calculateAge();
// johnAthlete5.wonMedal();


// //ES6
// class Person6 {
//     constructor (name, yearOfBirth, job) {
//         this.name = name;
//         this.yearOfBirth = yearOfBirth;
//         this.job = job;
//     }

//     calculateAge() {
//         var age = new Date().getFullYear() - this.yearOfBirth;
//         console.log(age);
//     }
// }

// class Athlete6 extends Person6 {
//     constructor(name, yearOfBirth, job, olympicGames, medals) {
//         super(name, yearOfBirth, job);
//         this.olympicGames = olympicGames;
//         this.medals = medals;
//     }
    
//     wonMedal() {
//         this.medals++;
//         console.log(this.medals);
//     }
// }

// const johnAthlete6 = new Athlete6('John', 1990, 'swimmer', 3, 10);

// johnAthlete6.wonMedal();
// johnAthlete6.calculateAge();
// console.log(johnAthlete6)





// // ////////////////////////////////////////////////////////////////////////////
// // challenge
// class Basic {
//     constructor (name, buildYear){
//         this.name = name;
//         this.builtYear = buildYear;
//     }
// }

// //subclass 1
// class Park extends Basic {
//     constructor (name, buildYear, area, treeNum){
//         super (name, buildYear);
//         this.area = area;
//         this.treeNum = treeNum;
//     }
//     classify() {
//         let perNum = this.treeNum / this.area;
//         console.log(`${this.name} has a tree density of ${perNum} per square kilometers`)

//     }
// }

// //subclass 2
// class Street extends Basic {
//     constructor (name, buildYear, length, size){
//         super (name, buildYear);
//         this.length = length;
//         this.size = size;
//     }

//     classify() {
//         let map = new Map();
//         map.set(1, 'tiny');
//         map.set(2, 'small');
//         map.set(3, 'normal');
//         map.set(4, 'big');
//         map.set(5, 'huge');
//         console.log(`${this.name}, built in ${this.buildYear}, is a ${map.get(this.size)} street`)

//     }
// }

// //new 3 parks
// let parks = [new Park('Green Park', 1987, 0.2, 215),
//              new Park('National Park', 1894, 2.9, 3541),
//              new Park('Oak Park', 1953, 0.4, 949)];

// //new 4 streets
// let streets = [new Street('Ocean Avenue', 1999, 1.1, 4),
//                new Street('Evergreen Street', 2008, 2.7, 2)];

// //main
// function main(){
//     let aveYear = 0;
//     let now = new Date().getFullYear();
//     parks.forEach(cur => aveYear += now - cur.builtYear);
//     aveYear = aveYear / parks.length;

//     //output
//     console.log('-----Park Report-----');
//     console.log(`Our ${parks.length} have an average age of ${aveYear} years`)
//     for (const cur of parks){
//         cur.classify();
//     }
// }



// //start main()
// main();



class Element {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }
}


class Park extends Element {
    constructor(name, buildYear, area, numTrees) {
        super(name, buildYear);
        this.area = area; //km2
        this.numTrees = numTrees;
    }
    
    treeDensity() {
        const density = this.numTrees / this.area;
        console.log(`${this.name} has a tree density of ${density} trees per square km.`);
    }
}


class Street extends Element {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
    
    classifyStreet () {
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.name}, build in ${this.buildYear}, is a ${classification.get(this.size)} street.`);
    }
}


const allParks = [new Park('Green Park', 1987, 0.2, 1215),
                 new Park('National Park', 1894, 2.9, 3541),
                 new Park('Oak Park', 1953, 0.4, 1949)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Street', 2015, 0.8),
                   new Street('Sunset Boulevard', 1982, 2.5, 5)];


function calc(arr) {
    
    const sum = arr.reduce((prev, cur, index) => prev + cur, 0);
    
    return [sum, sum / arr.length];
    
}


function reportParks(p) {
    
    console.log('-----PARKS REPORT-----');
    
    // Density
    p.forEach(el => el.treeDensity());
    
    // Average age
    const ages = p.map(el => new Date().getFullYear() - el.buildYear);
    const [totalAge, avgAge] = calc(ages);
    console.log(`Our ${p.length} parks have an average of ${avgAge} years.`);
    
    // Which park has more than 1000 trees
    const i = p.map(el => el.numTrees).findIndex(el => el >= 1000);
    console.log(`${p[i].name} has more than 1000 trees.`);
    
}


function reportStreets(s) {
    
    console.log('-----STREETS REPORT-----');
    
    //Total and average length of the town's streets
    const [totalLength, avgLength] = calc(s.map(el => el.length));
    console.log(`Our ${s.length} streets have a total length of ${totalLength} km, with an average of ${avgLength} km.`);
    
    // CLassify sizes
    s.forEach(el => el.classifyStreet());
}

reportParks(allParks);
reportStreets(allStreets);