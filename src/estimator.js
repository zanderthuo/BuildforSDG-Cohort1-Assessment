/* eslint-disable max-len */
/* eslint-disable indent */
const covid19ImpactEstimator = (data) => {
    // input in data
  
    // Destructuring data
    const {
      // region,
      // periodType,
      timeToElapse,
      reportedCases
      // population,
      // totalHospitalBeds
    } = data;
  
    // Destructuring the region of given data
  //   const {
  //     name,
  //     avgAge,
  //     avgDailyIncomeInUSD,
  //     avgDailyIncomePopulation
  //   } = region;
  
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
  
  
    // the severe case estimation
    const severeImpact = {};
    // challenge 1
    severeImpact.currentlyInfected = reportedCases * 50;
    severeImpact.infectionsByRequestedTime = calculateInfectionsByRequestedTime(severeImpact.currentlyInfected);
  
    return {
      data,
      impact,
      severeImpact
    };
  };
  export default covid19ImpactEstimator;
  