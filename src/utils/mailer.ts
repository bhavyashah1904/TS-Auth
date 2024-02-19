import  config  from 'config';
import nodemailer, {SendMailOptions} from 'nodemailer'
import log from './logger';


//Here we are going to create some test credentials to provide to our default.ts for smtp server to send emails
// async function createTestCredentials() {
//     const creds = await nodemailer.createTestAccount();
//     console.log({ creds });
// }
// createTestCredentials();

//to send a mail with nodemailer we need to create a transoporter object and then use the .sendMail method on it

const smtp  = config.get<{
    user: string;
    pass: string;
    host: string;
    port: number;
    secure: boolean
}>("smtp")

const transporter = nodemailer.createTransport({
    ...smtp,
    auth : {user : smtp.user, pass : smtp.pass}
});


async function sendEmail(payload : SendMailOptions) {
    transporter.sendMail(payload, (err, info) => {
        if(err){
            log.error(err, "Error sending email")
            return;
        }
        log.info(`Preview URL : ${nodemailer.getTestMessageUrl(info)}`)
        // Message sent: <32c4d67c-ff31-4a9c-b9a8-6f6e5b5a9f5c>
        // Preview URL: https://ethereal.email/message/WwQNJaBUiKQDoAXafzRH
        
    })
}

export default sendEmail;