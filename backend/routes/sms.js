import express from 'express';
import 'dotenv/config';

const router = express.Router();

router.post('/', async (req, res) => {
    const { message } = req.body;
    const url = process.env.SMS_URL;
    const token = process.env.SMS_API_KEY;
    const phoneNumber = process.env.ADMIN_NUMBERS;

    // Validate environment variables
    if (!url || !token || !phoneNumber) {
        return res.status(500).json({ error: 'Server configuration is missing required SMS details.' });
    }

    // Validate request body
    if (!message || message.trim() === '') {
        return res.status(400).json({ error: 'Message is required.' });
    }

    const smsData = {
        sender_id: 'TXTIND', // Use your actual sender ID
        message,
        language: 'english',
        route: 'q',
        numbers: phoneNumber,
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token,
            },
            body: JSON.stringify(smsData),
        });

        if (!response.ok) {
            throw new Error(`Failed to send SMS: ${response.statusText}`);
        }

        const result = await response.json();
        return res.status(200).json(result); // Send success response
    } catch (error) {
        console.error('SMS sending error:', error.message);
        return res.status(500).json({ error: error.message }); // Send error response
    }
});

export default router;
