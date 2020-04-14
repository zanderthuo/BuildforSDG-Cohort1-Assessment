/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable linebreak-style */
/* eslint-disable no-const-assign */
/* eslint-disable no-undef */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const $q = document.querySelector.bind(document);
const $qa = document.querySelectorAll.bind(document);


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
  const {
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation
  } = region;

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
      timeFactor = Math.trunc(timeToElapse / 3);
      break;
    default:
  }

  // infections by time passed
  impact.infectionsByRequestedTime = impact.currentlyInfected * 2 ** timeFactor;
  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * 2 ** timeFactor;

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
  const CasesICU = impact.infectionsByRequestedTime * 0.05;
  const ImpactCasesforICU = severeImpact.infectionsByRequestedTime * 0.05;

  const Ventilators = impact.infectionsByRequestedTime * 0.02;
  const ImpactVentilators = severeImpact.infectionsByRequestedTime * 0.02;

  impact.casesForICUByRequestedTime = Math.trunc(CasesICU);
  severeImpact.casesForICUByRequestedTime = Math.trunc(ImpactCasesforICU);

  impact.casesForVentilatorsByRequestedTime = Math.trunc(Ventilators);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(
    ImpactVentilators
  );

  // computation for dollars in fight
  const computeIncome = avgDailyIncomePopulation * avgDailyIncomeInUSD;

  const impactmoneylose = impact.infectionsByRequestedTime * computeIncome;
  const severemoneylose = severeImpact.infectionsByRequestedTime * computeIncome;

  let usdInFight;
  if (periodType === 'months') {
    usdInFight = timeToElapse * 30;

    impact.dollarsInFlight = Math.trunc(impactmoneylose / usdInFight);
    severeImpact.dollarsInFlight = Math.trunc(severemoneylose / usdInFight);
  } else if (periodType === 'weeks') {
    usdInFight = timeToElapse * 7;

    impact.dollarsInFlight = Math.trunc(impactmoneylose / usdInFight);
    severeImpact.dollarsInFlight = Math.trunc(severemoneylose / usdInFight);
  } else if (periodType === 'days') {
    usdInFight = timeToElapse * 1;

    impact.dollarsInFlight = Math.trunc(impactmoneylose / usdInFight);
    severeImpact.dollarsInFlight = Math.trunc(severemoneylose / usdInFight);
  }
  return {
    data,
    impact,
    severeImpact
  };
};

// Proccess Frontend;
const goEstimate = $q('[data-go-estimate]');

const showAlert = (className, message) => {
  const div = document.createElement('div');
  div.className = `alert alert-${className}`;
  div.innerHTML = `${message}`;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 3000);
};

goEstimate.addEventListener('click', (event) => {
  event.preventDefault();

  // input data
  const pType = $q('[data-period-type]');
  const tmToElapse = $q('[data-time-to-elapse]');
  const rCases = $q('[data-reported-cases]');
  const populatn = $q('[data-population]');
  const tHospitalBeds = $q('[data-total-hospital-beds]');

  const periodType = pType.value;
  const timeToElapse = parseInt(tmToElapse.value, radix);
  const reportedCases = parseInt(rCases.value, radix);
  const population = parseInt(populatn.value, radix);
  const totalHospitalBeds = parseInt(tHospitalBeds.value, radix);

  if (!periodType || !timeToElapse || !reportedCases || !population || !totalHospitalBeds) {
    showAlert('error', 'Oops! Please fill all fields.');
  } else {
    goEstimate.disabled = true;
    
    const input = {
      region: {
        name: 'Africa',
        avgAge: 19.7,
        avgDailyIncomeInUSD: 5,
        avgDailyIncomePopulation: 0.71
      },
      periodType,
      timeToElapse,
      reportedCases,
      population,
      totalHospitalBeds
    };
    const covid19 = covid19ImpactEstimator(input);
    const impact = covid19.impact;
    const severeImpact = covid19.severeImpact;
    const impactUI = $q('#impact');
    const severeImpactUI = $q('#severeImpact');
    const impactsContainner = $q('.impacts');
    impactUI.innerHTML = `
      <tr>
        <th>Currently Infected</th>
        <td>${impact.currentlyInfected}</td>
      </tr>
      <tr>
        <th>Infections By Requested Time</th>
        <td>${impact.infectionsByRequestedTime}</td>
      </tr>
      <tr>
        <th>Severe Cases By Requested Time</th>
        <td>${impact.severeCasesByRequestedTime}</td>
      </tr>
      <tr>
        <th>Hospital Beds By Requested Time</th>
        <td>${impact.hospitalBedsByRequestedTime}</td>
      </tr>
      <tr>
        <th>Cases For ICU By Requested Time</th>
        <td>${impact.casesForICUByRequestedTime}</td>
      </tr>
      <tr>
        <th>Cases For Ventilators By Requested Time</th>
        <td>${impact.casesForVentilatorsByRequestedTime}</td>
      </tr>
      <tr>
        <th>Dollars In Flight</th>
        <td>${impact.dollarsInFlight}</td>
      </tr>
    `;

    severeImpactUI.innerHTML = `
      <tr>
        <th>Currently Infected</th>
        <td>${severeImpact.currentlyInfected}</td>
      </tr>
      <tr>
        <th>Infections By Requested Time</th>
        <td>${severeImpact.infectionsByRequestedTime}</td>
      </tr>
      <tr>
        <th>Severe Cases By Requested Time</th>
        <td>${severeImpact.severeCasesByRequestedTime}</td>
      </tr>
      <tr>
        <th>Hospital Beds By Requested Time</th>
        <td>${severeImpact.hospitalBedsByRequestedTime}</td>
      </tr>
      <tr>
        <th>Cases For ICU By Requested Time</th>
        <td>${severeImpact.casesForICUByRequestedTime}</td>
      </tr>
      <tr>
        <th>Cases For Ventilators By Requested Time</th>
        <td>${severeImpact.casesForVentilatorsByRequestedTime}</td>
      </tr>
      <tr>
        <th>Dollars In Flight</th>
        <td>${severeImpact.dollarsInFlight}</td>
      </tr>
    `;

    showAlert('success', 'Data Submitted, scroll down to view impact analysis.');
    impactsContainner.classList.remove('is-hidden');
    goEstimate.disabled = false;
    pType.value = '';
    tmToElapse.value = '';
    rCases.value = '';
    populatn.value = '';
    tHospitalBeds.value = '';



    // console.log(covid19.data);
    // console.log(covid19.impact);
    // console.log(covid19.severeImpact);
  }
});

