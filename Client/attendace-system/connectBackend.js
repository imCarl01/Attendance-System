import axios from 'axios';

const apiconnect = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 1000,
    withCredentials: true,
})

// User ApiSection
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
export const logout = async()=>{
    try {
        const response = await apiconnect.post("/users/logout")
        return response.data
    } catch (error) {
        console.error('Error logout admin:', error);
        throw error;
    }
}

export const profile = async () => {
    try {
        const response = await apiconnect.get('/users/profile');
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
}

export const getAllStudent =async(data)=>{
    try {
        const response = await apiconnect.get("/users/getAllStudent",data)
        return response.data
    } catch (error) {
        console.error('Error fetching all students:', error);
        throw error;
    }
}

export const getAllLecturers =async()=>{
    try {
        const response = await apiconnect.get("/users/getAllLecturers")
        return response.data
    } catch (error) {
        console.error('Error fetching all lecturers:', error);
        throw error;
    }
}

// Admin Section

export const registerAdmin = async(data)=>{
    try {
        const response = await apiconnect.post("/admin/registerAdmin",data)
        return response.data
    } catch (error) {
        console.error('Error registering admin:', error);
        throw error;
    }
}

export const loginAdmin = async(data)=>{
    try {
        const response = await apiconnect.post("/admin/loginAdmin",data)
        return response.data
    } catch (error) {
        console.error('Error login admin:', error);
        throw error;
    }
}

export const logoutAdmin = async()=>{
    try {
        const response = await apiconnect.post("/admin/logoutAdmin")
        return response.data
    } catch (error) {
        console.error('Error logout admin:', error);
        throw error;
    }
}

export const adminProfile = async()=>{
    try {
        const response = await apiconnect.get("/admin/adminProfile")
        return response.data
    } catch (error) {
        console.error('Error in getting admin:', error);
        throw error;
    }
}




