import express from "express";
import cors from "cors";
import { employees } from "./data.js";

export const app = express();
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Frontend practice: filtering, searching and sorting belong to the exercise.
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/api/employees", (_req, res) => {
  res.json(employees);
});

app.get("/api/employees/:id", (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isSafeInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid employee ID" });
    return;
  }

  const employee = employees.find((item) => item.id === id);

  if (!employee) {
    res.status(404).json({ error: "Employee not found" });
    return;
  }

  res.json(employee);
});

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});
