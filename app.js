
// Array of questions - each question is an object
var questions = [{
    question: "1. What does DOM stand for?",
    choices: ["Directory Of Models", "Document On Middleware", "Data Object Model", "Document Object Model"],
    correctAnswer: 3
}, {
    question: "2. What does 'Math.random()' do?",
    choices: ["Randomly selects an index value in an array", "Returns a number from 0 up to, but not including 10", "Returns a number from 0 up to, but not including 1", "Returns any random number"],
    correctAnswer: 2
}, {
    question: "3. Which two methods would add an element at the begining of an array, and one at the end of an array, respectively?",
    choices: ["push, pop", "unshift, push", "first, push", "unshift, last"],
    correctAnswer: 1
}, {
    question: "4. How would you create a string and assign it to a variable?",
    choices: ["const string = 'I just created a string'", "const string = (I just created a string)", "string = alert('I just created a string')", "I just created a string = let string"],
    correctAnswer: 0
}, {
    question: "5. Given `const num = 7` - How would you use string concatenation to create the following string:   Say hello 7 times fast! ",
    choices: ["'Say hello ' + num + ' times fast!'", "'Say hello + num + times fast!'", "('Say hello') + 'num' + ('times fast!')", "`Say hello (num) times fast!`"],
    correctAnswer: 0
},{
	question: "6. What is the proper syntax of a basic function?",
    choices: [`name function(parameter) {

        // code to be executed
        
      }`, `function name(parameter) {

        // code to be executed
        
      }`, `function name(code to be executed) {

        // paramater
        
      }`, `const function = name {parameter} (

        // code to be executed
        
      )`],
    correctAnswer: 1
},{
	question: "7. Use jQuery to append a paragraph tag to an element with the class of container",
    choices: ["$('#container').appendChild(p)", "$('p').append('.container')", "$('containerElement').append('p')", "$('.container').append('p')"],
    correctAnswer: 3
},{
	question: "8. Look at the following selector: document.querySelector('li'). What does it select?",
    choices: ["All list item elements", "The last list item element", "The first list item element", "The current list item element"],
    correctAnswer: 2
},{
	question: "9. What does CRUD stand for?",
    choices: ["Create - Review - Undo - Document", "Create- Read - Update - Delete", "Create - Read - Upload - Destroy", "None of these"],
    correctAnswer: 1
},{
	question: "10. Which of the following is an example of an object literal?",
    choices: ["const literal = { property: 'string'}", "const literal = property(string) =>", "const literal = [property: 'string']", "const {literal} = [string property]"],
    correctAnswer: 0
}];

const $answerButton = $('.answerButton');
$answerButton.hide();
var currentQuestion = 0;
var viewingAns = 0;
var correctAnswers = 0;
var quizOver = false;
var iSelectedAnswer = [];
	var c=360;
	var t;
$(document).ready(function () 
{
    // Display the first question
    displayCurrentQuestion();
    $(this).find(".quizMessage").hide();
	timedCount();
	
	$(this).find('.answerButton').on("click", function () 
	{		
		
        if (!quizOver) 
		{
			if(currentQuestion == 0) { return false; }
	
			if(currentQuestion == 1) {
			  $answerButton.hide();
			}
			
				currentQuestion--; // Since we have already displayed the first question on DOM ready
				if (currentQuestion < questions.length) 
				{
					displayCurrentQuestion();
					$answerButton.hide();
					
				} 					
		} else {
			if(viewingAns == 3) { return false; }
			currentQuestion = 0; viewingAns = 3;
			viewResults();	
			$answerButton.show();	
		}
    });

	
	// On clicking next, display the next question
    $(this).find(".nextButton").on("click", function () 
	{
        if (!quizOver) 
		{
			
            var val = $("input[type='radio']:checked").val();

            if (val == undefined) 
			{
                $(document).find(".quizMessage").text("Please select an answer");
                $(document).find(".quizMessage").show();
            } 
			else 
			{
                // TODO: Remove any message -> not sure if this is efficient to call this each time....
                $(document).find(".quizMessage").hide();
				if (val == questions[currentQuestion].correctAnswer) 
				{
					correctAnswers++;
				}
				iSelectedAnswer[currentQuestion] = val;
				
				currentQuestion++; // Since we have already displayed the first question on DOM ready
				if(currentQuestion >= 1) {
					  $('.preButton').prop("disabled", false);
				}
				if (currentQuestion < questions.length) 
				{
					displayCurrentQuestion();
					
				} 
				else {

					// Display final score and message, unhide the "view answers" button
					displayScore();
					$('#iTimeShow').html('Quiz Completed! This quiz will self destruct when the timer runs out');
					$('#timer').html("You scored: " + correctAnswers + " out of " + questions.length);
					c=900;
					$answerButton.show();
					$(document).find(".nextButton").text("Try Again?");
					quizOver = true;
					return false;
					
				}
			}
					
		}	
		else 
		{ // quiz is over and clicked the next button (which now displays 'Play Again?'
			quizOver = false; $('#iTimeShow').html('Time Remaining:'); iSelectedAnswer = [];
			$(document).find(".nextButton").text("Next Question");
			$answerButton.hide();
			resetQuiz();
			viewingAns = 1;
			displayCurrentQuestion();
			hideScore();
		}
    });
});



