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
		var selectValues = [{"single": "Single", "double": "Double", "quad": "Quad", "octo": "8-times"}];

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
		strengthSelect.find('option:contains(' + selectValues[0].octo + ')').remove();//then remove octo 
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
		strengthSelect.find('option:contains(' + selectValues[0].octo + ')').remove();//then remove octo  
		strengthSelect.find('option:contains(' + selectValues[0].quad + ')').remove();		//and quad gets removed
		strengthSelect.val('Single');
		strengthSelect.selectmenu("refresh");		
	    } 
	
	
		else if (weight > maxOctoWeight) {
		 $("#strength").find('option').remove();
	     $(selectValues[0]).each(function (key, value) {
	         $.each(selectValues[0], function (key, value) {
	             strengthSelect
				 .append($("<option></option>")
				 .attr("value", key)
				 .text(value));
	         });
	     });
		strengthSelect.find('option:contains(' + selectValues[0].octo + ')').remove();//then remove octo  
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
	$("#formStepTwo").valid();
	var weightTest = $('#weightTwo').val();
	if($("#formStepTwo").valid()  && (weightTest>0)) {	//see if weightTest is > zero: if so flip back to stepOne. This handles situation where refresh and then page back from report causes empty fields
		
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
	
	switch (infusionStrengthText){	// places the correct delivery text depending on strength, and adds warning class if not single - which currently has the effect of making stregth field bold and red text. 
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
	case "8-times":
		strengthMultiple=8;
		window.alert("You selected 8-times strength "+drugName+"!");
		deliveryBox=delBoxOcto;
		$("#strength-rep").attr("class","warning");	
		break;
	}
	
	targetAmount = roundToTwo(weight*strengthMultiple*multiple);
	
	if (targetAmount>(ampAmount/ampVolume)){		//when the target amount is more than one millilitre worth of drug, the rounding of actualVol is only to one decimal place and the rounding of solutionConc to two
		actualVol = roundToOne(targetAmount/(ampAmount/ampVolume));
		sessionStorage.setItem("actualVol", actualVol);
		actualAmount = roundToOne(ampAmount*actualVol/ampVolume);
		diluentVol=roundToOne(syringeVol-actualVol);
		solutionConc = roundToTwo(actualAmount/syringeVol);	
			
	}
	else
		{actualVol = roundToTwo(targetAmount/(ampAmount/ampVolume));
		sessionStorage.setItem("actualVol", actualVol);
		actualAmount = roundToOne(ampAmount*actualVol/ampVolume);
		diluentVol=roundToOne(syringeVol-actualVol);
		solutionConc = roundToThree(actualAmount/syringeVol);	
	}//otherwise actualVol is rounded to two decimal places and solutionConc to three
	
	
	switch (0 < actualVol && actualVol <0.1){		//when the actualVol drawn from ampoule is less than 0.1 mL, a warning field is added to reports to warn about risk of 10 fold error
	case (true):
		$("#loVolWarn").removeAttr("class","noScreenorPrint");
		break;
	case (false):
		$("#loVolWarn").attr("class","noScreenorPrint");
		break;
	}
	
	
	var thousandthsPrep;	//whether or not to include the conversion to 1000ths of units in the preparationBox
	
	if (useThousandths>0){
	thousandthsPrep = "("+solutionConc*1000+" "+amtUnitThousandth+"/mL) ";}
	else{
		thousandthsPrep="";
	}
	
	preparationBox="Add "+actualVol+ " mL ("+actualAmount+" "+ampAmtUnits+") of "+drugName+" ("+ampDescription+") to "+diluentVol+" mL of "+infusionFluid+uniquePrepMessage+ "\nThis will give "+syringeVol+ " mL of a "+solutionConc+" "+ampAmtUnits+ "/mL "+thousandthsPrep+ "solution of "+drugName;
	
	bolus50Vol=roundToOne(((weight*50)/solutionConc)/1000);//the volume of a 50 microgram per kg bolus
	bolus100Vol=roundToOne(((weight*100)/solutionConc)/1000);//the volume of a 100 microgram per kg bolus
	
	bolusBox="Bolus 50 micrograms/kg (after rounding) = "+roundToZero(bolus50Vol*solutionConc*1000)+" micrograms = "+bolus50Vol+" mL\nBolus 100 micrograms/kg (after rounding) = "+roundToZero(bolus100Vol*solutionConc*1000)+" micrograms = "+bolus100Vol+" mL"
	;
	
	if(weight > diluteWeightThreshold){
		diluteBox=diluteMessageOneA+infusionFluid+diluteMessageOneB;
	}
	else{
		diluteBox=diluteMessageTwoA+infusionFluid+diluteMessageTwoB;
	}
	
	
	if(alwaysStable > 0){
		stabilityDuration=standardStability;
		stabilityBox="This infusion has a "+standardStabilityHour+"-hour stability. "+uniqueStabMessage+"";
		//$("#stabilityRep").removeAttr("class","warning"); //this code causes resize bug on textbox 
	}
	
	else
	
	if(solutionConc>stabThreshold){
		stabilityDuration=0;
		stabilityBox="This infusion has a concentration of "+solutionConc+ " "+ampAmtUnits+"/mL which is greater than the stability threshold of "+stabThreshold+" "+ampAmtUnits+"/mL.\nThe infusion is unstable and MUST NOT be used without discussion with SMO and/or Pharmacist.";
		$("#stabilityRep").attr("class","warning");}
		else
		
		if(solutionConc>intermedStabThreshold){
			stabilityDuration=standardStability*intermedStabilityFactor;
			stabilityBox="This infusion has a concentration of "+solutionConc+ " "+ampAmtUnits+"/mL which is greater than the intermediate stability threshold of "+intermedStabThreshold+" "+ampAmtUnits+"/mL."+intermedStabMessage+"";
			//$("#stabilityRep").attr("class","warning");}
			else{
			stabilityDuration=standardStability;	
	stabilityBox="This infusion has a concentration of "+solutionConc+ " "+ampAmtUnits+"/mL which is not greater than the stability threshold of "+intermedStabThreshold+" "+ampAmtUnits+"/mL. The infusion has "+standardStabilityHour+"-hour stability";
	//$("#stabilityRep").removeAttr("class","warning");//this code causes resize bug on textbox 
	};
	
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
	
	
	$('#diluteRep').val(diluteBox);
	$('#prepRep').val(preparationBox);
	$('#deliveryRep').val(deliveryBox);
	$('#bolusRep').val(bolusBox);
	$('#stabilityRep').val(stabilityBox);
	$('#loVolwarningRep').val(loVolwarningBox);
	$('#warningRep').val(warningBox);
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
			}		//to add in - same idea to replenish other warnings
		window.print();
		break;
	case (false):
		window.alert("We're sorry - something has gone wrong...\nReturning to home screen.");
		$.mobile.pageContainer.pagecontainer("change", "#stepOne");
		break;
	}
}



