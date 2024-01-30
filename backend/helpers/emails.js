import nodemailer from 'nodemailer';

export const emailRegister = async(data) => {
    
    const {email, name, token} = data;

    const transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "0a244c90b3bbdf",
          pass: "5631cac8783d92"
        }
    });


    //Information of the email
    const info = await transport.sendMail({
        from: '"Taskify - Project Administrator" <accounts@taskify.com>',
        to: email,
        subject: "Taskify - Confirm your account",
        text: 'Confirm your account to continue using Taskify',
        html: `
            <p>Hello: ${name}, We need to confirm your account.  </p>
            <p>Your account is almost ready, you just need to visit  <a href='${process.env.FRONTEND_URL}/confirm/${token}'> Confirm Account </a></p>

            <p>If you did not create this account, ignore this email.</p>
        
        
        `,
    })
}
