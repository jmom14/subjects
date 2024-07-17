export const DEFAULT_DEBOUNCE_TIME = 500;

export const SEX = Object.freeze({
    MALE: 'MALE',
    FEMALE: 'FEMALE'
});
export const SEX_OPTIONS = [SEX.MALE, SEX.FEMALE];

export const STATUS = Object.freeze({
    IN_SCREENING: 'In Screening',
    ENROLLED: 'Enrolled',
    FAILED: 'Failed'
});
export const STATUS_OPTIONS = [STATUS.IN_SCREENING, STATUS.ENROLLED, STATUS.FAILED];

export const ADD = "ADD_SUBJECT";
export const REMOVE = "REMOVE_SUBJECT";
export const EDIT = "EDIT_SUBJECT";
export const CLEAR_ALL = "CLEAR_ALL";
export const REPLACE = "REPLACE_SUBJECTS";


export const initErrors = {
    name: "",
    sex: "",
    diagnosis_date: "",
    status: ""
}

export const initFilters = {
    name: "",
    diagnosis_date: "",
    status: "",
    sex: "",
}

export const COLUMNS = Object.freeze({
    NAME: 'name',
    SEX: 'sex',
    DIAGNOSIS_DATE: 'diagnosis_date',
    STATUS: 'status'
});

export const ORDER_DIRECTION = Object.freeze({
    ASC: 'ASC',
    DESC: 'DESC'
}); 