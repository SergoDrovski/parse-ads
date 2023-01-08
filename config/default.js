module.exports = {
  "port": process.env.PORT,
  "mongoose": {
    "uri": `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@urldb.igpfrmb.mongodb.net/urldb?retryWrites=true&w=majority`
  }
}