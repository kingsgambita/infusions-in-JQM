
//a modification of the infusions js which  includes a mmol concentration variable (because calcium)  plus builds delivery report differently from the infusion2.js  because delivery varies per kg with this infusion 
$(document).bind('pageshow', function() {
$('#surName').focus();
});//autofocus the surName form element

function roundToThree(num) {    
    return +(Math.round(num + "e+3")  + "e-3");
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

function roundToOne(num) {    
    return +(Math.round(num + "e+1")  + "e-1");
}

function setInfusionValues(){
	var infusionSelect=$("#fluid");
	
	        $("#fluid").find('option').remove();//clean out the infusion options then add in those from the infusionValues array
	        $(infusionValues[0]).each(function (key, value) {
	            $.each(infusionValues[0], function (key, value) {
	            infusionSelect
				 .append($("<option></option>")
				 .attr("value", key)
				 .text(value));
	         });
	     });
	 	infusionSelect.selectmenu("refresh");
	};
	
function setStrengthValues(){
	
	var weight = $('#weight').val();
	var strengthSelect=$("#strength");
	var selectValues = [{"single": "Single", "double": "Double", "quad": "Quad"}];

    if (weight > maxDoubleWeight) {
	 $("#strength").find('option').remove();
     $(selectValues[0]).each(function (key, value) {
         $.each(selectValues[0], function (key, value) {
             strengthSelect
			 .append($("<option></option>")
			 .attr("value", key)
			 .text(value));
         });
     });
	strengthSelect.find('option:contains(' + selectValues[0].quad + ')').remove();
	strengthSelect.find('option:contains(' + selectValues[0].double + ')').remove();		
	strengthSelect.val('Single');
	strengthSelect.selectmenu("refresh");		
    } 
	
	else if (weight > maxQuadWeight) {
	 $("#strength").find('option').remove();
     $(selectValues[0]).each(function (key, value) {
         $.each(selectValues[0], function (key, value) {
             strengthSelect
			 .append($("<option></option>")
			 .attr("value", key)
			 .text(value));
         });
     });
	strengthSelect.find('option:contains(' + selectValues[0].quad + ')').remove();		
	strengthSelect.val('Single');
	strengthSelect.selectmenu("refresh");		
    } 
	
	else {
        $("#strength").find('option').remove();
        $(selectValues[0]).each(function (key, value) {
            $.each(selectValues[0], function (key, value) {
            strengthSelect
			 .append($("<option></option>")
			 .attr("value", key)
			 .text(value));
         });
     });
 	strengthSelect.val('Single');
 	strengthSelect.selectmenu("refresh");
	}		
};
	
	


function stepOneSubmission() {
	$("#formInput").valid()
	if($("#formInput").valid()) {
	
    var name = $('#surName').val();
    $('#nameTwo').val(name);
	
    var nhi = $('#NHI').val();
    $('#nhiTwo').val(nhi);
	
    var weight = $('#weight').val();
    $('#weightTwo').val(weight);
	
    $.mobile.pageContainer.pagecontainer("change", "#stepTwo");
};
};

function stepTwoSubmission() {
	$("#formStepTwo").valid()
	var weightTest = $('#weightTwo').val();
	if($("#formStepTwo").valid() && (weightTest>0)) {	//see if weightTest is > zero: if so flip back to stepOne. This handles situation where refresh and then page back from report causes empty fields
		
		$("#mono").attr("href",""+monograph);
		
	
    var name = $('#nameTwo').val();
    $('#name-rep').val(name);
	
    var nhi = $('#nhiTwo').val();
    $('#nhi-rep').val(nhi);
	var bigNHI=nhi.toUpperCase();
	
    var weight = $('#weightTwo').val();
	var weightKg = (weight+" kg");
    $('#weight-rep').val(weightKg);
	
	var infusionFluid = $('#fluid').val();
	$('#fluid-rep').val(infusionFluid);
	
	var infusionStrength = $('#strength').val();
	
	var infusionStrengthText=$( "#strength option:selected" ).text();
	$('#strength-rep').val(infusionStrengthText);
	
	var requestSummary = "Name: "+name+"     NHI: "+bigNHI+"     Weight: "+weight+" kg\nMedication: "+drugName+"     Strength: "+infusionStrengthText+"\nInfusion Fluid:    "+infusionFluid;
	
	switch (infusionStrengthText){
	case "Single":
		strengthMultiple=1;
		$("#strength-rep").removeAttr("class","warning");
		break;
	case "Double":
		strengthMultiple=2;
		$("#strength-rep").attr("class","warning");
		break;
	case "Quad":
		strengthMultiple=4;
		$("#strength-rep").attr("class","warning");
		break;
	}
	
	if (weight>volWeightThreshold){	//these lines introduce a multiple which comes into play when a larger infusion volume is required above a certain weight.
		volumeMultiple=10;
	}
	else{
		volumeMultiple=1;
	}
	
	targetAmount = roundToOne(strengthMultiple*multiple*volumeMultiple);
	actualVol = roundToTwo(targetAmount/(ampAmount/ampVolume));
	sessionStorage.setItem("actualVol", actualVol);	
	actualAmount = targetAmount;
	diluentVol=roundToOne((syringeVol*volumeMultiple)-actualVol);
	solutionConc = roundToTwo(actualAmount/(syringeVol*volumeMultiple));
	mmolConc = roundToThree(solutionConc*0.0022);
	
	switch (actualVol<0.1){		//when the actualVol drawn from ampoule is less than 0.1 mL, a warning field is added to reports to warn about risk of 10 fold error
	case (true):
		$("#loVolWarn").removeAttr("class","noScreenorPrint");
		break;
	case (false):
		$("#loVolWarn").attr("class","noScreenorPrint");
		break;
	}
	switch (drugName){	//switch between different drugName
		
	case "Calcium Gluconate":
	
	preparationBox="Add "+actualVol+ " mL ("+actualAmount+" "+ampAmtUnits+") of "+drugName+" ("+ampDescription+") to "+diluentVol+" mL of "+infusionFluid+ "\nThis will give "+(syringeVol*volumeMultiple)+ " mL of a "+solutionConc+" "+ampAmtUnits+ "/mL ("+mmolConc+" mmol/ml) solution of "+drugName;
	
	
	
	deliveryBox=roundToTwo(0.5*weight/(mmolConc*24))+" mL/hour = 0.5 mmol/kg/day"+
	"\n"+roundToTwo(0.75*weight/(mmolConc*24))+" mL/hour = 0.75 mmol/kg/day"+
	"\n"+roundToTwo(1*weight/(mmolConc*24))+" mL/hour = 1 mmol/kg/day"+
	"\n"+roundToTwo(1.25*weight/(mmolConc*24))+" mL/hour = 1.25 mmol/kg/day"+
	"\n"+roundToTwo(1.5*weight/(mmolConc*24))+" mL/hour = 1.5 mmol/kg/day"+
	"\n"+roundToTwo(1.75*weight/(mmolConc*24))+" mL/hour = 1.75 mmol/kg/day"
	;
	break;
	
	case "Actrapid Insulin":
		
	preparationBox="Add "+actualVol+ " mL ("+actualAmount+" "+ampAmtUnits+") of "+drugName+" ("+ampDescription+") to "+diluentVol+" mL of "+infusionFluid+ "\n\nThis wil give "+syringeVol+ " mL of a "+solutionConc+" "+ampAmtUnits+ "/mL solution of "+drugName;
	
	deliveryBox="0.1 mL/hour = "+roundToTwo(actualAmount/500)+" "+ampAmtUnits+" /hour = "+roundToThree((actualAmount/500)/weight)+" "+ampAmtUnits+" /kg/hour"+
	"\n0.5 mL/hour = "+roundToTwo(actualAmount/100)+" "+ampAmtUnits+" /hour = "+roundToThree((actualAmount/100)/weight)+" "+ampAmtUnits+" /kg/hour"+
	"\n\n Doses above 0.1 Units/kg/hour are seldom required"
	;
	break;
	}
	
	if(alwaysStable > 0){
		stabilityDuration=standardStability;
		stabilityBox="This infusion has a "+standardStabilityHour+"-hour stability";
	}
	
	else
	
	if(solutionConc>stabThreshold){
		stabilityDuration=0;
		stabilityBox="This infusion has a concentration of "+solutionConc+ " "+ampAmtUnits+"/mL which is greater than the stability threshold of "+stabThreshold+" "+ampAmtUnits+"/mL.\nThe infusion is unstable and MUST NOT be used without discussion with SMO and/or Pharmacist.";
		$("#stabilityRep").attr("class","warning");}
		else{
		stabilityDuration=standardStability;	
stabilityBox="This infusion has a concentration of "+solutionConc+ " "+ampAmtUnits+"/mL which is not greater than the stability threshold of "+stabThreshold+" "+ampAmtUnits+"/mL.\nThe infusion has a "+standardStabilityHour+"-hour stability";
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

	
	
	
	$('#prepRep').val(preparationBox);
	$('#deliveryRep').val(deliveryBox);
	$('#stabilityRep').val(stabilityBox);
	$('#loVolwarningRep').val(loVolwarningBox);
	$('#datePrep').val(datePrep);	
	$('#dateExp').val(dateExp);
	$('#requestSummary').val(requestSummary);
	
		
		
	
    $.mobile.pageContainer.pagecontainer("change", "#theReport");
}
else { 
	window.alert("We're sorry - something has gone wrong...\nReturning to home screen.");
	$.mobile.pageContainer.pagecontainer("change", "#stepOne");}

};


function testWeight(){
	var weight = $('#weight-rep').val();
	var n = weight.length;
	
	switch (n>0){
	case (true):
			var actualVol = sessionStorage.getItem("actualVol");
			switch (0 < actualVol && actualVol <0.1){		//when the actualVol drawn from ampoule is less than 0.1 mL, a warning field is added to reports to warn about risk of 10 fold error
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



