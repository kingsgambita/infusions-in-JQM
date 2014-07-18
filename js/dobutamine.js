
// Global pre-defined infusion variables

var drugName = "Dobutamine";
var drugPurpose;	//only used where drug calculations differ according to purpose eg insulin
var ampVolume=20;	//drug ampoule volume
var ampVolUnits="mL"; //units of ampoule volume
var ampAmount=250;	//amount of drug in ampoule
var ampAmtUnits="mg";	//units of mass of ampoule drug amount
var amtUnitThousandth="micrograms";	//the mass unit = to 1/1000 of ampAmtUnits
var alwaysStable=0;		//if no stability implications set value to 1. Otherwise 0. If = 1 this will bypass the stability calculations and return a standard message to stabilityBox
var stabThreshold=5;	//stability threshold in mg/mL
var syringeVol=50;		//usually will be 50 mL
var multiple = 30;
var maxDoubleWeight = 4.160;	//the greatest weight for which double strength remains within the stability limits
var maxQuadWeight = 2.080;		//the greatest weight for which quad strength remains within the stability limits
var delBoxSingle= "0.1 mL/hour = 1 micrograms/kg/minute \n0.5 mL/hour = 5 micrograms/kg/minute \n1 mL/hour = 10 micrograms/kg/minute \n2 mL/hour = 20 micrograms/kg/minute";//the delivery results when single strength infusion selected
var delBoxDouble= "0.1 mL/hour = 2 micrograms/kg/minute \n0.5 mL/hour = 10 micrograms/kg/minute \n1 mL/hour = 20 micrograms/kg/minute";
var delBoxQuad= "0.1 mL/hour = 4 micrograms/kg/minute \n0.5 mL/hour = 20 micrograms/kg/minute";//the delivery results when quad strength infusion selected
var standardStability=1; //the number of days the solution is stable at standard concentration range
var infusionValues = [{"Dextrose 5%": "Dextrose 5%", "Dextrose 10%": "Dextrose 10%","Normal Saline":"Normal Saline"}]; //the available infusion fluids for this drug, as an array with key and value. These will be loaded by the function setInfusionValues
var monograph="http://silentone/content/capitalDoc/310_Women_and_Children_s_Health/05_NICU/08_Drug_monographs/D_to_F/000000001835/__file__/000000001835.DOC";//link to monograph
// Global calculated infusion variables

var ampDescription = ampAmount+" "+ampAmtUnits+" in " +ampVolume+ " "+ampVolUnits;
var strengthMultiple;	//ie single = 1, double = 2, quad = 4
var targetAmount;	//(weight*strengthMultiple*multiple) rounded to 1 decimal place
var actualAmount;	//(ampAmount*actualVol/ampVolume) rounded to 1 decimal place. This is the actual amount of drug added to the syringe.
var actualVol;	//(targetAmount/(ampAmount/ampVolume)) rounded to 1 decimal place. This is the actual volume of drug to add to the syringe.
var diluentVol;	//(syringeVol-actualVol) rounded to 1 decimal place
var preparationBox; //the message in the report re preparation
var deliveryBox;	//the message in the report re delivery
var warningBox;
var solutionConc;	//calculated drug concentration in syringe
var stabilityBox;//the message in the report re stability
var datePrep;//the time and date of report preparation
var dateExp;//the time and date of solution expiration
var stabilityDuration; //the calculated stability in days of the solution once prepared - may be zero or one in the case of dopamine
var standardStabilityHour=standardStability*24; //the number of hours the solution is stable at standard concentration range
var stable;//boolean expression of stability
var solutionDescription; //a variable which is not used but could be - to concatenate the description assembled for the prep report


