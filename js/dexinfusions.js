
function roundHalf(num) {
    num = Math.round(num*2)/2;
    return num;
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
	var infusionFluidText=$( "#fluid option:selected" ).text();
	syringeVol=infusionFluid;
	
	$('#fluid-rep').val(infusionFluidText);
	
	var infusionStrength = $('#strength').val();
	
	var infusionStrengthText=$( "#strength option:selected" ).text();
	$('#strength-rep').val(infusionStrengthText);
	
	switch (infusionStrength<10){
	case true:
		actualVol=roundToOne((infusionStrength-5)*(infusionFluid/45));
		secondaryFluid="Dextrose 5% (500 mL IV solution in viaflex bag)";
		diluentVol=roundToOne(syringeVol-actualVol);
		secondaryAmount=roundToTwo(diluentVol*5/100);
		break;
	case false:
		actualVol = roundToOne((infusionStrength-10)*(infusionFluid/40));
		secondaryFluid="Dextrose 10% (500 mL IV solution in viaflex bag)";
		diluentVol=roundToOne(syringeVol-actualVol);
		secondaryAmount=roundToTwo(diluentVol*10/100);	
		break;
	}
	
	targetAmount = roundToOne(weight*strengthMultiple*multiple);
	actualAmount = roundToOne(ampAmount*actualVol/ampVolume);
	diluentVol=roundToOne(syringeVol-actualVol);
	solutionConc = roundHalf((actualAmount+secondaryAmount)*100/syringeVol);	
	
	preparationBox="Add "+actualVol+ " mL ("+actualAmount+" "+ampAmtUnits+") of "+ampName+" ("+ampDescription+") to "+diluentVol+" mL of "+secondaryFluid+ "\nThis will give "+syringeVol+ " mL of a "+solutionConc+" % ("+solutionConc+" grams per 100 mL) solution of "+drugName;
	
	
	switch (infusionStrength<14){
	case true:
		$("#dexWarn").attr("class","noPrint noScreen");
		break;
	case false:
		$("#dexWarn").removeAttr("class","noPrint noScreen");
		break;
	}
	
	
	
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
	$('#stabilityRep').val(stabilityBox);
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


