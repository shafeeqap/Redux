import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/stor.js';
import ProfilePage from './Components/ProfileForm.jsx';

const App = () => {
    const userId = 'YOUR_USER_ID_HERE'; // Replace with the actual user ID

    return (
        <Provider store={store}>
            <ProfilePage userId={userId} />
        </Provider>
    );
};

export default App;
