import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile, updateProfile } from '../features/profile/profileSlice';

const ProfilePage = ({ userId }) => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile.profile);
    const profileStatus = useSelector((state) => state.profile.status);
    const error = useSelector((state) => state.profile.error);

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [profileImage, setProfileImage] = useState(null);

    useEffect(() => {
        if (profileStatus === 'idle') {
            dispatch(fetchProfile(userId));
        }
    }, [profileStatus, dispatch, userId]);

    useEffect(() => {
        if (profile) {
            setName(profile.name);
            setPhone(profile.phone);
            setProfileImage(profile.profileImage);
        }
    }, [profile]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const profileData = { name, phone, profileImage };
        dispatch(updateProfile({ userId, profileData }));
    };

    const handleImageChange = (e) => {
        setProfileImage(e.target.files[0]);
    };

    return (
        <div>
            <h1>Profile Page</h1>
            {profileStatus === 'loading' && <div>Loading...</div>}
            {profileStatus === 'failed' && <div>{error}</div>}
            {profileStatus === 'succeeded' && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div>
                        <label>Profile Image:</label>
                        <input type="file" onChange={handleImageChange} />
                    </div>
                    <button type="submit">Update Profile</button>
                </form>
            )}
        </div>
    );
};

export default ProfilePage;
