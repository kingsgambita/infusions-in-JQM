


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
	
    var weight = $('#weight').val();
	var weightKg = (weight+" kg");
    $('#weight-rep').val(weightKg);
	
	var bolus = $('#bolus').val();
	var dose = roundToOne(bolus*weight);
	
	var doseVol = roundToTwo(dose/1000);
	var actualDose = doseVol*1000;
	var diffDose = dose-actualDose;
	if (diffDose===0){
		calcRepRound=""
	}
	else{
		calcRepRound="\nDue to rounding, prescribe "+actualDose+" micrograms morphine"
	}
	
	
	var doseBox="Draw  "+doseVol+" ml of this 1 mg/mL solution in a 1ml syringe and dilute to 0.5 ml with normal saline (in a 3ml syringe)";
	
	var calcRep=bolus+" micrograms/kg = "+dose+" micrograms morphine."+calcRepRound;
	var finalDose;
	
	var dosePerKg=roundToOne(dose*weight);
	
	switch (doseVol<0.1){
	case (true):
		$("#morphWarn").removeAttr("class","noScreenorPrint");
		break;
	case (false):
		$("#morphWarn").attr("class","noScreenorPrint");
		break;
	
	}
	
	
	$('#calcRep').val(calcRep);
	$('#prepRep').val(stepOne);
	$('#doseRep').val(doseBox);
	$('#noteRep').val(note);
	$('#warningRep').val(warningBox);
	
	
	
	
    $.mobile.pageContainer.pagecontainer("change", "#theReport");
};
};


function dateFunction() {
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
}		


