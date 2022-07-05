interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: process.env.MAIL_ADDRESS || 'generic@generic.com.br',
      name: process.env.MAIL_NAME || 'generic',
    },
  },
} as IMailConfig;
