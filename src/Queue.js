const db = require('../models');
const transporter = require("./Mailer");

async function processMailQueue() {


    let mailData = await db.Job.findOne({
        where:
        {
            jobType: "mail",
            status: 1,
            islocked: 0
        }
    })

    if (!mailData)
        return;

    await db.Job.update({ islocked: 1 }, {
        where: { id: mailData.id }
    });

    let info = JSON.parse(mailData.jobData);

    let mailOptions = {
        from: 'admin@zerocode.com',
        to: info.to,
        subject: info.subject,
        text: info.text
    };



    transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            await db.Job.update({ islocked: 0 }, {
                where: { id: mailData.id }
            });
        } else {
            await db.Job.update({ status: 0 }, {
                where: { id: mailData.id }
            });

            console.log('Email sent: ' + info.response);
        }

    })
}

setInterval(async () => {
    await processMailQueue();
}, 5000);