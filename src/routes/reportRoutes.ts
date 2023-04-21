import express from 'express';
import { 
     CreateReport, 
    getReports, 
    updateReport, 
    deleteReport 
} from '../controllers/reportController';
import { auth } from '../middleware/auth';
const router = express.Router();

/* Create report. */
router.post('/create', auth, CreateReport);
router.get('/get-reports', auth, getReports);
router.patch('/update-reports/:patientId', auth, updateReport);
router.delete('/delete-reports/:patientId', auth, deleteReport);



export default router