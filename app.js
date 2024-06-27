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
    const { nombre, correo, fecha_nacimiento, identificacion, carnet, rol, clave } = req.body;
    const hashedPassword = await bcrypt.hash(clave, 10);
    db.query('INSERT INTO usuarios (nombre, correo, fecha_nacimiento, identificacion, carnet, rol, clave) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [nombre, correo, fecha_nacimiento, identificacion, carnet, rol, hashedPassword], (err, result) => {
        if (err) throw err;
        res.send('User registered');
    });
});

app.post('/login', (req, res) => {
    const { correo, clave } = req.body;
    db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], async (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            const comparison = await bcrypt.compare(clave, results[0].clave);
            if (comparison) {
                if (results[0].cambiar_clave) {
                    res.send('Change your password');
                } else {
                    const token = jwt.sign({ id: results[0].id }, 'secretkey');
                    res.json({ token });
                }
            } else {
                res.send('Invalid credentials');
            }
        } else {
            res.send('User not found');
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
