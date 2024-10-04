import mysql from 'mysql2';
import User from './models/user';

const db = mysql.createConnection({
  host: process.env.HOST_MYSQL,
  user: process.env.USER_MYSQL,
  password: process.env.PASS_MYSQL,
  database: process.env.DATABASE_MYSQL
});

db.connect((err: any) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.stack);
    return;
  }
  console.log('Conectado ao MySQL como id ' + db.threadId);
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    profile_pic TEXT,
    role VARCHAR(255) NOT NULL,
    description TEXT,
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    location VARCHAR(255)
  )
`;

db.query(createTableQuery, (err : any) => {
  if (err) {
    console.error('Erro ao criar a tabela:', err);
    return;
  }
  console.log('Tabela "users" criada ou já existe.');

  const seedUsers: User[] = [
    {
      username: 'c4ttr4ck',
      password: '49EFEF5F70D47ADC2DB2EB397FBEF5F7BC560E29',
      email: 'c4ttr4ck@email.ai',
      profile_pic: 'https://ca.slack-edge.com/T06JRN0TA-U040UG6G4VB-f080d5028a70-512',
      role: 'user',
      description: 'Happy Hacking! ;)',
      full_name: 'c4ttr4ck',
      date_of_birth: '1988-11-30',
      location: 'Juazeiro do Norte, Brasil'
    },
    {
      username: 'higordiego',
      password: 'EC86376E23B99516BB874A35DB8A3CDB6A95987D',
      email: 'higor.diego@email.ai',
      profile_pic: 'https://ca.slack-edge.com/T06JRN0TA-U040UG6G4VB-f080d5028a70-512',
      role: 'user',
      description: '',
      full_name: 'Higor Diego',
      date_of_birth: '1988-11-30',
      location: 'Juazeiro do Norte, Brasil'
    },
    {
      username: 'admin',
      password: '1478963',
      email: 'admin@email.ai',
      profile_pic: 'https://example.com/profile/janedoe.png',
      role: 'admin',
      description: 'Administrator of the system',
      full_name: 'Jane Doe',
      date_of_birth: '1990-01-15',
      location: 'São Paulo, Brasil'
    }
  ];

  seedUsers.forEach(user => {
    const insertQuery = `
      INSERT INTO users (username, password, email, profile_pic, role, description, full_name, date_of_birth, location)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(insertQuery, [
      user.username,
      user.password,
      user.email,
      user.profile_pic,
      user.role,
      user.description,
      user.full_name,
      user.date_of_birth,
      user.location
    ], (err: any) => {
      if (err) {
        console.error('Erro ao inserir usuário:', err);
      }
    });
  });

  console.log('Usuários iniciais inseridos.');
});

export default db;