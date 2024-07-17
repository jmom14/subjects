import { ADD, CLEAR_ALL, EDIT, REMOVE, REPLACE, STATUS } from "../constants";


export const getErrors = (subject) => {
    const errors = {};
    Object.entries(subject).forEach(([key, value]) => {

        if (!value) {
            errors[key] = 'This field is required';
        }
    });
    return errors;
}

export const addParamsToUrl = (baseUrl, params) => {
    const url = new URL(baseUrl);
    const searchParams = new URLSearchParams(url.search);

    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            const value = params[key];

            if (value !== undefined && value !== null && value !== '') {
                searchParams.set(key, value);
            } else {
                searchParams.delete(key);
            }
        }
    }

    url.search = searchParams.toString();
    return url.toString();
}

export const getDianosisDateOptions = () => {
    return [
        { label: 'Last 7 days', value: '7' },
        { label: 'Last month', value: '30' },
        { label: 'Last 3 months', value: '90' },
        { label: 'Last 6 months', value: '180' },
        { label: 'Last year', value: '365' },
    ]
}

export const getNameOptions = (rows) => {
    return rows.map((row) => {
        return row['name'];
    });
}

export const getColorBadge = (status) => {
    switch (status) {
        case STATUS.IN_SCREENING:
            return 'green';
        case STATUS.ENROLLED:
            return 'blue';
        case STATUS.FAILED:
            return 'red';
        default:
            return 'blue';
    }
}

export const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    return formattedDate;
};

export const reducer = (state, action) => {
    if (action.type === ADD) {
        return [...action.subjects, ...state,];
    }
    if (action.type === REPLACE) {
        return [...action.subjects]
    }
    if (action.type === REMOVE) {
        return state.filter(item => item.id !== action.id)
    }
    if (action.type === EDIT) {
        return state.map(item => {
            if (item.id === action.id) {
                return action.subject;
            }
            return item;
        })
    }
    if (action.type === CLEAR_ALL) {
        return [];
    }
}