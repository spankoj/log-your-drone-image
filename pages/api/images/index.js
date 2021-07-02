const { images } = require('./data.json');

export default (req, res) => {
  if (req.method === 'POST') {
    console.log(req.body);
  } else {
  }
};
