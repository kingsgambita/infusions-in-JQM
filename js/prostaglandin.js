
// Global pre-defined infusion variables

var drugName = "Prostaglandin E1";
var drugPurpose;	//only used where drug calculations differ according to purpose eg insulin
var ampVolume=1;	//drug ampoule volume
var ampVolUnits="mL"; //units of ampoule volume
var ampAmount=50;	//amount of drug in ampoule
var ampAmtUnits="micrograms";	//units of mass of ampoule drug amount
var amtUnitThousandth="nanograms";	//the mass unit = to 1/1000 of ampAmtUnits
var useThousandths=1;	//if report to include reference to ampUnitThousandths set value to 1. Otherwise set value to zero
var alwaysStable=1;		//if no stability implications set value to 1. Otherwise 0. If = 1 this will bypass the stability calculations and return a standard message to stabilityBox
var stabThreshold;	//stability threshold in mg/mL if known
var intermedStabThreshold;	//the intermediate stability threshold in mg/mL where a higher threshold may be permitted with warnings. Set to the same value as stabThreshold if not required.
var intermedStabilityFactor=1;	//multiple (usually not greater than 1)applied to standardStability when intermediate stability exceeded
var syringeVol=50;		//usually will be 50 mL
var multiple = 150;
var maxDoubleWeight = 0;	//the greatest weight for which double strength remains within the stability limits or otherwise permitted. Set to zero if double strength never permitted.
var maxQuadWeight = 0;		//the greatest weight for which quad strength remains within the stability limits or otherwise permitted. set to zero if quad strength never allowed.
var maxOctoWeight = 0;		//the greatest weight for which octo strength remains within the stability limits or otherwise permitted. set to zero if octo strength never allowed.
var delBoxSingle= "0.1 mL/hr\t = 0.005 micrograms/kg/min\t = 5 nano-gm/kg/min \n0.5 mL/hr\t = 0.025 micrograms/kg/min\t = 25 nano-gm/kg/min\n1 mL/hour\t = 0.05  micrograms/kg/min\t = 50 nano-gm/kg/min \n2 mL/hour\t = 0.1  micrograms/kg/min  \t =  100 nano-gm/kg/min";//the delivery results when single strength infusion selected
var delBoxDouble= "";
var delBoxQuad= "";//the delivery results when quad strength infusion selected
var standardStability=1; //the number of days the solution is stable at standard concentration range
var infusionValues = [{"Dextrose 5%": "Dextrose 5%","Normal Saline":"Normal Saline"}]; //the available infusion fluids for this drug, as an array with key and value. These will be loaded by the function setInfusionValues
var uniqueStabMessage="";//any additional stability instructions

var monograph="http://silentone/content/capitalDoc/310_Women_and_Children_s_Health/05_NICU/08_Drug_monographs/A_to_C/000000001860/__file__/000000001860.DOC";//link to monograph
// Global calculated infusion variables

var ampDescription = ampAmount+" "+ampAmtUnits+" per " +ampVolUnits;
var strengthMultiple;	//ie single = 1, double = 2, quad = 4
var targetAmount;	//(weight*strengthMultiple*multiple) rounded to 1 decimal place
var actualAmount;	//(ampAmount*actualVol/ampVolume) rounded to 1 decimal place. This is the actual amount of drug added to the syringe.
var actualVol;	//(targetAmount/(ampAmount/ampVolume)) rounded to 1 decimal place. This is the actual volume of drug to add to the syringe.
var diluentVol;	//(syringeVol-actualVol) rounded to 1 decimal place
var diluteBox; ///the message in the report re dilution phase of preparation (applies to prosta)
var diluteWeightThreshold=3.349;
var diluteMessageOneA="Break open two ampoules of Prostaglandin E1 (500 micrograms in 1 mL) and withdraw 2 mL (1000 micrograms) using a filter needle. Dilute with 18 mL of " ;
var diluteMessageOneB=" to give 20 mL of a 50 microgram/mL solution.";
var diluteMessageTwoA="Break open one ampoule of Prostaglandin E1 (500 micrograms in 1 mL) and withdraw 1 mL (500 micrograms) using a filter needle. Dilute with 9 mL of ";
var diluteMessageTwoB=" to give 10 mL of a 50 microgram/mL solution.";
var preparationBox; //the message in the report re preparation
var uniquePrepMessage="";//any additional preparation instructions (eg used in inshyperkal)
var deliveryBox;	//the message in the report re delivery
var loVolwarningBox="Caution: risk of 10-fold error. Volume to draw from ampoule is less than 0.1 mL";
var warningBox;
var solutionConc;	//calculated drug concentration in syringe
var stabilityBox;//the message in the report re stability
var datePrep;//the time and date of report preparation
var dateExp;//the time and date of solution expiration
var stabilityDuration; //the calculated stability in days of the solution once prepared - may be zero or one in the case of dopamine
var standardStabilityHour=standardStability*24; //the number of hours the solution is stable at standard concentration range
var stable;//boolean expression of stability
var solutionDescription; //a variable which is not used but could be - to concatenate the description assembled for the prep report


