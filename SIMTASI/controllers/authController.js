const bcrypt = require("bcryptjs");
const db = require("../models/db");

exports.register = (req, res) => {
  const { nama, nomor_induk, email, password } = req.body;
  const role = "Mahasiswa";

  // Cek apakah email sudah terdaftar
  const checkEmailSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkEmailSql, [email], (err, results) => {
    if (err) {
      // Tampilkan alert untuk error query
      return res.send(`
                <script>
                    alert('Gagal melakukan pengecekan email: ${err.message}');
                    window.location.href = '/signup';
                </script>
            `);
    }

    // Jika email sudah terdaftar
    if (results.length > 0) {
      return res.send(`
                <script>
                    alert('Email sudah terdaftar');
                    window.location.href = '/signup';
                </script>
            `);
    }

    // Jika email belum terdaftar, lanjutkan dengan pendaftaran
    const hashed = bcrypt.hashSync(password, 8);
    const sql =
      "INSERT INTO users (nama, nomor_induk, role, email, password) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [nama, nomor_induk, role, email, hashed], (err) => {
      if (err) {
        return res.send(`
                    <script>
                        alert('Gagal daftar: ${err.message}');
                        window.location.href = '/signup';
                    </script>
                `);
      }
      // Jika sukses, redirect ke signin dengan alert sukses
      return res.send(`
                <script>
                    alert('Akun berhasil dibuat, silakan login');
                    window.location.href = '/signin';
                </script>
            `);
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .send(
          '<script>alert("Terjadi kesalahan server"); window.location.href ="/signin";</script>'
        );
    }

    if (results.length === 0) {
      return res.send(
        '<script>alert("Email tidak ditemukan!"); window.location.href ="/signin";</script>'
      );
    }

    const user = results[0];

    if (!bcrypt.compareSync(password, user.password)) {
      return res.send(
        '<script>alert("Password salah!"); window.location.href ="/signin";</script>'
      );
    }

    // Simpan user ke session
    req.session.user = {
      id: user.id,
      nama: user.nama,
      role: user.role,
    };

    // Redirect sesuai role
    switch (user.role) {
      case "Mahasiswa":
        return res.redirect("/homemahasiswa");
      case "Dosen":
        return res.redirect("/homedosen");
      case "Admin":
        return res.redirect("/homeadmin");
      default:
        return res.send(
          '<script>alert("Role tidak dikenali!"); window.location.href ="/signin";</script>'
        );
    }
  });
};


