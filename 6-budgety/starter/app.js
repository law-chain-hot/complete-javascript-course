//------------------------------------------------------------------
// BUDGET CONTROLLER
var budgetController = (function() {
    //some code
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentatge = -1;
    };

    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    Expense.prototype.calculatePercentage = function() {
        if (data.totals.inc > 0){
            this.percentatge = Math.round((this.value / data.totals.inc) * 100);
        }
        else{
            this.percentatge = -1;
        }
    },

    Expense.prototype.getPercentages = function() {
        return this.percentatge;
    }

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur, index, array){
            // console.log(cur);
            // console.log(index);
            // console.log(array);
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
            var newItem, ID;
            
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


        deleteItem: function(type, id) {
        
            var ids, index;
            ids = data.allItems[type].map(function(current) {
                return current.id;
            })


            // console.log(ids);
            // console.log(id);
            index = ids.indexOf(id); // return the index num of an array
            // console.log(index);
            if (index !== -1){
                data.allItems[type].splice(index, 1); // delete the item from index to the index+1
            }
        },


        calculatePercentages: function() {
            data.allItems['exp'].forEach(function(cur) {
                cur.calculatePercentage();
            });
        },

        getPercentages: function() {
            var allPercentatges;
            allPercentatges = data.allItems.exp.map(function(cur){
                return cur.getPercentages();
            });
            return allPercentatges;
        },

        testing: function(){
            console.log(data);
        }
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
        percentageEach: '.item__percentage',
        dataLabel: '.budget__title--month',
    };

    var nodeListforEach = function(list, callback){
        for (var i = 0; i < list.length; ++i){
            callback(list[i], i);
        }
    };

    var formatNumber = function(num, type) {
        var numSplit, int, dec, temp, count, s;

        num = Math.abs(num);
        num = num.toFixed(2); // automatically conver it into object, by round(num)
    
        numSplit = num.split('.');

        int = numSplit[0];
        temp = int;
        count = 0;
        if (int.length > 3){
            var i = int.length;
            var s = '';
            while((i -= 3) > 0){
                s =  ',' + temp.substr(i, 3) + s;
            }
            s = temp.substr(0, i + 3) + s;

            realInt = s;
        }
        else{
            realInt = int;
        }



        dec = numSplit[1];

        

        return (type === 'exp' ? '-' : '+')  + ' ' + realInt + '.' + dec;
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
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            
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
            var type;
            obj.budget > 0 ? type = 'inc' : 'exp';
            //
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp, 'exp');
            
            if (obj.budget > 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            }
            else{
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
        },

        displayPercentages: function(percentages) {
            var fields;

            fields = document.querySelectorAll(DOMstrings.percentageEach);

            nodeListforEach(fields, function(current, index){
                if (percentages[index] > 0){
                    current.textContent = percentages[index] + '%';
                }
                else{
                    current.textContent = '---';
                }
            });
        },


        deleteListItem: function(selectorID){
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        displayMonth: function(){
            var now, year, month;
            var now = new Date();

            // months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            months = ['January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'Jane',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December']; //12 items

            month = now.getMonth();

            year = now.getFullYear();
            month = now.getMonth();
            document.querySelector(DOMstrings.dataLabel).textContent = months[month] + ' ' + year;
        },

        changeType: function() {
            var temp;
            temp = document.querySelectorAll(
                DOMstrings.inputType + ',' + 
                DOMstrings.inputDescription + ',' + 
                DOMstrings.inputValue
            );

            nodeListforEach(temp, function(cur) {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputButton).classList.toggle('red');
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
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
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
        input = UICtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0 ){
            // 2. Add the item into the budget controller
            newItem = budgetController.addItem(input.type, input.description, input.value);

            // 3. Add the item into the UI
            UICtrl.addListItem(newItem, input.type);

            // 4. Calculate the budgets
            UICtrl.clearFields();

            // 5. Display the budgets on the UI
            updateBudget();

            // 6. Calculate and update percentages
            updatePercentages();

        }
    };

    // event delegation
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID, target;
        target = event.target
        if (target.matches('.ion-ios-close-outline')){
            itemID = target.parentNode.parentNode.parentNode.parentNode.id;
        }
        // itemID = target.closest('.item').id;
        // console.log(itemID);

        if (itemID){
            //inc-8
            splitID = itemID.split('-');
            type = splitID[0];  // inc
            ID = parseInt(splitID[1]);    // 8

            // 1. delete the data from the data structure
            budgetCtrl.deleteItem(type, ID)

            // 2. delete the item from UI
            UICtrl.deleteListItem(itemID);

            // 3. Update and show the new budget
            updateBudget();

            // 4. Calculate and update percentages
            updatePercentages();
        }
    };


    var updatePercentages = function() {
        var allPerc;

        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();

        // 2. Get the percentatges from the budget controller
        allPerc = budgetCtrl.getPercentages();
        // console.log(allPerc);
        // 3. Updata the UI with new percentages
        UICtrl.displayPercentages(allPerc);


    }


    return{
        init: function(){
            console.log('Applications has started');
            UICtrl.displayMonth();
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

