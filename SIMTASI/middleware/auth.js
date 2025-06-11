  exports.isMahasiswa = (req, res, next) => {
    if (req.session.user.role !== "Mahasiswa") {
      return res.status(403).send("Akses ditolak.");
    }
    next();
  };

  exports.isDosen = (req, res, next) => {
    if (req.session.user.role !== "Dosen") {
      return res.status(403).send("Akses ditolak.");
    }
    next();
  };

  exports.isAdmin = (req, res, next) => {
    if (req.session.user.role !== "Admin") {
      return res.status(403).send("Akses ditolak.");
    }
    next();
  };

  exports.isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
      return res.send(
        '<script>alert("Silakan login terlebih dahulu"); window.location.href ="/signin";</script>'
      );
    }
    next();
  };


