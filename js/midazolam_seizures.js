
// Global pre-defined infusion variables

var drugName = "Midazolam";
var drugPurpose;	//only used where drug calculations differ according to purpose eg insulin
var ampVolume=3;	//drug ampoule volume
var ampVolUnits="mL"; //units of ampoule volume
var ampAmount=15;	//amount of drug in ampoule
var ampAmtUnits="mg";	//units of mass of ampoule drug amount
var amtUnitThousandth="micrograms";	//the mass unit = to 1/1000 of ampAmtUnits
var useThousandths=1;	//if report to include reference to ampUnitThousandths set value to 1. Otherwise set value to zero
var alwaysStable=0;		//if no stability implications set value to 1. Otherwise 0. If = 1 this will bypass the stability calculations and return a standard message to stabilityBox
var stabThreshold=3.75;	//stability threshold in mg/mL (in this case a rather arbitrary figure)
var intermedStabThreshold=3;	//the intermediate stability threshold in mg/mL where a higher threshold may be permitted with warnings. Set to the same value as stabThreshold if not required.
var intermedStabilityFactor=0.5;	//multiple (usually not greater than 1)applied to standardStability when intermediate stability exceeded
var syringeVol=50;		//usually will be 50 mL
var multiple = 15;
var maxDoubleWeight = 6;	//the greatest weight for which double strength remains within the stability limits or otherwise permitted. Set to zero if double strength never permitted.
var maxQuadWeight = 0;		//the greatest weight for which quad strength remains within the stability limits or otherwise permitted. set to zero if quad strength never allowed.
var maxOctoWeight = 0;		//the greatest weight for which octo strength remains within the stability limits or otherwise permitted. set to zero if octo strength never allowed.
var delBoxSingle= "0.1 mL/hour = 0.5 micrograms/kg/minute \n0.5 mL/hour = 2.5 micrograms/kg/minute \n1 mL/hour = 5 micrograms/kg/minute ";//the delivery results when single strength infusion selected
var delBoxDouble= "0.1 mL/hour = 1 microgram/kg/minute \n0.5 mL/hour = 5 micrograms/kg/minute ";
var delBoxQuad= "";//the delivery results when quad strength infusion selected
var standardStability=2; //the number of days the solution is stable at standard concentration range
var infusionValues = [{"Dextrose 5%": "Dextrose 5%", "Dextrose 10%": "Dextrose 10%","Normal Saline":"Normal Saline"}]; //the available infusion fluids for this drug, as an array with key and value. These will be loaded by the function setInfusionValues
var uniqueStabMessage="";//any additional stability instructions
var intermedStabMessage="\nSolutions with concentration greater than "+intermedStabThreshold+" "+ampAmtUnits+"/mL are stable for 24 hours."

var monograph="http://silentone/content/capitalDoc/310_Women_and_Children_s_Health/05_NICU/08_Drug_monographs/L_to_N/000000001807/__file__/000000001807.DOC";//link to monograph
// Global calculated infusion variables

var ampDescription = ampAmount+" "+ampAmtUnits+" in " +ampVolume+ " "+ampVolUnits;
var strengthMultiple;	//ie single = 1, double = 2, quad = 4
var targetAmount;	//(weight*strengthMultiple*multiple) rounded to 1 decimal place
var actualAmount;	//(ampAmount*actualVol/ampVolume) rounded to 1 decimal place. This is the actual amount of drug added to the syringe.
var actualVol;	//(targetAmount/(ampAmount/ampVolume)) rounded to 1 decimal place. This is the actual volume of drug to add to the syringe.
var diluentVol;	//(syringeVol-actualVol) rounded to 1 decimal place
var diluteBox; ///the calculated message in the report re dilution phase of preparation (applies to prosta)
var diluteWeightThreshold;	//weight above which diluteMessageOne applies (prostin)
var diluteMessageOneA;	//first half of dilution message option one
var diluteMessageOneB;	//second half of dilution message option one
var diluteMessageTwoA;	//first half of dilution message option two
var diluteMessageTwoB;	//second half of dilution message option two
var preparationBox; //the message in the report re preparation; //the message in the report re preparation
var uniquePrepMessage="";//any additional preparation instructions (eg used in inshyperkal)
var deliveryBox;	//the message in the report re delivery
var loVolwarningBox="Caution: risk of 10-fold error. Volume to draw from ampoule is less than 0.1 mL";
var warningBox="Doses of 0.5 - 5 micrograms/kg/min represent anticonvulsant dose range.\nSee 'Midazolam for Sedation' calculator if sedation dosing required";
var solutionConc;	//calculated drug concentration in syringe
var stabilityBox;//the message in the report re stability
var datePrep;//the time and date of report preparation
var dateExp;//the time and date of solution expiration
var stabilityDuration; //the calculated stability in days of the solution once prepared - may be zero or one in the case of dopamine
var standardStabilityHour=standardStability*24; //the number of hours the solution is stable at standard concentration range
var stable;//boolean expression of stability
var solutionDescription; //a variable which is not used but could be - to concatenate the description assembled for the prep report