function timedCount()
	{
		if(c == 905) 
		{ 
			return false; 
		}
		
		var hours = parseInt( c / 3600 ) % 24;
		var minutes = parseInt( c / 60 ) % 60;
		var seconds = c % 60;
		var result = (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);            
		$('#timer').html(result);
		
		if(c == 0 )
		{			// Ends game if timer runs out
					displayScore();
					$('#iTimeShow').html('Quiz Time Is Up! This quiz will self destruct when the timer runs out');
					$('#timer').html("You scored: " + correctAnswers + " out of " + questions.length);
					c=900;
					$('#timer').html(result);
					$answerButton.show();
					$(document).find(".nextButton").text("Try Again?");
					quizOver = true;
					return false;
					
		}
		
		c = c - 1;
		t = setTimeout(function()
		{
			timedCount()
		},1000);
	}
	
	
// This displays the current question AND the choices
function displayCurrentQuestion() 
{

	if(c == 365) { c = 360; timedCount(); }
    //console.log("In display current Question");
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;
	
	
    for (i = 0; i < numChoices; i++) 
	{
        choice = questions[currentQuestion].choices[i];
		
		if(iSelectedAnswer[currentQuestion] == i) {
			$('<li><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
		} else {
			$('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
		}
    }
}

function resetQuiz()
{
    currentQuestion = 0;
    correctAnswers = 0;
	hideScore();
	c = 360;
	//$answerButton.hide();
}

function displayScore()
{
    $(document).find(".quizContainer > .result").text("You scored: " + correctAnswers + " out of: " + questions.length);
	$(document).find(".quizContainer > .result").show();
	$answerButton.show();
}

function hideScore() 
{
    $(document).find(".result").hide();
}

// This displays the current question AND the choices
function viewResults() 
{

	if(currentQuestion == 10) { currentQuestion = 0;return false; }
	if(viewingAns == 1) { return false; }

	hideScore();
    var question = questions[currentQuestion].question;
    var questionClass = $(document).find(".quizContainer > .question");
    var choiceList = $(document).find(".quizContainer > .choiceList");
    var numChoices = questions[currentQuestion].choices.length;
    // Set the questionClass text to the current question
    $(questionClass).text(question);
    // Remove all current <li> elements (if any)
    $(choiceList).find("li").remove();
    var choice;
	
	// Showing answers - Each answer shows for 6 seconds before moving on to next answer
	for (i = 0; i < numChoices; i++) 
	{
        choice = questions[currentQuestion].choices[i];
		
		if(iSelectedAnswer[currentQuestion] == i) {
			if(questions[currentQuestion].correctAnswer == i) {
				$('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			} else {
				$('<li style="border:2px solid red;margin-top:10px;"><input type="radio" class="radio-inline" checked="checked"  value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			}
		} else {
			if(questions[currentQuestion].correctAnswer == i) {
				$('<li style="border:2px solid green;margin-top:10px;"><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			} else {
				$('<li><input type="radio" class="radio-inline" value=' + i + ' name="dynradio" />' +  ' ' + choice  + '</li>').appendTo(choiceList);
			}
		}
    }
	
	currentQuestion++;
	
	setTimeout(function()
		{
			viewResults();
		},6000);
}
