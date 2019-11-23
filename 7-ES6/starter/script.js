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





////////////////////////////////////////////////////////////////////////////
// Arrays

const boxes = document.querySelectorAll('.box');

//ES5
var boxesArray5 = Array.prototype.slice.call(boxes); //convert list -> array
boxesArray5.forEach(cur => cur.style.backgroundColor = 'dodgerblue');


//ES6
var boxesArray6 = Array.from(boxes);



var ages = [1, 12, 11, 21];

//ES6
console.log(ages.findIndex(cur => cur >= 18));
console.log(ages.find(cur => cur >= 18));
