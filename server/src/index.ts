import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        res.status(400).json({ error: 'Message is required' });
        return;
    }

    try {
        const openaiRes = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content:
                            'You are a goal-setting coach. Respond with a 4 to 6 step plan to achieve the user goal.',
                    },
                    {
                        role: 'user',
                        content: userMessage,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.json(openaiRes.data);
    } catch (err: any) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
