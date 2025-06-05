require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const cors = require('cors');


const Employee = require('./models/Employee');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(async() => {
        console.log('✅ Connected to MongoDB');



        // ✅ Load 20 employees from JSON file and insert if not already present
        const dataPath = path.join(__dirname, 'data', 'employees.json');
        if (fs.existsSync(dataPath)) {
            const raw = fs.readFileSync(dataPath, 'utf-8');
            const employees = JSON.parse(raw);

            for (const emp of employees) {
                const exists = await Employee.findOne({ email: emp.email });
                if (!exists) {
                    await Employee.create(emp);
                    console.log(`Inserted: ${emp.first_name} ${emp.last_name}`);
                } else {
                    console.log(`Skipped (exists): ${emp.email}`);
                }
            }
        } else {
            console.warn('⚠️ No employees.json file found in /data');
        }

    })
    .catch((err) => console.error('❌ MongoDB connection error:', err));

// Basic route
app.get('/', (req, res) => {
    res.send('Hello from Express + MongoDB!');
});

// POST user (example route)
app.post('/api/users', async(req, res) => {
    try {
        const { name, email } = req.body;
        const user = new User({ name, email });
        await user.save();
        res.status(201).json({ message: 'User saved', user });
    } catch (err) {
        res.status(500).json({ error: 'Error saving user' });
    }
});

// POST employee
app.post('/api/employees', async(req, res) => {
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.status(201).json({ message: 'Employee added successfully', employee: newEmployee });
    } catch (err) {
        res.status(500).json({ error: 'Error saving employee', details: err.message });
    }
});

// GET all employees
app.get('/api/employees', async(req, res) => {
    const { name, mobile } = req.query;

    const query = {};

    if (name) {
        query.$or = [
            { first_name: { $regex: name, $options: 'i' } },
            { last_name: { $regex: name, $options: 'i' } }
        ];
    }

    if (mobile) {
        query.mobile = { $regex: mobile, $options: 'i' };
    }

    try {
        const employees = await Employee.find(query);
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete('/api/employees/:id', async(req, res) => {
    try {
        await Employee.findByIdAndDelete(req.params.id);
        res.json({ message: 'Deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting employee' });
    }
});

// Server start
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));