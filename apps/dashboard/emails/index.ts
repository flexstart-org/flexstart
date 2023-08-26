import { buildSendMail } from "mailing-core";
import nodemailer from "nodemailer";

const sendMail = buildSendMail({
  transport: nodemailer.createTransport({
    host: process.env.EMAIL_SERVER,
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  }),
  defaultFrom: "Flexstart <mail@flexstart.org>",
  configPath: "./mailing.config.json",
});

export default sendMail;

export const sendMarketingMail = buildSendMail({
  transport: nodemailer.createTransport({
    host: process.env.EMAIL_SERVER,
    port: 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  }),
  defaultFrom: "Mitesh from Flexstart <mitesh@flexstart.org>",
  configPath: "./mailing.config.json",
});
