module.exports ={
    database:'mongodb://localhost:27017/meanauth',
    secret:'mysecret',
    production : process.env.MONGO_URI
}