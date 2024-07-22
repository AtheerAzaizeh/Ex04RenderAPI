import { DESTINATIONS } from "../data/destinations.js";
import { VACATION_TYPES } from "../data/vacationTypes.js";
import { connection} from "../server.js";
import {
  isMaxSevenDays,
  checkAccessCode,
  checkIsLogin,
  checkDestinationANDVacationType,
  calculateOverlapDate,
  calculateMajority,
} from "./utilities.js";
import mysql from 'mysql2/promise';


export async function addPreference(req, res) {
  try {
    const { accessCode, startDate, endDate, destination, vacationType } = req.body;

    const [rows] = await connection.promise().execute(
      'SELECT * FROM preferences WHERE accessCode = ? AND startDate = ? AND endDate = ? AND destination = ? AND vacationType = ?',
      [accessCode, startDate, endDate, destination, vacationType]
    );

    if (rows.length > 0) {
      return res.status(400).json({ message: "you can just update " });
    }

    if (!checkIsLogin()) {
      return res.status(400).json({ message: "you need to Login first" });
    }

    if (!checkAccessCode(accessCode)) {
      return res.status(400).json({ message: "your access code incorrect" });
    }

    if (isMaxSevenDays(startDate, endDate) && checkDestinationANDVacationType(destination, vacationType)) {
      await connection.promise().execute(
        'INSERT INTO preferences (accessCode, startDate, endDate, destination, vacationType) VALUES (?, ?, ?, ?, ?)',
        [accessCode, startDate, endDate, destination, vacationType]
      );

      res.status(200).json({ message: "Preference added successfully" });
    } else {
      res.status(401).json({ message: "the vacation must be max 7 days or the destination or vacation type is not options" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function editPreference(req, res) {
  try {
    const { accessCode, startDate, endDate, destination, vacationType } = req.body;

    if (!checkIsLogin()) {
      return res.status(400).json({ message: "you need to Login first" });
    }

    if (!checkAccessCode(accessCode)) {
      return res.status(400).json({ message: "your access code incorrect" });
    }

    if (!isMaxSevenDays(startDate, endDate)) {
      return res.status(400).json({ message: "the vacation must be max 7 days" });
    }

    if (!checkDestinationANDVacationType(destination, vacationType)) {
      return res.status(400).json({ message: "the destination or vacation type is not options" });
    }

    const [result] = await connection.promise().execute(
      'UPDATE preferences SET startDate = ?, endDate = ?, destination = ?, vacationType = ? WHERE accessCode = ?',
      [startDate, endDate, destination, vacationType, accessCode]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Preference not found" });
    }

    res.status(200).json({ message: "Preference updated successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getDestinations(req, res) {
  try {
    res.status(200).json({ destinations: DESTINATIONS, vacationTypes: VACATION_TYPES });
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function getVacationTypes(req, res) {
  try {
    res.status(200).json({ vacationTypes: VACATION_TYPES });
  } catch (error) {
    res.status(400).json({ error });
  }
}
export async function getMajorityPreferences(req, res) {
  try {
    const [preferences] = await connection.promise().execute('SELECT * FROM preferences');

    if (preferences.length < 5) {
      return res.status(400).json({ message: "All 5 members must fill out their preferences." });
    }

    const majorityDestination = calculateMajority(preferences, "destination");
    const majorityVacationType = calculateMajority(preferences, "vacationType");
    const overlappingDates = calculateOverlapDate(preferences);

    if (!overlappingDates) {
      return res.status(400).json({ message: "No overlapping dates found." });
    }



    res.status(200).json({
      destination: majorityDestination,
      vacationType: majorityVacationType,
      dates: overlappingDates,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteAllPreferences(req, res) {
  try {
    const [result] = await connection.promise().execute('DELETE FROM preferences');

    res.status(200).json({ message: `Deleted ${result.affectedRows} preferences.` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 


