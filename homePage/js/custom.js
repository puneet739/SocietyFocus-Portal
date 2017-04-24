

$(window).load(function () {
    

	setTimeout(function(){
       
		$('.myModal').modal({
	    backdrop: 'static',
	    keyboard: false,
	    show: true
	});
   }, 3000);


});

$('#submitbtn').click(function(){

	$(this).modal({
	    show: false
	})

	$('.myModal1').modal({
	    backdrop: 'static',
	    keyboard: false,
	    show: true
	});

});
