import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: "adityadifakerja@gmail.com",
    pass: "wfcxtqnlzfwfuukp",
  },
});

async function sendEmailService(to, subject, message) {
  try {
    const info = await transporter.sendMail({
      from: "adityadifakerja@gmail.com",
      to: to,
      subject: subject,
      html: `your token is ${message}`,
    });

    console.log("Email berhasil terkirim: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Gagal mengirim email:", error);
    throw new Error("Gagal mengirim email. Cek kredensial atau koneksi.");
  }
}

export { sendEmailService };
