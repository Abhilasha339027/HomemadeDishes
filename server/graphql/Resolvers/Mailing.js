const Mails = require("../../models/Mails");

module.exports = {
  Mutation: {
    SubscribeToMails: async (_, { email }) => {
      try {
        const newMail = new Mails({
          email,
          createdAt: new Date().toISOString(),
        });
      
        await newMail.save();
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
