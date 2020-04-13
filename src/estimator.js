/* eslint-disable max-len */
/* eslint-disable indent */

const covid19ImpactEstimator = (data) => {
  // input in data

  // Destructuring data
  const { periodType, timeToElapse, reportedCases } = data;

  //    calculate InfectionsByRequestedTime
  const calculateInfectionsByRequestedTime = (currentlyInfected) => {
    // eslint-disable-next-line radix
    const factor = parseInt(timeToElapse / 3);
    return currentlyInfected * 2 ** factor;
  };
  // Custom functions and variables

  // normalize days; check for weeks and months if used
  switch (periodType) {
    case 'weeks':
      timeToElapse *= 7;
      break;
    case 'months':
      timeToElapse *= 30;
    default:
      break;
  }

  // best case estimation
  const impact = {};

  // challenge 1
  impact.currentlyInfected = reportedCases * 10;
  impact.infectionsByRequestedTime = calculateInfectionsByRequestedTime(
    impact.currentlyInfected
  );

  // the severe case estimation
  const severeImpact = {};
  // challenge 1
  severeImpact.currentlyInfected = reportedCases * 50;
  severeImpact.infectionsByRequestedTime = calculateInfectionsByRequestedTime(
    severeImpact.currentlyInfected
  );

  return {
    data,
    impact,
    severeImpact
  };
};
export default covid19ImpactEstimator;
