const jwt = require("jsonwebtoken");

function generateAccessToken({ email, name, role }) {
  const user = { email, name, role}; 
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
  return (accessToken);
}

function generateRefreshToken({ email, name, role }) {
  const user = { email, name, role}; 
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1y' });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({message: 'Accès non autorisé.'});

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if(error) return res.status(401).json({message: 'Accès non autorisé.'});
    req.user = user;
    next();
  })

}

module.exports = { generateAccessToken, authenticateToken, generateRefreshToken }