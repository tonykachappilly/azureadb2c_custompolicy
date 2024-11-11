const express = require('express');

// Create an express instance
const app = express();
const accessCode = '88888';

app.use(express.json()); // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

app.post('/validate-accesscode', (req, res) => {
    if (accessCode === req.body.accessCode) {
        res.status(200).send();
    } else {
        const errorResponse = {
            version: "1.0",
            status: 409,
            code: "errorCode",
            requestId: "requestId",
            userMessage: "The access code you entered is incorrect. Please try again.",
            developerMessage: `The provided code ${req.body.accessCode} does not match the expected code for user.`,
            moreInfo: "https://docs.microsoft.com/en-us/azure/active-directory-b2c/string-transformations"
        };
        res.status(409).send(errorResponse);
    }
});

const port = process.env.PORT || 80;
app.listen(port, () => {
    console.log(`Access code service listening on port ${port}!`);
});
