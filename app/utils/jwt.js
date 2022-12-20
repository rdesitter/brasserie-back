const jwt = require("jsonwebtoken");

function generateAccessToken({ email, name, admin }) {
  const user = { email, name, admin}; 
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  return (accessToken);
}

function generateRefreshToken({ email, name, admin }) {
  const user = { email, name, admin}; 
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({message: 'Accès non autorisé.'});

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if(error) {
      return res.status(401).json({message: 'Accès non autorisé.'});
    }
    req.user = user;
    next();
  })

}

function authorizeAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  const user = jwt.decode(token);
  const isAdmin = user.admin;

  if(!isAdmin) {
    return res.status(401).json({message: 'Accès non autorisé.'});
  }
  next();
}

module.exports = { generateAccessToken, authenticateToken, generateRefreshToken, authorizeAdmin }