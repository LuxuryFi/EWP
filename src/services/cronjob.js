/* eslint-disable no-await-in-loop */
const { CronJob } = require('cron');
const moment = require('moment-timezone');
const { TERM_STATUS, IDEA_STATUS } = require('../configs/ms-constants');
const { Term, Idea } = require('../models');
const logger = require('./loggerService');


const autoUpdateTheIdea = async () => {
  logger.info('Cronjob is running')
  const term = await Term.findOne({
    where: {
      status: TERM_STATUS.ONGOING,
    }
  });

  if (!term) {
    logger.error('Term not found');
  }
  logger.info('Term found', { term });

  const currentDate = new Date().getTime();
  const firstClosureDate = new Date(term.first_closure_date).getTime();
  const finalClosureDate = new Date(term.final_closure_date).getTime();
  const startDate = new Date(term.start_date);
  const endDate = new Date(term.end_date);

  logger.info('Current date', { currentDate });
  logger.info('First closure date', { firstClosureDate });
  logger.info('Final closure date', { finalClosureDate });
  console.log(currentDate)
  if (
      currentDate > firstClosureDate
      && currentDate > finalClosureDate
      && term.closure_status === 'first_closure'
    ) {
      console.log('final')
      const ideas = await Idea.update({
        status: IDEA_STATUS.CLOSED
      },{
        where: {
          term_id: term.term_id,
        }
      })

      const updateTerm = await Term.update({
        closure_status: 'final_closure',
      }, {
        where: {
          term_id: term.term_id,
        }
      })
      logger.info('Idea updated', { ideas });
    } else if (
      currentDate > firstClosureDate
      && term.closure_status === 'none'
    ) {
      console.log('first')
      const ideas = await Idea.update({
        status: IDEA_STATUS.FINAL_CLOSURE
      },{
        where: {
          term_id: term.term_id,
        }
      })

      const updateTerm = await Term.update({
        closure_status: 'first_closure',
      }, {
        where: {
          term_id: term.term_id,
        }
      })
      logger.info('Idea updated', { ideas });
    }
}

const onComplete = () => {
  logger.info('Cronjob done!')
};
exports.dailyReport = async () => {
  const autoUpdateIdea = new CronJob(
    '30 1 * * 1-6',
    autoUpdateTheIdea,
    onComplete,
    true,
    'Asia/Bangkok',
  ); // same timezone
  autoUpdateIdea.start();
};
