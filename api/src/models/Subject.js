import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

export const SUBJECT_STATUS = ['In Screening', 'Enrolled', 'Failed'];
export const SUBJECT_SEX = ['MALE', 'FEMALE'];

export const Subject = sequelize.define('Subject', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true
        }
    },
    sex: {
        type: DataTypes.ENUM,
        values: SUBJECT_SEX,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            isIn: [SUBJECT_SEX],
        }
    },
    diagnosis_date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            isDate: true,
        }
    },
    status: {
        type: DataTypes.ENUM,
        values: SUBJECT_STATUS,
        allowNull: false,
        validate: {
            notEmpty: true,
            notNull: true,
            isIn: [SUBJECT_STATUS],
        }
    }
});
Subject.sync({ force: true });