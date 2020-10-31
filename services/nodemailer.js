const nodemailer = require("nodemailer");

const sendEmail = async (data) => {
  try {
    const {
      issue,
      location,
      details: { fName, lName, email, description },
    } = data;

    const date = new Date();

    const message = `
    <div style="text-align:center;width:80%;margin:auto">
        <h1 style="color: #fff;text-align:center;background:#0768ac;padding:40px 10px;">New issue have been reported.
        </h1>
        <div style="margin:auto; width:90%">
            <h1 style="text-align:left">Issue with ${issue}.</h1>
            <h3 style="text-align:left;">Reported By: ${fName} ${lName}</h3>
            <h4 style="text-align:left;font-weight: normal;">${description}</h4>
            <hr style="" />
            <div style="text-align: left">
                <span style="color:#0768AC;text-align:left; font-weight: bold;">Date:</span>
                <br>
                <span style="text-align:left">${
                  date.toISOString().split("T")[0]
                }</span>
                <br>
                <span style="color:#0768AC;text-align:left; font-weight: bold;">Location:</span>
                <br>
                <span style="text-align:left">${location.address}</span>
            </div>
        </div>
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
      tls: { rejectUnauthorized: false },
    });

    const mailOptions = {
      from: "virdi.rocking_96@outlook.com", // sender address
      to: "rupindervirdi96@outlook.com", // list of receivers
      subject: "Report Issue", // subject line
      html: message,
    };

    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) return false;
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendEmail;
