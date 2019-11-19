//------------------------------------------------------------------
// BUDGET CONTROLLER
var budgetController = (function() {
    //some code
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        }
    };

    return {
        addItem: function(type, des, val) {
            var newItem;
            
            //create the new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }
            else {
                ID = 0;
            }

            if(type === 'exp'){
                newItem = new Expense(ID, des, val);
            }
            else if (type === 'inc') {
                newItem = new Income(ID,des, val);
            }
            
            //Push it into our data array
            data.allItems[type].push(newItem);

            //Return the new element
            return newItem;
        },
    }

})(); //invoke the funtion at the end by ()



//------------------------------------------------------------------
// UI CONTROLLER
var UIController = (function() {
    //some code
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
    };

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value,
            };
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;
            //create HTML string with placeholder text

            if (type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            else if (type === 'exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            //replace the placeholder text
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            //insert the HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            

        },
        
        getDOMstrings: function() {
            return DOMstrings;
        },
    };
    

})();



//------------------------------------------------------------------
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
        var input, newItem;

        // TO DO LIST
        // 1. Get the filed input data
        input = UICtrl.getInput()

        // 2. Add the item into the budget controller
        newItem = budgetController.addItem(input.type, input.description, input.value);

        // 3. Add the item into the UI
        UICtrl.addListItem(newItem, input.type);

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