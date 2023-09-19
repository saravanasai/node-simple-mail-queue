const express = require('express');
const db = require('./models');
const queue = require('./src/Queue');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const port = 3000

app.post('/add-mail-on-queue', async (req, res) => {

    let jobData = {
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
    }

    let insertedJob = await db.Job.create({
        jobType: "mail",
        jobData: JSON.stringify(jobData),
        status: 1,
        islocked: 0
    });

    if (!insertedJob) {
        return res.status(500).json({ message: "Something went wrong" });
    }


    return res.status(200).json({ message: "You will recvive mail sortly" });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


