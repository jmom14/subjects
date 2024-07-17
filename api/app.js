import express from 'express';
import bodyParser from 'body-parser';
import { Subject } from './src/models/subject.js';
import cors from 'cors';
import { fn, col, Op } from 'sequelize';

const app = express();
const port = 3000;

const DEFAULT_LIMIT = 10;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3001'
}));

app.get('/subjects', async (req, res) => {
    const { skip, limit, name, sex, diagnosis_date, status, sort_by, direction, search } = req.query;
    try {
        const { count, rows } = await Subject.findAndCountAll({
            ...(skip && { offset: parseInt(skip) }),
            limit: limit ? parseInt(limit) : DEFAULT_LIMIT,
            where: {
                ...(name && { name }),
                ...(sex && { sex }),
                ...(diagnosis_date && { diagnosis_date: Date.parse(diagnosis_date) }),
                ...(status && { status }),
                ...(search && {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                })
            },
            ...((sort_by && direction) && { order: [[sort_by, direction]] }),
        });
        res.json({ subjects: rows, count })
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/subjects', async (req, res) => {
    const { subject } = req.body;

    if (!subject) {
        return res.status(400).json({ error: 'Subject is required' });
    }

    try {
        const created = await Subject.create({
            name: subject.name,
            sex: subject.sex,
            diagnosis_date: Date.parse(subject.diagnosis_date),
            status: subject.status,
        });
        res.json(created.toJSON());
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/subjects/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const { subject } = req.body;
        if (!subject) {
            return res.status(400).json({ error: 'Subject is required' });
        }

        const subjectFound = await Subject.findByPk(id);

        if (!subjectFound) {
            return res.status(404).json({ error: 'Subject not found' });
        }
        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/subjects/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const subjectFound = await Subject.findByPk(id);
        if (!subjectFound) {
            return res.status(404).json({ error: 'Subject not found' });
        }
        await Subject.destroy({
            where: {
                id
            }
        });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/subjects/options', async (req, res) => {
    try {
        const names = await Subject.findAll({
            attributes: [
                [fn('DISTINCT', col('name')), 'name']
            ]
        });
        console.log(names)
        return res.json(names);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});