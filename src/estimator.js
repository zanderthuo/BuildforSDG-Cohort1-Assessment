const covid19ImpactEstimator = (data) => {
  //input in data

  //Destructuring data
  const{
    timeToElapse,
    reportedCases,
    totalHospitalBeds
  } = data;

  // Destructuring the region of given data
  const {
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
  } = region;

  //calculate infectionsByRequestedTime
  const calculateInfectionsByRequestedTime = (currentlyInfected) => {
    const factor = parseInt(timeToElapse / 3);
    return currentlyInfected * (2 ** factor);      
  };

  //calculate AvailableBeds
  const calculateAvailableBeds = (severeCasesByRequestedTime) => {
    const bedsAvailable = totalHospitalBeds * 0.35;
    const shortage = bedsAvailable - severeCasesByRequestedTime;
    const result = shortage < 0 ? shortage : bedsAvailable;
     return parseInt(result);    
  };

  //best case estimation
  const impact = {};

  //challenge 1
  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = calculateInfectionsByRequestedTime(impact.currentlyInfected);
  //challenge 2
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  impact.hospitalBedsByRequestedTime = calculateAvailableBeds(impact.severeCasesByRequestedTime);
  //challenge 3
  impact.casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  impact.casesFprVentilatorsByRequestedTime = impact.infectionsByRequestedTime * 0.02;
  impact.dollarsInFlight = impact.infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD * timeToElapse;

  //the severe case estimation
  const severeImpact = {};

  //challenge 1
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = calculateInfectionsByRequestedTime(severeImpact.currentlyInfected);
  //challenge 2
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
  severeImpact.hospitalBedsByRequestedTime = calculateAvailableBeds(severeImpact.severeCasesByRequestedTime);
  //challenge 3
  severeImpact.casesForICUByRequestedTime = severeImpact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForVentilatorsByRequestedTime = severeImpact.infectionsByRequestedTime * 0.02;
  severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD * timeToElapse;
  
  return {
   data,
   impact,
   severeImpact
  };

}

export default covid19ImpactEstimator;