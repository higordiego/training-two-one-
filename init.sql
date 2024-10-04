CREATE TABLE users (
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
);

INSERT INTO users (username, password, email, profile_pic, role, description, full_name, date_of_birth, location) VALUES
('francoatmega', '49EFEF5F70D47ADC2DB2EB397FBEF5F7BC560E29', 'c4ttr4ck@email.ai', 'https://ca.slack-edge.com/T06JRN0TA-U040UG6G4VB-f080d5028a70-512', 'user', 'Happy Hacking! ;)', 'c4tt4ck', '1988-11-30', 'Juazeiro do Norte, Brasil'),
('higordiego', 'EC86376E23B99516BB874A35DB8A3CDB6A95987D', 'higor.diego@email.ai', 'https://ca.slack-edge.com/T06JRN0TA-U040UG6G4VB-f080d5028a70-512', 'user', '', 'Higor Diego', '1988-11-30', 'Juazeiro do Norte, Brasil'),
('admin', '1478963', 'admin@email.ai', 'https://example.com/profile/janedoe.png', 'admin', 'Administrator of the system', 'Jane Doe', '1990-01-15', 'São Paulo, Brasil');