
// Global pre-defined infusion variables

var drugName = "Morphine";
var drugPurpose;	//only used where drug calculations differ according to purpose eg insulin
var ampVolume;	//drug ampoule volume
var ampVolUnits; //units of ampoule volume
var ampAmount;	//amount of drug in ampoule
var ampAmtUnits="mg";	//units of mass of ampoule drug amount
var amtUnitThousandth="micrograms";	//the mass unit = to 1/1000 of ampAmtUnits
var alwaysStable=1;		//if no stability implications set value to 1. Otherwise 0. If = 1 this will bypass the stability calculations and return a standard message to stabilityBox
var stabThreshold;	//stability threshold in mg/mL
var syringeVol;		//usually will be 50 mL
var multiple;
var maxDoubleWeight;	//the greatest weight for which double strength remains within the stability limits or otherwise permitted. Set to zero if double strength never permitted.
var maxQuadWeight;		//the greatest weight for which quad strength remains within the stability limits or otherwise permitted. set to zero if quad strength never allowed.
var doseBoxA = "For term infants over one week postnatal age the standard gentamicin dose is 7.5 mg/kg every 24 hours.";//the dosing rules when CGA>38 weeks, and postnatal age > 7 days
var doseBoxB= "For term infants less than one week postnatal age the standard gentamicin dose is 5 mg/kg every 24 hours.";//the dosing rules when CGA>37 weeks, and postnatal age < 7 days
var doseBoxC= "Between 30+0 and 36+6 corrected gestational age the standard gentamicin dose is 3.5 mg/kg every 24 hours.";//the dosing rules when CGA 30 - 36+6 weeks
var doseBoxD= "Below 30 weeks corrected gestational age the standard gentamicin dose is 2.5 mg/kg every 24 hours.";//the dosing rules when CGA<30 weeks
var doseBoxE= "For infants beyond Term + 4 weeks discuss dosing with Pharmacist and / or SMO";//the dosing rules when beyond Term + 4 weeks

var delBoxDouble;
var delBoxQuad;//the delivery results when quad strength infusion selected
var standardStability; //the number of days the solution is stable at standard concentration range
var infusionValues; //the available infusion fluids for this drug, as an array with key and value. These will be loaded by the function setInfusionValues
var monograph="http://silentone/content/capitalDoc/310_Women_and_Children_s_Health/05_NICU/08_Drug_monographs/L_to_N/000000001806/__file__/000000001806.DOC";//link to monograph
// Global calculated infusion variables

var ampDescription = ampAmount+" "+ampAmtUnits+" in " +ampVolume+ " "+ampVolUnits;
var strengthMultiple;	//ie single = 1, double = 2, quad = 4
var targetAmount;	//(weight*strengthMultiple*multiple) rounded to 1 decimal place
var actualAmount;	//(ampAmount*actualVol/ampVolume) rounded to 1 decimal place. This is the actual amount of drug added to the syringe.
var actualVol;	//(targetAmount/(ampAmount/ampVolume)) rounded to 1 decimal place. This is the actual volume of drug to add to the syringe.
var diluentVol;	//(syringeVol-actualVol) rounded to 1 decimal place
var preparationBox; //the message in the report re preparation
var deliveryBox;	//the message in the report re delivery
var warningBox="Caution: risk of 10-fold error. Volume to draw at Step Two is less than 0.1 mL";
var note = "Administer this 0.5 mL as slow IV push over 5 – 10 minutes followed by saline flush ie Morphine together with flush should not be administered faster than over 5 – 10 minutes";
var solutionConc;	//calculated drug concentration in syringe
var stabilityBox;//the message in the report re stability
var datePrep;//the time and date of report preparation
var dateExp;//the time and date of solution expiration
var stabilityDuration=4; //the calculated stability in days of the solution once prepared - may be zero or one in the case of dopamine
var standardStabilityHour=standardStability*24; //the number of hours the solution is stable at standard concentration range
var stable;//boolean expression of stability
var solutionDescription; //a variable which is not used but could be - to concatenate the description assembled for the prep report
var stepOne = "Draw up 1 mL Morphine (10 mg/ml ampoule) and 9 ml NaCl into a 10 mL syringe to give a total volume 10 ml. The morphine concentration in the 10 ml syringe is now 10 mg in 10 ml = 1 mg/ml = 1000 micrograms/ml";


