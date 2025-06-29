const promptFn = require('./prompt');

module.exports = {
  prompt: async ({ prompter, args }) => { 
    const result = await promptFn(args, prompter);
    return result;
  },
};