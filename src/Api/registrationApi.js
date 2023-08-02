import axios from 'axios';

export const fetchRegistrations = async searchTerm => {
    const url = `http://192.168.20.25:5247/api/Registrations?searchTerm=${searchTerm}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
};
