


function formSubmission() {
	$("#formInput").valid()
	if($("#formInput").valid()) {
	
    var name = $('#surName').val();
    $('#name-rep').val(name);
	
    var nhi = $('#NHI').val();
    $('#nhi-rep').val(nhi);
	
    var weight = $('#weight').val();
    $('#weight-rep').val(weight);
	
    $.mobile.pageContainer.pagecontainer("change", "#dopaminereport");
};
};


	
		
	   