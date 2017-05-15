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
}

// Function for unfixing a question
function unfixQuestion(question){
	question.css("position","static") // Unfix the question
	$("body").css("padding-top","0") // Remove the padding from the question (used to keep the answers from ducking under the question)
}


//What happens when a question is clicked
$(".question").click(
	function(e){
		var question = $(this) // Store the question in a variable
		var answers = question.parent().find(".answers-panel") // Find the answers and store it in a variable as well
		// If the answer panel is already visible, slide it up
		if(answers.is(":visible")){
			hideAnswers(question, answers) // Call the function to hide the answers
			console.log("I am hiding")
		// Otherwise, slide the answer panel down and watch the scroll so the question can be fixed if it reaches top
		}else{
			console.log("I am showing")
			showAnswers(question, answers) // Call the function to show the answers
			monitorScroll(question, answers) // Call the function to monitor and react to the scrolling to keep the question visible
		}
	}
)
})







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





