// services/chat.ts
import axios from 'axios';

const API_URL = 'https://api.openai.com/v1/chat/completions';

export const askChatGPT = async (goal: string) => {
    const res = await axios.post(
        API_URL,
        {
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are a goal-setting coach. When the user gives you a goal, provide a 4 to 6 step plan to achieve it. Keep it encouraging and actionable.',
                },
                {
                    role: 'user',
                    content: `My goal is: ${goal}`,
                },
            ],
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${API_KEY}`,
            },
        }
    );

    return res.data.choices[0].message.content;
};
