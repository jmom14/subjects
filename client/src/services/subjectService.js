import axios from 'axios';
import { addParamsToUrl, getNameOptions } from '../helpers';


const HOST = 'http://localhost:3001';
const API_URL = `${HOST}/subjects`;

export const fetchSubjects = async (params) => {
    try {
        const url = addParamsToUrl(API_URL, params)
        const response = await axios.get(url);
        if (response.status === 200) {
            return response.data;
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const createSubject = async (subject) => {
    try {
        const response = await axios.post(API_URL, subject);
        if (response.status === 200) {
            console.log(response)
            return response.data;
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const fetchNameOptions = async () => {
    try {
        const response = await axios.get(`${API_URL}/options`);
        if (response.status === 200) {
            return getNameOptions(response.data);
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
}
