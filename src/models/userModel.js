const pool = require('../config/database');
const bcrypt = require('bcrypt');

class UserModel {
  static async createUser(nome, email, senha) {
    const senhaHash = await bcrypt.hash(senha, 10);
    const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email';
    const values = [nome, email, senhaHash];
    const result = await pool.query(query, values);
    return result.rows[0];
  }

  static async findUserByEmail(email) {
    const query = 'SELECT * FROM usuarios WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async findUserById(id) {
    const query = 'SELECT id, nome, email, criado_em FROM usuarios WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = UserModel;
