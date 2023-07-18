import nodemailer from "nodemailer"

export default new (class MailService {
  transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  async sendLink(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Активация аккаунта",
      text: "",
      html: `
        <div>
          <h1>Для активации аккаунта перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    })
  }
})()
