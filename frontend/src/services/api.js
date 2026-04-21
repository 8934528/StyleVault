import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5242/api', // Adjust path based on your ASP.NET backend port when running
});

export const fetchDefaultUser = async () => {
    const response = await api.get('/user/default');
    return response.data;
};

export const fetchBalance = async (userId) => {
    const response = await api.get(`/user/${userId}/balance`);
    return response.data;
};

export const openPackRequest = async (userId) => {
    const response = await api.post(`/pack/open?userId=${userId}`);
    return response.data;
};

export const fetchHistory = async (userId) => {
    const response = await api.get(`/pack/history/${userId}`);
    return response.data;
};

export const loginUser = async (username) => {
    const response = await api.post('/user/login', username, {
        headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
};

export default api;
