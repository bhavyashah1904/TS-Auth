export default {
    port : 3000,
    dbUri : "mongodb+srv://bhavyadb:Mongo%401111@cluster3.gl8wp0p.mongodb.net/ts-auth",
    logLevel : "info",
    accessTokenPrivateKey : "",
    refreshTokrnPrivateKey : "",
    //In production you need a proper smtp server and need to set secure to true
    smtp : {
        user: 'ucr4bsvsm456ddix@ethereal.email',
        pass: 'Rsd6jYgSmVmcZNK6UC',
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false
    },
};