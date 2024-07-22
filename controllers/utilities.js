import { accessToApp } from "../server.js";
import { USERS_CODES } from "../data/accessCodes.js";
import { DESTINATIONS } from "../data/destinations.js";
import { VACATION_TYPES } from "../data/vacationTypes.js";


// calculate if the start date until end date max 7 days
export function isMaxSevenDays(startDate, endDate) {
  // parse the startDate and endDate strings to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  // calculate the difference in milliseconds between endDate and startDate
  const difference = end.getTime() - start.getTime();

  // calculate the number of days difference
  const daysDifference = difference / (1000 * 3600 * 24);

  // check if the difference is within 1 to 7 days
  return daysDifference >= 1 && daysDifference < 7;
}

export function checkAccessCodeOfUser(user,code){
    const userName = user.toUpperCase();
    return USERS_CODES[userName] === parseInt(code,10);
}

export function checkDestinationANDVacationType(destination,vacationType){
    const des = destination.toUpperCase();
    const vac = vacationType.toUpperCase();
    
    const isValidDestination = DESTINATIONS[des] === destination;
    const isValidVacationType = VACATION_TYPES[vac] === vacationType;
    return isValidDestination && isValidVacationType;
}


export function checkAccessCode(code) { return code === accessToApp.accsessCode}

export function checkIsLogin() {  return accessToApp.isLogin }

export function calculateOverlapDate(preferences) {
    const dates = preferences.map(pref => ({
      start: new Date(pref.startDate),
      end: new Date(pref.endDate)
    }));
  
    console.log("Dates array:", dates);
  
    const maxStartDate = new Date(Math.max(...dates.map(d => d.start)));
    const minEndDate = new Date(Math.min(...dates.map(d => d.end)));
  
    console.log("Max Start Date:", maxStartDate);
    console.log("Min End Date:", minEndDate);
  
    if (maxStartDate <= minEndDate) {
      return { startDate: maxStartDate+1, endDate: minEndDate+1 };
    } else {
      return null; // No overlapping dates
    }
  }
  


export function calculateMajority(preferences, key) {
  // key is destntion or vacationTybe
  // count every destintion or vacationType   like acc = {nature : 3 , beach : 1 ...} and the value counts = acc 
  const counts = preferences.reduce((acc, pref) => {
      // here if the value not yet in acc we init  1  if the value in dic (number > 0) || 0 we take in the left number + 1  
      acc[pref[key]] = (acc[pref[key]] || 0) + 1;
      return acc;
  }, {});

  let majority = null;
  let maxCount = 0;
  // Object is like for each for arrays in dics we use Obicts.entries({...}) to itrate on dic
  for (const [key, count] of Object.entries(counts)) {
      if (count > maxCount) {
          maxCount = count;
          majority = key;
      }
  }

  return majority;
}
