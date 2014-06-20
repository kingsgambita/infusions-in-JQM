
// Global infusion variables

var drugName = "Dopamine";
var drugPurpose;	//only used where drug calculations differ according to purpose eg insulin
var ampVolume=5;
var ampVolUnits="mL";
var ampAmount=200;
var ampAmtUnits="mg";
var ampDescription = ampAmount+" "+ampAmtUnits+" in " +ampVolume+ " "+ampVolUnits;
var stabThreshold=3.2;	//stability threshold in mg/mL
var syringeVol=50;		//usually will be 50 mL
var multiple = 30;
var strengthMultiple;	//ie single = 1, double = 2, quad = 4
var targetAmount;	//(weight*strengthMultiple*multiple) rounded to 1 decimal place
var actualAmount;	//(ampAmount*actualVol/ampVolume) rounded to 1 decimal place. This is the actual amount of drug added to the syringe.
var actualVol;	//(targetAmount/(ampAmount/ampVolume)) rounded to 1 decimal place. This is the actual volume of drug to add to the syringe.
var diluentVol;	//(syringeVol-actualVol) rounded to 1 decimal place
var preparationBox; 
var deliveryBox;
var delBoxSingle= "0.1 mL/hour = 1 micrograms/kg/minute \n0.5 mL/hour = 5 micrograms/kg/minute \n1 mL/hour = 10 micrograms/kg/minute \n2 mL/hour = 20 micrograms/kg/minute";//the delivery results when single strength infusion selected
var delBoxDouble= "0.1 mL/hour = 2 micrograms/kg/minute \n0.5 mL/hour = 10 micrograms/kg/minute \n1 mL/hour = 20 micrograms/kg/minute";
var delBoxQuad= "0.1 mL/hour = 4 micrograms/kg/minute \n0.5 mL/hour = 20 micrograms/kg/minute";//the delivery results when quad strength infusion selected
var solutionDescription;
var solutionConc;
var stabilityBox;
var reportPrepDate;
var reportExpDate;


function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

function roundToOne(num) {    
    return +(Math.round(num + "e+1")  + "e-1");
}


function setStrengthValues(){
	
	var maxDoubleWeight = 2.666;
	var maxQuadWeight = 1.333;
	
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
	if($("#formStepTwo").valid()) {
	
    var name = $('#nameTwo').val();
    $('#name-rep').val(name);
	
    var nhi = $('#nhiTwo').val();
    $('#nhi-rep').val(nhi);
	
    var weight = $('#weightTwo').val();
    $('#weight-rep').val(weight);
	
	var infusionFluid = $('#fluid').val();
	$('#fluid-rep').val(infusionFluid);
	
	var infusionStrength = $('#strength').val();
	
	var infusionStrengthText=$( "#strength option:selected" ).text();
	$('#strength-rep').val(infusionStrengthText);
	
	switch (infusionStrengthText){
	case "Single":
		strengthMultiple=1;
		deliveryBox=delBoxSingle;
		break;
	case "Double":
		strengthMultiple=2;
		deliveryBox=delBoxDouble;
		break;
	case "Quad":
		strengthMultiple=4;
		deliveryBox=delBoxQuad;
		break;
	}
	
	targetAmount = roundToOne(weight*strengthMultiple*multiple);
	actualVol = roundToOne(targetAmount/(ampAmount/ampVolume));	
	actualAmount = roundToOne(ampAmount*actualVol/ampVolume);
	diluentVol=roundToOne(syringeVol-actualVol);
	solutionConc = roundToTwo(actualAmount/syringeVol);	
	
	preparationBox="Add "+actualVol+ " mL ("+actualAmount+" mg) of "+drugName+" ("+ampDescription+") to "+diluentVol+" mL of "+infusionFluid+ "\nThis wil give "+syringeVol+ " mL of a "+solutionConc+" mg/mL ("+solutionConc*1000+" micrograms/mL) solution of "+drugName;
	
	
	
	if(solutionConc>stabThreshold){
		stabilityBox="This infusion has a concentration of "+solutionConc+ " mg/mL which is greater than the stability threshold of "+stabThreshold+" mg/mL.\nThe infusion is unstable and MUST NOT be used."}
		else{
stabilityBox="This infusion has a concentration of "+solutionConc+ " mg/mL which is not greater than the stability threshold of "+stabThreshold+" mg/mL.\nThe infusion has a 24-hour stability"}
	
	$('#prepRep').val(preparationBox);
	$('#deliveryRep').val(deliveryBox);
	$('#stabilityRep').val(stabilityBox);
		
		
	
    $.mobile.pageContainer.pagecontainer("change", "#theReport");
};
};

	
		
	   