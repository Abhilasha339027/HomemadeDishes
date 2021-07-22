const checkAuth = require("../../utils/checkAuth");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const { EMAIL, EMAIL_PASS, FROM_MAIL_LINE } = require("../../config");
const {
  validateApplyChefInput,
} = require("../../utils/Validators/validateApplyChefInput");
const { UserInputError } = require("apollo-server");
const User = require("../../models/User");
const comparePassword = require("../../utils/comparePassword");
const generateToken = require("../../utils/generateToken");

const createEmail = (args) => {
  let email = `
  Hi, Someone wants to apply for job as Shef.
  <h3>Details</h3>
  <p>User Name: ${args.name} </p>
  <p>Email: ${args.email}</p>
  <p>Phone: ${args.phone}</p>
  <p>Cuisine: ${args.cuisine}</p>
  <p>
  `;
  return email;
};

module.exports = {
  Mutation: {
    async applyForChef(_, { chefApplyInput: { ...args } }) {
      const { errors, isValid } = validateApplyChefInput(args);

      if (!isValid) {
        throw new UserInputError("Errors in input", { errors });
      }

      let checkMail = await User.findOne({
        $or: [{ email: args.email }, { handle: args.handle }],
      }).select("+email +password");

      if (checkMail?.role === "user") {
        const token = await comparePassword(args.password, checkMail, errors);

        let editChef = await User.findByIdAndUpdate(
          checkMail.id,
          { ...args, role: "chef" },
          { new: true }
        );

        editChef = await editChef.save();
        return { ...editChef, id: editChef.id, token };
      }

      const password = await bcrypt.hash(args.password, 12);

      const chef = new User({
        ...args,
        password,
        role: "chef",
        createdAt: new Date().toISOString(),
      });

      const res = await chef.save();
      const token = generateToken(res);

      return {
        ...res._doc,
        id: res.id,
        token,
      };

      // let username;

      // let transporter = nodemailer.createTransport({
      //   host: "smtp.gmail.com",
      //   port: 465,
      //   secure: true,
      //   auth: {
      //     user: EMAIL,
      //     pass: EMAIL_PASS,
      //   },
      // });

      // await transporter.sendMail({
      //   from: FROM_MAIL_LINE,
      //   to: EMAIL,
      //   subject: "New Job Application",
      //   html: createEmail(args, username),
      // });

      return "Done";
    },
  },
};
