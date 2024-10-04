import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import userRoutes from './routes/userRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'view')));

app.use(bodyParser.json());

app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'sign-up.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'profile.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});






