const Employee = require("./models/Employee")
const User = require("./models/User")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function generateToken(userId) {
  const token = jwt.sign({ userId }, '1qaz@WSX3edc$RFV', { expiresIn: '1h' });
  return token;
}

module.exports = {
    Query: {
        employees: async () => await Employee.find({}),
        employee: async (_, { id }) => await Employee.findById(id),
    },

    Mutation: {
        addEmployee: async (_, { first_name, last_name, email }) => {
            const newEmployee = new Employee({
                first_name,
                last_name,
                email,
            });

            return await newEmployee.save();
        },

        updateEmployee: async (_, { id, first_name, last_name, email }) => {
            const updatedEmployee = await Employee.findByIdAndUpdate(
                id,
                {
                    first_name,
                    last_name,
                    email,
                },
                { new: true }
            );

            return updatedEmployee;
        },

        deleteEmployee: async (_, { id }) => {
            const deletedEmployee = await Employee.findByIdAndDelete(id);

            if (!deletedEmployee) {
                throw new Error('Employee not found');
            }

            return deletedEmployee.id;
        },

        login: async (_, { username, password }) => {
            const user = await User.findOne({ username });
          
            if (!user) {
              throw new Error('Invalid credentials');
            }
          
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
              throw new Error('Invalid credentials');
            }
          
            const token = generateToken(user.id);
            return {
              userId: user.id,
              token,
              tokenExpiration: 1,
            };
        },

        addUser: async (_, { username, password }) => {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
              throw new Error('Username already exists');
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new User({
              username,
              password: hashedPassword,
            });
            await newUser.save();
            return newUser;
          },
    },
};
