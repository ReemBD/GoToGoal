import { stepRegex } from '@/consts';
import React, { useMemo, useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { askChatGPT } from '../services/chat';
import ThemedText from './ThemedText';

const responseExample = "**1. Set Clear Goals: Define what type of psychologist you want to become (e.g., clinical psychologist, counseling psychologist, etc.) and set specific, measurable goals for achieving that specialization.**\n**2. Academic Preparation: Research the educational requirements for becoming a psychologist in your chosen field. Enroll in a relevant undergraduate program and plan to pursue a graduate degree in psychology.**\n**3. Gain Experience: Seek opportunities to gain practical experience in the field of psychology through internships, volunteering, or research assistant positions. This will help you build a strong foundation of practical skills and knowledge.**\n**4. Obtain Licensure: Understand the licensure requirements in your state or country to become a licensed psychologist. Prepare for and pass any required exams or fulfill any necessary supervised work hours.**\n**5. Network and Seek Mentorship: Connect with experienced psychologists in your desired field, join professional organizations, and seek mentorship to gain insights and guidance on how to navigate the path to becoming a successful psychologist.**\n"
const Step = ({ step }: { step: string }) => (
    <ThemedText style={{
        backgroundColor: '#252728',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
        flex: 1,
    }}>
        {step}
    </ThemedText>
);


const Chat = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(responseExample);

    const extractSteps = (str: string) => {
        console.log('extractSteps', str);
        const matches = [];
        let match;
        while ((match = stepRegex.exec(str)) !== null) {
            matches.push(match[1]);
        }
        return matches;
    }

    const steps = useMemo(() => extractSteps(response), [response]);

    const handleSend = async () => {
        const reply = await askChatGPT(input);
        setResponse(reply);
    };

    return (
        <View style={{
            padding: 20, height: '100%', width: '100%', display: 'flex', flexDirection: 'column'
        }}>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'scroll', marginTop: 20 }} >
                {steps.map((step, index) => (
                    <Step key={index} step={step} />
                ))}
            </div >
            <TextInput
                placeholder="What do you want to achieve?"
                value={input}
                onChangeText={setInput}
                style={{
                    color: '#aaa',
                    width: '100%',
                    borderColor: '#ccc',
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 10,
                    marginTop: 20,
                }}
            />
            <Button title="Send" onPress={handleSend} />
        </View >
    );
};

export default Chat;
