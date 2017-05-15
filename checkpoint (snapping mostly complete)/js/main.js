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

//What happens when question2 is clicked
$("#question2").click(
	function(e){
		//If the answer panel is already visible, slide it up
		if($("#answerspanel2").css("display")=="block"){
			$("#answerspanel2").slideUp()
			$("#question2").css("position","static")
			$("body").css("padding-top","0")
		//Otherwise, slide the answer panel down and watch the scroll so the question can be fixed if it reaches top
		}else{
			// Slide the answer panel down
			$("#answerspanel2").slideDown()
			// Store the position of the question
			var question2Position = $("#question2").offset().top
			console.log(question2Position)
			// Start taking note of the scroll position
			$( window ).scroll(
				function(e){
					console.log($( window ).scrollTop() >= question2Position)
					// If the position of question2 hits the top
					if($("#question2").css("position") == "static"){
						if($( window ).scrollTop() >= question2Position){
							$("#question2").css("position","fixed") // Make it fixed
							$("body").css("padding-top",parseInt($("#question2").height()) + parseInt($("#question2").css("padding-top")) + "px")
						}
					}else if ($("#question2").css("position") == "fixed"){
						if($( window ).scrollTop() < question2Position){
							$("#question2").css("position","static") // Unfix it
							$("body").css("padding-top","0")
						}
					}
				}
			)

		}
	}
)

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





