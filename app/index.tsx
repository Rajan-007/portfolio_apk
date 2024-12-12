// App.js
import React from 'react';
import { SafeAreaView } from 'react-native';
import FileUploadForm from './components/FileUploadForm';
import '../global.css'

const App = () => {
    return (
        <SafeAreaView className="flex-1">
            <FileUploadForm />
        </SafeAreaView>
    );
};

export default App;