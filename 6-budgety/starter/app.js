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

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        },
        budget: 0,
        percentage: -1,
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

        calculateBudget: function() {
            //calculate the total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            //calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            //calculate the percentatge of income that we spent
            if (data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            }
            else{
                data.percentage = -1;
            }
        },

        getBudget: function(){
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
            };
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
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',

    };

    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
            };
        },

        addListItem: function(obj, type) {
            var html, newHtml, element;
            //create HTML string with placeholder text

            if (type === 'inc'){
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            else if (type === 'exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }

            //replace the placeholder text
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);
            
            //insert the HTML into DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        
        clearFields: function() {
            var fields;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            // console.log(fields);

            fieldsArr = Array.prototype.slice.call(fields);
            // console.log(typeof fields);

            fieldsArr.forEach(function(current, index, array) {
                // console.log(index);
                current.value = "";
            });

            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {
            //
            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;
            
            if (obj.budget > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            }
            else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }


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

        document.addEventListener('keypress', function(event){ //event is what we tap in the keyboard
            if (event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };


    var updateBudget = function() {
    
        // 1. calculate the budget
        budgetController.calculateBudget();

        // 2. return the budget
        var budget = budgetCtrl.getBudget();

        // 3. display the budget on the UI
        UICtrl.displayBudget(budget);
    
    };

    var ctrlAddItem = function(){
        var input, newItem;

        // TO DO LIST
        // 1. Get the filed input data
        input = UICtrl.getInput()

        if (input.description !== "" && !isNaN(input.value) && input.value > 0 ){
            // 2. Add the item into the budget controller
            newItem = budgetController.addItem(input.type, input.description, input.value);

            // 3. Add the item into the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Calculate the budgets
            UICtrl.clearFields();

            // 5. Display the budgets on the UI
            updateBudget();
        }
    };

    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID, target;
        target = event.target
        itemID = target.parentNode.parentNode.parentNode.parentNode;
        console.log(itemID);

        //inc-8
        splitID = itemID.split('-');
        type = splitID[0];  // inc
        ID = splitID[1];    // 8

        // 1. delete the data from the data structure

        // 2. delete the item from UI

        // 3. Update and show the new budget
    };

    return{
        init: function(){
            console.log('Applications has started');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0,
            })
            setupEventLiseners();
        }
    };

})(budgetController, UIController);


AppController.init(); // the only line of code that is placed outside