import { Request, Response } from 'express';
import db from '../database';
import User from '../models/user';
import jwt from 'jsonwebtoken';

const SECRET_KEY = "7894561230";

export const registerUser = (req: Request, res: Response) => {
  const { username, password, email, profile_pic, description, full_name, date_of_birth, location }: User = req.body;
  const query = `INSERT INTO users (username, password, email, profile_pic, role, description, full_name, date_of_birth, location) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.execute(query, [username, password, email, profile_pic, 'user', description, full_name, date_of_birth, location], (err: any, results: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json();
  });
};

export const getUserById = (req: Request, res: Response) => {
  const id = req.params.id;
  const query = `SELECT * FROM users WHERE id = ?`;

  db.execute(query, [id], (err: any, results: any) => {
    
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    delete results[0].password;

    res.json(results[0]);
  });
};

export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;

  db.execute(query, [username, password], (err: any, results: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    const user = results[0];
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '24h' });
    res.json({ token, id: user.id });
  });
};

export const getUsers = (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const offset = (page - 1) * limit;

  let whereClause = '';
  const filters: { [key: string]: any } = {};
  
  if (req.query.city) filters.location = req.query.city;
  if (req.query.role) filters.role = req.query.role;

  const filterKeys = Object.keys(filters);

  if (filterKeys.length) {
    whereClause = 'WHERE ' + filterKeys.map(key => `${key} = '${filters[key]}'`).join(' AND ');
  }

  const query = `SELECT * FROM users ${whereClause} LIMIT ${limit} OFFSET ${offset}`;

  db.execute(query, (err: any, results: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const countQuery = `SELECT COUNT(*) as count FROM users ${whereClause}`;
    db.execute(countQuery, filterKeys.map(key => filters[key]), (err: any, countResults: any) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      const total = countResults[0].count;
      res.json({
        users: results.map((item: any) => {
          delete item.password;
          return item;
        }),
        total,
        page,
        totalPages: Math.ceil(total / limit)
      });
    });
  });
};

export const blockUser = (req: Request, res: Response) => {
  const id = req.params.id;
  const query = `UPDATE users SET role = 'blocked' WHERE id = ?`;

  db.execute(query, [id], (err: any, results: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User blocked successfully' });
  });
};