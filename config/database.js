if (process.env.NODE_ENV === 'production') {
  module.exports={mongoURI:'mongodb://vjot:vjot@ds251799.mlab.com:51799/vidjot-prod'}
}else {
  module.exports={mongoURI:'mongodb://vjot:vjot@ds251799.mlab.com:51799/vidjot-prod'}
}
