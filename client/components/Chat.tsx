import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Button, TextInput } from 'react-native';

import { Step as IStep } from '@/models/step';

import { askChatGPT } from '../services/chat';
import ThemedText from './ThemedText';
import ThemedView from './ThemedView';

const Step = ({ step }: { step: IStep }) => (
    <ThemedView
        type='card'
        style={{
            padding: 10,
            marginVertical: 5,
            borderRadius: 5,
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
        }}>
        <ThemedText style={{
            fontSize: 24,
            fontWeight: 'bold',
        }}>
            Step {step.stepNum}
        </ThemedText>
        <ThemedText style={{
            padding: 10,
            marginVertical: 5,
            borderRadius: 5,
            flex: 1,
        }}>
            {step.text}
        </ThemedText>
    </ThemedView>
);


const Chat = () => {
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const extractSteps = (str: string): { text: string; stepNum: number; }[] => {
        const steps = str.split('\n').filter(line => line.trim() !== '');
        const stepList = steps.map((step, index) => {
            return { text: step.slice(2).trim(), stepNum: index + 1 };
        });
        return stepList;
    }

    const steps = useMemo(() => extractSteps(response), [response]);

    const handleSend = async () => {
        setLoading(true);

        try {
            const reply = await askChatGPT(input);
            setResponse(reply);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <ThemedView style={{
            padding: 20,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <ThemedView style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                overflow: 'scroll',
                marginTop: 20,
            }}>
                {loading && <ActivityIndicator style={{ height: '100%' }} size='large' color='gray' />}
                {steps.length === 0 && !loading && (
                    <ThemedText style={{
                        color: '#aaa',
                        fontSize: 18,
                        textAlign: 'center',
                        marginTop: 20,
                    }}>
                        Lets get started! Ask me to help you with your current goal
                    </ThemedText>
                )}
                {steps.map((step, index) => <Step key={index} step={step} />)}
            </ThemedView >
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
        </ThemedView >
    );
};

export default Chat;
