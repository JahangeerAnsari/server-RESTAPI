const jwt = require('jsonwebtoken');

const login = (req, res) => {
  
  try {
   const { username, password } = req.body;

    const id = new Date().getDate();
    const token = jwt.sign({ id, username }, process.env.SECRET_KEY, {
      expiresIn: '30d',
    });
    res.status(200).json({
      msg: 'User created...',
      token,
    });
  } catch (error) {
    console.log("error--ssssss",error)
  }
};

const dashBoard = (req, res) => {
  
  try {
   const authHeader = req.headers.authorization;
   if (!authHeader || !authHeader.startsWith('Bearer')) {
     return res.status(401).json({
       msg: 'No token Provided ',
     });
   }else{
    const token  =  authHeader.split(' ')[1];
    console.log("token",token)
    res.status(200).json({
        msg:"woring finre"
    })
   }
  } catch (error) {
    console.log('error', error);
  }
};
module.exports = {
  login,
  dashBoard,
};
