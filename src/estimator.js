
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
    region,
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
 const impactRequestedTime = impact.infectionsByRequestedTime * 0.15;
 const severeRequestedTime = severeImpact.infectionsByRequestedTime * 0.15;

 impact.severeCasesByRequestedTime = Math.trunc(impactRequestedTime); // 15%
 severeImpact.severeCasesByRequestedTime = Math.trunc(severeRequestedTime); // 15%

 // compute AvailableBeds ByRequestedTime
 const bedsAvailable = totalHospitalBeds * 0.35; // assuming that totalhospitalbeds available = 23 - 100%
 const impactShortage = bedsAvailable - impactRequestedTime; // occupied = 65% * 23/100 which is  14.95 beds  ***discard decimal***
 const severeShortage = bedsAvailable - severeRequestedTime; // 100 - 65 = 35 beds availabele 23/100 * 35% = 8.1 beds ***discard decimal***


 impact.hospitalBedsByRequestedTime = Math.trunc(impactShortage);
 severeImpact.hospitalBedsByRequestedTime = Math.trunc(severeShortage);
  // challenge 3
  const CasesforICU = impact.infectionsByRequestedTime * 0.05;
  const ImpactCasesforICU = severeImpact.infectionsByRequestedTime * 0.05;

  const Ventilators = impact.infectionsByRequestedTime * 0.02;
  const ImpactVentilators = severeImpact.infectionsByRequestedTime * 0.02;


  impact.casesForICUByRequestedTime = Math.trunc(CasesforICU);
  severeImpact.casesForICUByRequestedTime = Math.trunc(ImpactCasesforICU);

  impact.casesForVentilatorsByRequestedTime = Math.trunc(Ventilators);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(ImpactVentilators);

  let usdInFight;
  const computeIncome = avgDailyIncomePopulation * avgDailyIncomeInUSD;

  if (periodType === 'months') {
    usdInFight = timeToElapse * 30;

    impact.dollarsInFlight = Math.trunc((impact.InfestionsByRequestTime * computeIncome) / usdInFight);
    severeImpact.dollarsInFlight = Math.trunc((severeImpact.InfestionsByRequestTime * computeIncome) / usdInFight);
  } else if (periodType === 'weeks') {
    usdInFight = timeToElapse * 7;

    impact.dollarsInFlight = Math.trunc((impact.InfestionsByRequestTime * computeIncome) / usdInFight);
    severeImpact.dollarsInFlight = Math.trunc((severeImpact.InfestionsByRequestTime * computeIncome) / usdInFight);
  } else if (periodType === 'days') {
    usdInFight = timeToElapse * 1;

    impact.dollarsInFlight = Math.trunc((impact.InfestionsByRequestTime * computeIncome) / usdInFight);
    severeImpact.dollarsInFlight = Math.trunc((severeImpact.InfestionsByRequestTime * computeIncome) / usdInFight);
  }
  return {
    data,
    impact,
    severeImpact
  };
};
export default covid19ImpactEstimator;
