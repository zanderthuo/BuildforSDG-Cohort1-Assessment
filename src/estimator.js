
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */

const covid19ImpactEstimator = (data) => {
  // input in data

  // Destructuring data
  const {
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds
  } = data;

  // Destructuring the region of given data
  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;

  const impact = {};
  const severeImpact = {};
  // Custom functions and variables

  // challenge 1
  impact.currentlyInfected = reportedCases * 10;
  severeImpact.currentlyInfected = reportedCases * 50;

  // normalize days; check for weeks and months if used
  let timeFactor;

  switch (periodType.trim().toLowerCase()) {
    case 'months':
      timeFactor = Math.trunc((timeToElapse * 30) / 3);
      break;
    case 'weeks':
      timeFactor = Math.trunc((timeToElapse * 7) / 3);
      break;
    case 'days':
      timeFactor = Math.trunc((timeToElapse) / 3);
      break;
    default:
  }

  // infections by time passed
  impact.infectionsByRequestedTime = impact.currentlyInfected * (2 ** timeFactor);
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * (2 ** timeFactor);

  // challenge 2
  impact.severeCasesByRequestedTime = impact.infectionsByRequestedTime * 0.15;
  severeImpact.severeCasesByRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;

  // calculate AvailableBeds
  const calculateAvailableBeds = (severeCasesByRequestedTime) => {
    const bedsAvailable = totalHospitalBeds * 0.35;
    const shortage = bedsAvailable - severeCasesByRequestedTime;
    const result = shortage < 0 ? shortage : bedsAvailable;
    /* eslint-disable radix */
    return parseInt(result);
  };
  impact.hospitalBedsByRequestedTime = calculateAvailableBeds(impact.severeCasesByRequestedTime);
  severeImpact.hospitalBedsByRequestedTime = calculateAvailableBeds(severeImpact.severeCasesByRequestedTime);

  // challenge 3
  impact.casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;
  severeImpact.casesForICUByRequestedTime = severeImpact.infectionsByRequestedTime * 0.05;

  impact.casesFprVentilatorsByRequestedTime = impact.infectionsByRequestedTime * 0.02;
  severeImpact.casesForVentilatorsByRequestedTime = severeImpact.infectionsByRequestedTime * 0.02;

  impact.dollarsInFlight = impact.infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD * timeToElapse;
  severeImpact.dollarsInFlight = severeImpact.infectionsByRequestedTime * avgDailyIncomePopulation * avgDailyIncomeInUSD * timeToElapse;
  return {
    data,
    impact,
    severeImpact
  };
};
export default covid19ImpactEstimator;
