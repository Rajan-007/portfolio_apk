// WebViewScreen.js
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const WebViewScreen = () => {
    const [url, setUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        const fetchUrl = async () => {
            try {
                // Replace 'localhost' with your machine's IP address
                const response = await fetch('http://192.168.236.2:3000/api/items/?name=mywebapp'); 
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                
                if (data.length > 0 && data[0].url) {
                    setUrl(data[0].url); // Set URL if available
                } else {
                    setErrorMessage('No URL found in response');
                }
            } catch (error) {
                console.error('Error fetching URL:', error);
                setErrorMessage('Failed to fetch URL');
            } finally {
                setLoading(false);
            }
        };

        fetchUrl();
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (errorMessage) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: 'red' }}>{errorMessage}</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            {url ? (
                <WebView 
                    source={{ uri: url }} 
                    style={{ flex: 1 }}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    startInLoadingState={true}
                />
            ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'red' }}>No URL found</Text>
                </View>
            )}
        </View>
    );
};

export default WebViewScreen;
