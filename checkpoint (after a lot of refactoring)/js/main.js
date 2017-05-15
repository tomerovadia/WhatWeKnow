$(document).ready(function(){ // Don't do this JavaScript until the DOM is loaded

$("#question").click(
	function(e){
		if($("#answerspanel").css("display")=="block"){
			$("#answerspanel").slideUp()
			$("#question").css("position","static")
			$("body").css("padding-top","0")
		}else{
			$("#answerspanel").slideDown()
			$("#question").css("position","fixed")
			$("body").css("padding-top",parseInt($("#question").height()) + parseInt($("#question").css("padding-top")) + "px")
		}
	}
)

function hideAnswers(question) {
	question.css("background-color","red") // For debugging
	$("#answerspanel2").slideUp() // Hide the answers
	question.css("position","static") // Unfix the question (if applicable)
	$("body").css("padding-top","0") // Remove the padding at the top (if applicable)
}

function showAnswers(question) {
	question.css("background-color","grey") // For debugging
	$("#answerspanel2").slideDown() // Slide the answer panel down
}

function monitorScroll(question) {
	var question2Position = question.offset().top // Store the position of the question relative to the top of the page (beyond what's on screen)
	console.log(question2Position)
	
	$( window ).scroll( // Start taking note of the scroll position
		function(e){
			console.log($( window ).scrollTop() >= question2Position)
			// If the place where the screen is relative to the top of the page matches where the question is relative to the top of the page
			if(question.css("position") == "static"){
				if($( window ).scrollTop() >= question2Position){
					fixQuestion(question) // Call the function to fix the question
				}
			}else if (question.css("position") == "fixed"){
				if($( window ).scrollTop() < question2Position){
					unfixQuestion(question) // Call the function to unfix the question
				}
			}
		}
	)
}

function fixQuestion(question){
	question.css("position","fixed") // Fix the question
	$("body").css("padding-top",parseInt(question.height()) + parseInt(question.css("padding-top")) + "px") // Add padding at the top to keep the answers from ducking under the question
}

function unfixQuestion(question){
	question.css("position","static") // Unfix the question
	$("body").css("padding-top","0") // Remove the padding from the question (used to keep the answers from ducking under the question)
}


//What happens when question2 is clicked
$("#question2").click(
	function(e){
		// If the answer panel is already visible, slide it up
		if($("#answerspanel2").css("display")!="none"){
			hideAnswers($("#question2")) // Call the function to hide the answers

		// Otherwise, slide the answer panel down and watch the scroll so the question can be fixed if it reaches top
		}else{
			showAnswers($("#question2")) // Call the function to show the answers
			monitorScroll($("#question2")) // Call the function to monitor and react to the scrolling to keep the question visible
		}
	}
)
})

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





