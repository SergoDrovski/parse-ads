module.exports = {
  "port": process.env.PORT,
  "mongoose": {
    "uri": `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@urldb.igpfrmb.mongodb.net/urldb?retryWrites=true&w=majority`
  }, 
	"session": {
	  "secret": process.env.SESSION_KEY,
	  "name": "sid",
	  "cookie": {
		  path: '/',
		  resave: true,
		  saveUninitialized: true,
		  httpOnly: true,
		  secure: false,
		  maxAge: null
	  }
	}
}