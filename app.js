const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'parqueo'
});

app.post('/register', async (req, res) => {
    const { nombre, correo, identificacion, rol, clave } = req.body;
    const hashedPassword = await bcrypt.hash(clave, 10);
    db.query('INSERT INTO usuarios (nombre, correo, fecha_nacimiento, identificacion, carnet, rol, clave) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [nombre, correo, fecha_nacimiento, identificacion, carnet, rol, hashedPassword], (err, result) => {
        if (err) throw err;
        res.send('User registered');
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            res.json({ success: false, message: 'Error en la base de datos' });
        } else if (results.length > 0) {
            const user = results[0];
            req.session.user = user;
            res.json({ success: true, role: user.role });
        } else {
            res.json({ success: false, message: 'Correo o contraseña incorrectos' });
        }
    });
});


app.listen(3000, () => {
    console.log('Server started on port 3000');
});
