const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://username:password@localhost:3306/database_name');  // Sesuaikan dengan informasi database Anda

const User = sequelize.define('User', {
  nama: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  nomor_induk: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('Admin', 'Dosen', 'Mahasiswa'),
    defaultValue: 'Mahasiswa',
    allowNull: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'users',  // Sesuaikan dengan nama tabel Anda
  timestamps: false  // Jika tabel Anda tidak memiliki kolom 'createdAt' dan 'updatedAt'
});

module.exports = User;
