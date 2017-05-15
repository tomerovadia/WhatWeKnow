$(document).ready(function(){ // Don't do this JavaScript until the DOM is loaded

// Function for hiding the answers
function hideAnswers(question, answers) {
	answers.slideUp() // Hide the answers
	question.css("position","static") // Unfix the question (if applicable)
	$("body").css("padding-top","0") // Remove the padding at the top (if applicable)
	$( window ).off("scroll")
}

// Function for showing the answers
function showAnswers(question, answers) {
	answers.slideDown() // Slide the answer panel down
}

// Function for monitoring user scrolling and fixing/unfixing the question
function monitorScroll(question, answers) {
	var questionPosition = question.offset().top // Store the position of the question relative to the top of the page (beyond what's on screen)
	console.log(questionPosition)
	$( window ).scroll( // Start taking note of the scroll position
		function(e){
			console.log($( window ).scrollTop() >= questionPosition)
			// If the place where the screen is relative to the top of the page matches where the question is relative to the top of the page
			if(question.css("position") == "static"){
				if($( window ).scrollTop() >= questionPosition){
					fixQuestion(question) // Call the function to fix the question
				}
			}else if (question.css("position") == "fixed"){
				if($( window ).scrollTop() < questionPosition){
					unfixQuestion(question) // Call the function to unfix the question
				}
			}
		}
	)
}

// Function for fixing a question and keeping it visible
function fixQuestion(question){
	question.css("position","fixed") // Fix the question
	$("body").css("padding-top",parseInt(question.height()) + parseInt(question.css("padding-top")) + "px") // Add padding at the top to keep the answers from ducking under the question
	question.css("border-bottom","1px solid black")
}

// Function for unfixing a question
function unfixQuestion(question){
	question.css("position","static") // Unfix the question
	$("body").css("padding-top","0") // Remove the padding from the question (used to keep the answers from ducking under the question)
	question.css("border-bottom","none")
}


//What happens when a question is clicked
$(document).on('click', ".question",
	function(e){
		console.log("you clicked a question!")
		var question = $(this) // Store the question in a variable
		var answers = question.parent().find(".answers-panel") // Find the answers and store it in a variable as well
		// If the answer panel is already visible, slide it up
		if(answers.is(":visible")){
			console.log("I am hiding")
			hideAnswers(question, answers) // Call the function to hide the answers
			question.parent().parent().find(".desktop-question-controls").css("background-color","lightgrey").css("border-right","2px solid black") //Change color of the control panel (Desktop)
		// Otherwise, slide the answer panel down and watch the scroll so the question can be fixed if it reaches top
		}else{
			console.log("I am showing")
			showAnswers(question, answers) // Call the function to show the answers
			if ( $(window).width() < 500){
				monitorScroll(question, answers) // Call the function to monitor and react to the scrolling to keep the question visible
			}
			question.parent().parent().find(".desktop-question-controls").css("background-color","white").css("border-right","none") //Change color of the control panel (Desktop)
		}
	}
)
})

function createAnswer(formSubmitted, answerText){
	console.log("we're creating your answer!")
	formSubmitted.parent().before("<div class='answer clearfix'><div class='desktop-answer-controls'><div class='answer-arrow up-arrow'></div><div class='answer-rank-count'>0</div><div class='answer-arrow down-arrow'></div></div><div class = 'answer-text'>"+ answerText +"</div><div class='answer-controls clearfix'><div class='left-answer-control'><div class='answer-arrow up-arrow'></div></div><div class='center-answer-control'><div class='answer-rank-count'>0</div></div><div class='right-answer-control'><div class='answer-arrow down-arrow'></div></div></div></div>")
}

// What happens when a form for a new answer is submitted
$(document).on('submit', ".submit-answer-form",
	function(e){
		console.log("you submitted an answer!")
		textbox = $(this).find(".submit-answer-textbox") // Store the textbox into a variable
		inputtedAnswerText = textbox.val() // Store the submitted text into a variable
		createAnswer($(this), inputtedAnswerText)
		textbox.val("") // Empty the text box
		return false
	}
)

function createQuestion(formSubmitted, questionText){
	formSubmitted.parent().before("<div class='question-box clearfix'><div class='desktop-question-controls clearfix'><div class='onoffswitch-div'><div class='onoffswitch'><input type='checkbox' name='onoffswitch' class='onoffswitch-checkbox' id='myonoffswitch' checked><label class='onoffswitch-label' for='myonoffswitch'></label></div></div><div class='desktop-question-arrows'><div class='question-arrow up-arrow'></div><div class='question-rank-count'>0</div><div class='question-arrow down-arrow'></div></div></div><div class='question-answers'><div class='question'>" + questionText +"</div><div class='answers-panel'><div class='answers'><div class='submit-answer-div'><form class='submit-answer-form'><textarea class='submit-answer-textbox' placeholder='Contribute your answer...'></textarea><button class='submit-answer-button'>Submit</button></form></div></div></div><div class='question-controls clearfix'><div class='left-question-control'><div class='question-arrow up-arrow'></div></div><div class='centerleft-question-control'><div class='question-rank-count'>0</div></div><div class='right-question-control'><div class='onoffswitch-div'><div class='onoffswitch'><input type='checkbox' name='onoffswitch' class='onoffswitch-checkbox' id='myonoffswitch' checked><label class='onoffswitch-label' for='myonoffswitch'></label></div></div></div><div class='centerright-question-control'><div class='question-arrow down-arrow'></div></div></div></div></div>")
}

