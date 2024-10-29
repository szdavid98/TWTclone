import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { secret } from './code.generator.js';
import ffamod from '../models/gen.token.model.js';


dotenv.config()


export const sendmail = async (emailTo,uid)=>{
    const myEmail = process.env.EMAIL;
    const myPass = process.env.PASS;
    const uid1 = uid
    let cc = await secret()
    let authcode = await ffamod.findById(uid1);
    if(!authcode){
      const newC = new ffamod({
        _id: uid1,
        code: cc})
      await newC.save()
    }else{
      console.log('found')
      authcode.code =  cc
      await authcode.save()
    }
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth: {
          user: myEmail,
          pass: myPass
        }
      });
      const mailOptions = {
        from: myEmail,
        to: emailTo,
        subject: 'Verification Code',
        text: `Your one time verification code is: ${cc.toString()}`
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

}