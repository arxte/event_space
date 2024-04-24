const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(cors());

// Настройка транспорта Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "ilyasovakzhan@gmail.com",
    pass: "pdomuziwteppulkh",
  },
});
// ryhkmngvibopxijq

// Обработка POST запроса для отправки письма
app.post("/send-email", async (req, res) => {
  const { to, subject, html } = req.body;

  try {
    // Отправка письма
    const info = await transporter.sendMail({
      from: "ilyasovakzhan@gmail.com",
      to,
      subject,
      html,
    });
    console.log("Email sent:", info.response);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
