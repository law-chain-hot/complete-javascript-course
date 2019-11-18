var john = {
    firstName: 'John',
    lastName: 'Smith',
    birthYear: 1990,
    family: ['Jane', 'Mark'],
    job: 'teacher',
    isMarried: false,
    calAge: function() {
        this.age =  2018 - this.birthYear;
    }
};

john.calAge();
console.log(john);
 