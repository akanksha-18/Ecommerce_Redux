import { Box, Heading, Text, FormControl, FormLabel, Input, Button, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase.config';
import { onAuthStateChanged, updatePassword } from 'firebase/auth';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState(null);
    const [newPassword, setNewPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                console.log(currentUser, "current user");
                setUser(currentUser);
            } else {
                navigate('/login'); 
            }
        });
        return () => unsubscribe(); 
    }, [navigate]);
    
    const handlePasswordReset = async () => {
        if (newPassword.trim().length < 6) {
            toast({
                title: 'Password must be at least 6 characters.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            if (newPassword) {
                await updatePassword(auth.currentUser, newPassword);
                toast({
                    title: 'Password updated successfully.',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                setNewPassword('');
            }
        } catch (error) {
            toast({
                title: 'Password reset failed.',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box p={4}>
            <Heading mb={4}>User Profile</Heading>
            <Stack spacing={4}>
                <FormControl>
                    <FormLabel>Username</FormLabel>
                    <Input value={user?.displayName || 'User'} readOnly />
                </FormControl>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input value={user?.email} readOnly />
                </FormControl>
                <FormControl>
                    <FormLabel>New Password</FormLabel>
                    <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                    />
                </FormControl>
                <Button colorScheme="blue" onClick={handlePasswordReset}>
                    Reset Password
                </Button>
            </Stack>
        </Box>
    );
};

export default Profile
