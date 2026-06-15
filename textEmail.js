import transporter from "./config/email.js";

const sendTest = async () => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.ADMIN_EMAIL,
      subject: "Test Email from Marketplace",
      text: "If you see this, email setup is working 🎉",
    });

    console.log("Email sent successfully");
  } catch (err) {
    console.log(err);
  }
};

sendTest();