// When happens when the form for a new question is submitted
$(".submit-question-form").submit(
	function(e){
		textbox = $(this).find(".submit-question-textbox") // Store the textbox into a variable
		inputtedQuestionText = textbox.val() // Store the submitted text into a variable
		createQuestion($(this), inputtedQuestionText)
		textbox.val("") // Empty the text box
		return false
	}
)

function addCommasToNumber(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // RegEx to add commas to a number
}

function removeCommasFromNumber(x) {
	return parseInt(x.replace(/,/g, ''), 10)
}

function changeRank(clickedArrow, currentRankNumberDisplayed){
	currentRankNumber = removeCommasFromNumber(currentRankNumberDisplayed) // Remove commas, convert to int
	if (clickedArrow.hasClass("up-arrow")){
		currentRankNumber++ // Plus one to the rank count
		newRankNumber = currentRankNumber // Store as new variable
	}else if (clickedArrow.hasClass("down-arrow")){
		currentRankNumber-- // Minus one to the rank count
		newRankNumber = currentRankNumber // Store as new variable
	}
	return newRankNumber
}

function repositionQuestion(question, clickedArrow, newRankNumber){
	if(clickedArrow.hasClass("up-arrow")){
		prevQuestion = question.prev(".question-box") // Get the question just above
		rankOfPrevQuestion = removeCommasFromNumber(prevQuestion.find(".question-rank-count").first().text()) // Get the rank of the question just above
		if(rankOfPrevQuestion < newRankNumber){
			prevQuestion.before(question) // Put the question above the question above it (rank it higher)
		}
	}else if(clickedArrow.hasClass("down-arrow")){
		nextQuestion = question.next(".question-box") // Get the question just below
		rankOfNextQuestion = removeCommasFromNumber(nextQuestion.find(".question-rank-count").first().text()) // Get the rank of the question just below
		if(rankOfNextQuestion > newRankNumber){
			nextQuestion.after(question) // Put the question below the question below it (rank it lower)
		}
	}
}

// What happens when a question arrow is clicked
$(document).on('click', ".question-arrow",
	function(e){
		clickedArrow = $(this) // Store the clicked arrow in a variable
		question = clickedArrow.closest(".question-box") // Store the question in a variable
		currentRankNumberDisplayed = question.find(".question-rank-count").first().text() // Get the rank count (first, for simplicity)
		newRankNumber = changeRank(clickedArrow, currentRankNumberDisplayed) // Pass current rank number that's displayed through the function that will tell us what new rank number to display
		newRankNumberToDisplay = addCommasToNumber(newRankNumber) // Add commas to create the number to be displayed
		question.find(".question-rank-count").text(newRankNumberToDisplay) // Find all .question-rank-count in this .question-box and change their text to the new rank number

		repositionQuestion(question, clickedArrow, newRankNumber) //Call the function for repositioning the question
	}
)

function repositionAnswer(answer, clickedArrow, newRankNumber){
	if(clickedArrow.hasClass("up-arrow")){
		prevAnswer = answer.prev(".answer") // Get the answer just above
		rankOfPrevAnswer = removeCommasFromNumber(prevAnswer.find(".answer-rank-count").first().text()) // Get the rank of the answer just above
		if(rankOfPrevAnswer < newRankNumber){
			prevAnswer.before(answer) // Put the answer above the answer above it (rank it higher)
		}
	}else if(clickedArrow.hasClass("down-arrow")){
		nextAnswer = answer.next(".answer") // Get the answer just below
		rankOfNextAnswer = removeCommasFromNumber(nextAnswer.find(".answer-rank-count").first().text()) // Get the rank of the answer just below
		if(rankOfNextAnswer > newRankNumber){
			nextAnswer.after(answer) // Put the answer below the answer below it (rank it lower)
		}
	}
}

// What happens when an answer arrow is clicked
$(document).on('click', ".answer-arrow",
	function(e){
		clickedArrow = $(this) // Store the clicked arrow in a variable
		answer = clickedArrow.closest(".answer") // Store the answer in a variable
		currentRankNumberDisplayed = answer.find(".answer-rank-count").first().text() // Get the rank count (first, for simplicity)
		newRankNumber = changeRank(clickedArrow, currentRankNumberDisplayed) // Pass current rank number that's displayed through the function that will tell us what new rank number to display
		newRankNumberToDisplay = addCommasToNumber(newRankNumber) // Add commas to create the number to be displayed
		answer.find(".answer-rank-count").text(newRankNumberToDisplay) // Find all .answer-rank-count in this answer and change their text to the new rank number
		repositionAnswer(answer, clickedArrow, newRankNumber)
	}
)







//GRAVEYARD
//////////////////////////////////

//$("#question").click(
//	function(e){
//		if($("#answerspanel").css("display")=="block"){
//			$("#answerspanel").slideUp()
//			$("#question").css("position","static")
//			$("body").css("padding-top","0")
//		}else{
//			$("#answerspanel").slideDown()
//			$("#question").css("position","fixed")
//			$("body").css("padding-top",parseInt($("#question").height()) + parseInt($("#question").css("padding-top")) + "px")
//		}
//	}
//)

//var question2Position = $("#question2").offset().top

//$( window ).scroll(
//	function(e){
//		if($( window ).scrollTop() == question2Position){
//			console.log("matched!")
//		}
//	}
//)



//var didScroll = false

//$( window ).scroll(
//	function(){
//		didScroll = true
//	}
//)

//setInterval(function() {
//	if (didScroll){
//		if($("#answerspanel").offset().top == $( window ).scrollTop() ){
//			console.log("they match!")
//		}
//		didScroll = false
//	}

//}, 250);





