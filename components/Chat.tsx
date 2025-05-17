import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';
import { askChatGPT } from '../services/chat';

const Chat = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleSend = async () => {
        const reply = await askChatGPT(input);
        setResponse(reply);
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput
                placeholder="Ask something..."
                value={input}
                onChangeText={setInput}
                style={{
                    borderColor: '#ccc',
                    borderWidth: 1,
                    padding: 10,
                    marginBottom: 10,
                }}
            />
            <Button title="Send" onPress={handleSend} />
            <Text style={{ marginTop: 20 }}>{response}</Text>
        </View>
    );
};

export default Chat;
