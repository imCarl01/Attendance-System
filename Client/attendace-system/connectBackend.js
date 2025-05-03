import axios from 'axios';

const apiconnect = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 1000,
    withCredentials: true,
})

export const register = async (data) => {
    try {
        const response = await apiconnect.post('/users/register', data);
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
}

export const login = async (data) => {
    try {
        const response = await apiconnect.post('/users/login', data);
        return response.data;
    } catch (error) {
        console.error('Error logging in user:', error);
        throw error;
    }
}