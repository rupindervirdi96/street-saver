const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  try {
    const { issue, location, details } = data;
    const { fName, lName, email, description } = details;
    const date = new Date();

    const message = `
    <div style="text-align:center;width:80%;margin:auto">
    <h1 style="color: #fff;text-align:center;background:#0768ac;padding:40px 10px;">New issue have been reported.</h1>
    <h2>Issue with ${issue}.</h2>
    <span>${description}</span> 
    <hr/>
    <div style="display:grid;grid-template-columns:1fr 1fr">
    
    <div>
      <h3 style="color:#0768AC;text-align:left">Date:</h3>
      <h3 style="text-align:left">${date.toISOString().split("T")[0]}</h3>
      <h3 style="color:#0768AC;text-align:left">Location:</h3>
      <h3 style="text-align:left">${location.address}</h3>
    </div>
    </div>
    </div>
    `;

    const transporter = nodemailer.createTransport({
      service: "hotmail",
      auth: {
        user: "virdi.rocking_96@outlook.com",
        pass: "zxhbk546",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: "virdi.rocking_96@outlook.com", // sender address
      to: "rupindervirdi96@outlook.com", // list of receivers
      subject: "Hello", // subject line
      html: message,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        return false;
      }
      console.log(info.response);
    });

    // return data;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendEmail;
