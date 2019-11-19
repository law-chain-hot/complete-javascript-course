// BUDGET CONTROLLER
var budgetController = (function() {
    //some code

})(); //invoke the funtion at the end by ()



// UI CONTROLLER
var UIController = (function() {
    //some code
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
    };

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            };
        },
        
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
    

})();



// APP CONTROLLER
var AppController = (function(budgetCtrl, UICtrl) {

    var setupEventLiseners = function() {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function(event){
            if (event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });
    };

    var ctrlAddItem = function(){
        // TO DO LIST
        // 1. Get the filed input data
        var input = UICtrl.getInput()
        console.log(input);

        // 2. Add the item into the budget controller

        // 3. Add the item into the UI

        // 4. Calculate the budgets

        // 5. Display the budgets on the UI

    };

    return{
        init: function(){
            console.log('Applications has started');
            setupEventLiseners();
        }
    };

})(budgetController, UIController);


AppController.init(); // the only line of code that is placed outside