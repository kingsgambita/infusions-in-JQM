$(document).bind('pageshow', function() {
$('#surName').focus();
});//autofocus the surName form element


function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

function roundToOne(num) {    
    return +(Math.round(num + "e+1")  + "e-1");
}

function roundToZero(num) {    
    return +(Math.round(num + "e+0")  + "e-0");
}

	


function stepOneSubmission() {
	$("#formInput").valid()
	if($("#formInput").valid()) {
		
	$("#mono").attr("href",""+monograph);	
	
	var name = $('#surName').val();
   $('#name-rep').val(name);
	
    var nhi = $('#NHI').val();
    $('#nhi-rep').val(nhi);
	var bigNHI=nhi.toUpperCase();
	
    var weight = $('#weight').val();
	var weightKg = (weight+" kg");
    $('#weight-rep').val(weightKg);
	
	var bolus = $('#bolus').val();
	var dose = roundToOne(bolus*weight);
	
	var doseVol = roundToTwo(dose/1000);
	sessionStorage.setItem("doseVol", doseVol);
	var actualDose = doseVol*1000;
	var diffDose = dose-actualDose;
	
	var requestSummary = "Name: "+name+"     NHI: "+bigNHI+"     Weight: "+weight+" kg\nMedication: "+drugName+"     Dose: "+bolus+" micrograms/kg";
	
	if (diffDose===0){
		calcRepRound=""
	}
	else{
		calcRepRound="\nDue to rounding, prescribe "+actualDose+" micrograms morphine"
	}
	
	
	var doseBox="Draw up "+doseVol+" ml of this 1 mg/mL solution and add to 0.5 ml NaCl";
	
	var calcRep=bolus+" micrograms/kg = "+dose+" micrograms morphine."+calcRepRound;
	var finalDose;
	
	var dosePerKg=roundToOne(dose*weight);
	
	
	switch (doseVol<0.1){
	case (true):
		$("#loVolWarn").removeAttr("class","noScreenorPrint");
		break;
	case (false):
		$("#loVolWarn").attr("class","noScreenorPrint");
		break;
	
	}
	var now     = new Date();
	var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var datePrep = day+'/'+month+'/'+year+' at '+hour+':'+minute;
	$('#datePrep').val(datePrep);
	
	var expiry = new Date(now.getTime() + (stabilityDuration*(24 * 60 * 60 * 1000)));	
	var year    = expiry.getFullYear();
    var month   = expiry.getMonth()+1; 
    var day     = expiry.getDate();
    var hour    = expiry.getHours();
    var minute  = expiry.getMinutes();
    var second  = expiry.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var dateExp = day+'/'+month+'/'+year+' at '+hour+':'+minute;
	$('#dateExp').val(dateExp);
	
	$('#calcRep').val(calcRep);
	$('#prepRep').val(stepOne);
	$('#doseRep').val(doseBox);
	$('#noteRep').val(note);
	$('#loVolwarningRep').val(loVolwarningBox);
	$('#requestSummary').val(requestSummary);
	
	
	
	
    $.mobile.pageContainer.pagecontainer("change", "#theReport");
};
};

function testWeight(){
	var weight = $('#weight-rep').val();
	var n = weight.length;
	
	switch (n>0){
	case (true):
			var doseVol = sessionStorage.getItem("doseVol");
			switch (0 < doseVol && doseVol <0.1){		//when the actualVol drawn from ampoule is less than 0.1 mL, a warning field is added to reports to warn about risk of 10 fold error
			case (true):
				$("#loVolWarn").removeAttr("class","noScreenorPrint");
				break;
			case (false):
				$("#loVolWarn").attr("class","noScreenorPrint");
				break;
			}
		window.print();

		break;
	case (false):
		window.alert("We're sorry - something has gone wrong...\nReturning to home screen.");
		$.mobile.pageContainer.pagecontainer("change", "#stepOne");
		break;
	}
}




