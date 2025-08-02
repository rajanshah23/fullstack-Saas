import express, { Router } from 'express'
import sendSMS from '../../services/sendSMS';
const router:Router=express.Router()

router.post('/send-sms', async (req, res) => {
  const { to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: "Missing 'to' or 'message' in body." });
  }

  try {
    await sendSMS(to, message);
    res.status(200).json({ success: true, message: "SMS sent successfully." });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to send SMS." });
  }
});


export default router