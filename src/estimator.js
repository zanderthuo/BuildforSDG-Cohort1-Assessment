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
  const { periodType, timeToElapse, reportedCases } = data;

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

  // calculate InfectionsByRequestedTime
  const calculateInfectionsByRequestedTime = (currentlyInfected) => {
    // eslint-disable-next-line radix
    const factor = parseInt(timeToElapse / 3);
    return currentlyInfected * 2 ** factor;
  };

  // Impact
  // challenge 1
  impact.infectionsByRequestedTime = calculateInfectionsByRequestedTime(impact.currentlyInfected);

  // severeImpact
  // challenge 1
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
