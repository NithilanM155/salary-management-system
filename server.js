const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory database
let employees = [];

// Get all employees
app.get("/employees", (req, res) => {
    res.json(employees);
});

// Add employee
app.post("/employees", (req, res) => {
    const { name, basic, bonus, deductions } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Name required" });
    }

    const total = basic + bonus - deductions;

    const employee = {
        id: employees.length + 1,
        name,
        basic,
        bonus,
        deductions,
        total
    };

    employees.push(employee);
    res.json(employee);
});

// Delete employee
app.delete("/employees/:id", (req, res) => {
    const id = parseInt(req.params.id);
    employees = employees.filter(emp => emp.id !== id);
    res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
