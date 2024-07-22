import express from 'express';
import { addPreference , editPreference , getDestinations , getVacationTypes , getMajorityPreferences, deleteAllPreferences } from '../controllers/preferenceController.js';

const router = express.Router();


router.post('/add', addPreference);
router.put('/edit', editPreference);
router.get('/majority', getMajorityPreferences);
router.get('/destinations', getDestinations);
router.get('/vacation_types', getVacationTypes);

router.delete('/',deleteAllPreferences)


export default router;
