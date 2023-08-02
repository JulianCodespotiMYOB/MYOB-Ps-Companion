import axios from 'axios';

export const fetchEmployees = async (searchTerms) => {
    const response = await axios.get('http://192.168.20.25:5247/api/Employees', {
        params: {
            ...searchTerms
        }
    });

    return response.data;
};
