
function roundToThree(num) {    
    return +(Math.round(num + "e+3")  + "e-3");
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

function roundToOne(num) {    
    return +(Math.round(num + "e+1")  + "e-1");
}

function roundToZero(num) {    
    return +(Math.round(num + "e+0")  + "e-0");
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

    if (weight > maxDoubleWeight) {//clean out the strength options then add in those from the strengthValues array
	 $("#strength").find('option').remove();
     $(selectValues[0]).each(function (key, value) {
         $.each(selectValues[0], function (key, value) {
             strengthSelect
			 .append($("<option></option>")
			 .attr("value", key)
			 .text(value));
         });
     });
	strengthSelect.find('option:contains(' + selectValues[0].quad + ')').remove();//then remove quad
	strengthSelect.find('option:contains(' + selectValues[0].double + ')').remove();	//then remove double	
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
	strengthSelect.find('option:contains(' + selectValues[0].quad + ')').remove();		//now only quad gets removed
	strengthSelect.val('Single');
	strengthSelect.selectmenu("refresh");		
    } 
	
	else {
        $("#strength").find('option').remove();		//now all get removed, then reinserted
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
	if($("#formStepTwo").valid()) {
		
		$("#mono").attr("href",""+monograph);
		
	
    var name = $('#nameTwo').val();
    $('#name-rep').val(name);
	
    var nhi = $('#nhiTwo').val();
    $('#nhi-rep').val(nhi);
	
    var weight = $('#weightTwo').val();
	var weightKg = (weight+" kg");
    $('#weight-rep').val(weightKg);
	
	var infusionFluid = $('#fluid').val();
	$('#fluid-rep').val(infusionFluid);
	
	var infusionStrength = $('#strength').val();
	
	var infusionStrengthText=$( "#strength option:selected" ).text();
	$('#strength-rep').val(infusionStrengthText);
	
	switch (infusionStrengthText){	// places the correct delivery text depecding on strength, and adds warning class if not single - which currently has the effect of making stregth field bold and red text. 
	case "Single":
		strengthMultiple=1;
		deliveryBox=delBoxSingle;
		$("#strength-rep").removeAttr("class","warning");//possibly responsible for issues with IE??
		break;
	case "Double":
		strengthMultiple=2;
		deliveryBox=delBoxDouble;
		$("#strength-rep").attr("class","warning");
		break;
	case "Quad":
		strengthMultiple=4;
		deliveryBox=delBoxQuad;
		$("#strength-rep").attr("class","warning");
		break;
	}
	
	targetAmount = roundToTwo(weight*strengthMultiple*multiple);
	if (targetAmount>(ampAmount/ampVolume)){		//when the target amount is more than one millilitre worth of drug, the rounding of actualVol is only to one decimal place
		actualVol = roundToOne(targetAmount/(ampAmount/ampVolume));	
	}
	else{actualVol = roundToTwo(targetAmount/(ampAmount/ampVolume));}//otherwise it is rounded to two decimal places
	
	
	actualAmount = roundToTwo(ampAmount*actualVol/ampVolume);
	diluentVol=roundToOne(syringeVol-actualVol);
	solutionConc = roundToThree(actualAmount/syringeVol);
	
	switch (actualVol<0.1){		//when the actualVol drawn from ampoule is less than 0.1 mL, a warning field is added to reports to warn about risk of 10 fold error
	case (true):
		$("#morphWarn").removeAttr("class","noScreenorPrint");
		break;
	case (false):
		$("#morphWarn").attr("class","noScreenorPrint");
		break;
	}
	
	
		
	
	preparationBox="Add "+actualVol+ " mL ("+actualAmount+" "+ampAmtUnits+") of "+drugName+" ("+ampDescription+") to "+diluentVol+" mL of "+infusionFluid+ "\nThis will give "+syringeVol+ " mL of a "+solutionConc+" "+ampAmtUnits+ "/mL ("+solutionConc*1000+" "+amtUnitThousandth+"/mL) solution of "+drugName;
	
	
	bolus50Vol=roundToOne(((weight*50)/solutionConc)/1000);//the volume of a 50 microgram per kg bolus
	bolus100Vol=roundToOne(((weight*100)/solutionConc)/1000);//the volume of a 100 microgram per kg bolus
	
	bolusBox="Bolus 50 micrograms/kg (after rounding) = "+roundToZero(bolus50Vol*solutionConc*1000)+" micrograms = "+bolus50Vol+" mL\nBolus 100 micrograms/kg (after rounding) = "+roundToZero(bolus100Vol*solutionConc*1000)+" micrograms = "+bolus100Vol+" mL"
	
	;
	
	if(alwaysStable > 0){
		stabilityDuration=standardStability;
		stabilityBox="This infusion has a "+standardStabilityHour+"-hour stability";
		$("#stabilityRep").removeAttr("class","warning");
	}
	
	else
	
	if(solutionConc>stabThreshold){
		stabilityDuration=0;
		stabilityBox="This infusion has a concentration of "+solutionConc+ " "+ampAmtUnits+"/mL which is greater than the stability threshold of "+stabThreshold+" "+ampAmtUnits+"/mL.\nThe infusion is unstable and MUST NOT be used without discussion with SMO and/or Pharmacist.";
		$("#stabilityRep").attr("class","warning");}
		else{
		stabilityDuration=standardStability;	
stabilityBox="This infusion has a concentration of "+solutionConc+ " "+ampAmtUnits+"/mL which is not greater than the stability threshold of "+stabThreshold+" "+ampAmtUnits+"/mL.\nThe infusion has a "+standardStabilityHour+"-hour stability";
$("#stabilityRep").removeAttr("class","warning");
}
	
	$('#prepRep').val(preparationBox);
	$('#deliveryRep').val(deliveryBox);
	$('#bolusRep').val(bolusBox);
	$('#stabilityRep').val(stabilityBox);
	$('#warningRep').val(warningBox);
	$('#datePrep').val(datePrep);	
	$('#dateExp').val(dateExp);
	
		
		
	
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


