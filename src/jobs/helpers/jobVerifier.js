'use strict';
const testsManager = require('../../tests/models/manager');

module.exports.verifyJobBody = (req, res, next) => {
    let errorToThrow;
    let jobBody = req.body;
    if (!(jobBody.run_immediately || jobBody.cron_expression)) {
        errorToThrow = new Error('Please provide run_immediately or cron_expression in order to schedule a job');
        errorToThrow.statusCode = 400;
    }
    next(errorToThrow);
};

module.exports.verifyTestExists = async (req, res, next) => {
    let errorToThrow;
    let jobBody = req.body;
    if (jobBody.test_id) {
        try {
            await testsManager.getTest(jobBody.test_id);
        } catch (error) {
            if (error.statusCode === 404) {
                errorToThrow = new Error(`test with id: ${jobBody.test_id} does not exist`);
                errorToThrow.statusCode = 400;
            } else {
                errorToThrow = new Error(error.message);
                errorToThrow.statusCode = 500;
            }
        }
    }
    next(errorToThrow);
};