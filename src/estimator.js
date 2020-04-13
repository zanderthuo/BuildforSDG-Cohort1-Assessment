/* eslint-disable max-len */
/* eslint-disable indent */

const covid19ImpactEstimator = (data) => {
    // input in data
  
    // Destructuring data
  const {
    timeToElapse,
    reportedCases
  } = data;
  

    //    calculate InfectionsByRequestedTime
  const calculateInfectionsByRequestedTime = (currentlyInfected) => {
      // eslint-disable-next-line radix
    const factor = parseInt(timeToElapse / 3);
    return currentlyInfected * (2 ** factor);
  };
  
    // best case estimation
  const impact = {};
  
    // challenge 1
  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = calculateInfectionsByRequestedTime(impact.currentlyInfected);
  //challenge 2
  impact.servereCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  impact.hospitalBedsByRequestedTime = calculateAvailableBeds(impact.severeCasesByRequestedTime);
  
  
    // the severe case estimation
  const severeImpact = {};
    // challenge 1
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = calculateInfectionsByRequestedTime(severeImpact.currentlyInfected);
  // challenge 2
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;
  severeImpact.hospitalBedsByRequestedTime = calculateAvailableBeds(severeImpact.severeCasesByRequestedTime);
 
  return {
    data,
    impact,
    severeImpact
  };
};
export default covid19ImpactEstimator;  