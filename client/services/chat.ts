// services/chat.ts
import axios from 'axios';
import { Platform } from 'react-native';

const API_URL = `http://${Platform.OS === 'web' ? 'localhost' : process.env.HOST_IP}:3000/api`;

export const askChatGPT = async (goal: string) => {
    try {
        const res = await axios.post(`${API_URL}/chat`, {
            message: goal,
        });

        const message = res.data.choices?.[0]?.message?.content;
        return message || 'No response from AI';
    } catch (err) {
        console.error('API error:', err);
        return 'Something went wrong';
    }
};
