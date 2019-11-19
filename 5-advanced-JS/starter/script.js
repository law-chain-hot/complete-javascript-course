

//creat a immediately invoked function

(function(){
    //init
    var Question = function(question, answer, correct){
        this.question = question;
        this.answer = answer;
        this.correct = correct;
    }

    //prototype
    Question.prototype.display1 = function(){
        console.log(this.question);
        for (var i = 0; i < this.answer.length; i++){
            console.log(i + '. ' + this.answer[i]);
        }
    };

    Question.prototype.checkAnswer = function(ans, keepScore){
        if (ans === this.correct){
            console.log('Correct answer!');
            xx = keepScore(true);
        }
        else{
            console.log('Wrong answer. :(')
            xx = keepScore(false);
        }

        this.displayScore(xx);
    }

    Question.prototype.displayScore = function(score){
        console.log('Your curren score is: ' + score);
        console.log('------------------------');

    }

    //Question
    var q1 = new Question('Is JS the coolest programming language in the world?',
                          ['Yea', 'No'],
                          0
                          );
    var q2 = new Question('Is JS the coolest programming language in the world?',
                          ['Yea', 'No'],
                          0
                          );
    var q3 = new Question('Is JS the coolest programming language in the world?',
                          ['Yea', 'No'],
                          0
                          );
    var q = [q1, q2, q3];

    var sc = 0;
    //score
    var keepScore = function(correct){
        if (correct){
            sc++;
        }
        return sc;
    }
    // var keepScore = score();


    //generate
    function nextQuestion(){
        var n = Math.floor(Math.random() * q.length);
        q[n].display1();
        var ans = prompt('Please select the correct answer. (tap \'exit\' to exit)');
        
        if (ans !== 'exit'){
            q[n].checkAnswer(parseInt(ans),keepScore);
            nextQuestion();
        }
    }

    nextQuestion()
})();

// prompt('Please select the correct answer.');