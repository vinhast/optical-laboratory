import swaggerAutogen from 'swagger-autogen';
import 'dotenv/config';

const doc = {
  info: {
    title: 'Optical Labaratory - API',
    description: 'Documentação API Optical Labaratory',
  },
  servers: [
    {
      url: 'http://localhost:3333/',
    },
  ],
  schemes: ['http'],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        name: 'authorization',
        scheme: 'bearer',
        in: 'header',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      User: {
        role_id: {
          type: 'number',
        },
        name: {
          type: 'string',
        },
        username: {
          type: 'string',
        },
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        active: {
          type: 'string',
        },
        remote_acess: {
          type: 'string',
        },
      },
      OrderProduct: {
        order_id: {
          type: 'number',
        },
        product_id: {
          type: 'number',
        },
        initial_price: {
          type: 'string',
        },
        single_discount: {
          type: 'string',
        },
        total_discount: {
          type: 'string',
        },
        charged_value: {
          type: 'string',
        },
        cashback_value: {
          type: 'string',
        },
        taxes: {
          type: 'string',
        },
        quantity: {
          type: 'number',
        },
        wrap: {
          type: 'boolean',
        },
        released: {
          type: 'boolean',
        },
        cfop: {
          type: 'number',
        },
      },
      Order: {
        os: { type: 'string' },
        client_id: { type: 'number' },
        products_value: { type: 'string' },
        service_value: { type: 'string' },
        lenses_value: { type: 'string' },
        charged_value: { type: 'string' },
        credit_value: { type: 'string' },
        shipping_method: { type: 'string' },
        shipping_value: { type: 'string' },
        shipping_time: { type: 'string' },
        payment_method: { type: 'string' },
        payment_date: { type: 'Date' },
        installments: { type: 'number' },
        status: { type: 'number' },
        type: { type: 'string' },
        profit: { type: 'string' },
        note: { type: 'string' },
        user_id: { type: 'number' },
      },
      BankAccount: {
        name: { type: 'string' },
        registry: { type: 'string' },
        agency: { type: 'string' },
        account: { type: 'string' },
        account_dv: { type: 'number' },
        client_code: { type: 'number' },
        assignor_code: { type: 'number' },
        assignor_code_dv: { type: 'number' },
        document: { type: 'string' },
        transmission_code: { type: 'string' },
        currency: { type: 'string' },
        invoice_value: { type: 'number' },
        delay_fines: { type: 'number' },
        delay_taxes: { type: 'number' },
        message_1: { type: 'string' },
        message_2: { type: 'string' },
        message_3: { type: 'string' },
        instruction_1: { type: 'string' },
        instruction_2: { type: 'string' },
        instruction_3: { type: 'string' },
        user_id: { type: 'number' },
        username: { type: 'string' },
        active: { type: 'string' },
      },
      Credit: {
        client_id: { type: 'number' },
        order_id: { type: 'number' },
        user_id: { type: 'number' },
        description: { type: 'string' },
        value: { type: 'string' },
        date: { type: 'Date' },
        used: { type: 'string' },
        used_at: { type: 'Date' },
      },
      FinancialMoviment: {
        client_id: { type: 'number' },
        provider_id: { type: 'number' },
        financial_moviment_type_id: { type: 'number' },
        bank_account_id: { type: 'number' },
        shipment_file_id: { type: 'number' },
        description: { type: 'string' },
        due_date: { type: 'Date' },
        value: { type: 'string' },
        products_value: { type: 'string' },
        services_value: { type: 'string' },
        credits_value: { type: 'string' },
        fees_fines_value: { type: 'string' },
        nf_code: { type: 'string' },
        nf_receipt: { type: 'string' },
        nf_receipt_date: { type: 'Date' },
        nf_issue_date: { type: 'Date' },
        nf_cStat_receipt: { type: 'string' },
        nf_xmotivo_receipt: { type: 'string' },
        nf_number: { type: 'number' },
        nf_key: { type: 'string' },
        nf_protocoll: { type: 'string' },
        nf_protocoll_date: { type: 'string' },
        nf_protocoll_menssage: { type: 'string' },
        nf_year_month: { type: 'string' },
        nf_lot: { type: 'string' },
        nf_canceled: { type: 'string' },
        nf_canceled_protocoll: { type: 'string' },
        nf_canceled_date: { type: 'string' },
        nf_canceled_reason: { type: 'string' },
        nf_status: { type: 'string' },
        nfse_number: { type: 'string' },
        nfse_verification_code: { type: 'string' },
        nfse_issue_date: { type: 'Date' },
        nfse_rps_number: { type: 'number' },
        nfse_canceled: { type: 'string' },
        nfse_status: { type: 'string' },
        finished: { type: 'string' },
        payment_method: { type: 'string' },
        invoice_status: { type: 'string' },
        invoice_registered: { type: 'string' },
        invoice_bank_downloaded: { type: 'string' },
        operation_type: { type: 'string' },
        generated_user_id: { type: 'number' },
        downloaded_user_id: { type: 'number' },
        downloaded_at: { type: 'Date' },
      },
      FinancialMovimentOrder: {
        financial_moviment_id: 1,
        order_id: 1,
      },
    },
  },
  security: [
    {
      bearerAuth: {
        type: 'http',
        scheme: 'Bearer',
      },
    },
  ],
};

const outputFile = './src/shared/infra/http/swagger.json';
const endpointsFiles = [
  './src/modules/commercial/infra/http/routes/orderProducts.routes.ts',
  './src/modules/commercial/infra/http/routes/orders.routes.ts',
  './src/modules/financial/infra/http/routes/bankAccounts.routes.ts',
  './src/modules/financial/infra/http/routes/credits.routes.ts',
  './src/modules/financial/infra/http/routes/financialMoviments.routes.ts',
  './src/modules/financial/infra/http/routes/financialMovimentsOrders.routes.ts',
];

swaggerAutogen({
  openapi: '3.0.0',
})(outputFile, endpointsFiles, doc);
