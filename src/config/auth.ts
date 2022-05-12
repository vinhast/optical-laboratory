export default {
  jwt: {
    secret: process.env.APP_SECRET || 'fd88465cf574ee0beaa39ff545d481d9',
    expiresIn: '100d',
    expiresInForgotToken: 2,
  },
};
