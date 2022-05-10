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
        name: 'string',
        registry: 'string',
        agency: 'string',
        account: 'string',
        account_dv: 1,
        client_code: 1,
        assignor_code: 1,
        assignor_code_dv: 1,
        document: 'string',
        transmission_code: 'string',
        currency: 'string',
        invoice_value: 1,
        delay_fines: 1,
        delay_taxes: 1,
        message_1: 'string',
        message_2: 'string',
        message_3: 'string',
        instruction_1: 'string',
        instruction_2: 'string',
        instruction_3: 'string',
        user_id: 1,
        username: 'string',
        active: 'string',
      },
      Credit: {
        client_id: 1,
        order_id: 1,
        user_id: 1,
        description: 'string',
        value: 'string',
        date: new Date().toLocaleDateString(),
        used: 'string',
        used_at: new Date().toLocaleDateString(),
      },
      FinancialMoviment: {
        client_id: 1,
        provider_id: 1,
        financial_moviment_type_id: 1,
        bank_account_id: 1,
        shipment_file_id: 1,
        description: 'string',
        due_date: new Date().toLocaleDateString(),
        value: 'string',
        products_value: 'string',
        services_value: 'string',
        credits_value: 'string',
        fees_fines_value: 'string',
        nf_code: 'string',
        nf_receipt: 'string',
        nf_receipt_date: new Date().toLocaleDateString(),
        nf_issue_date: new Date().toLocaleDateString(),
        nf_cStat_receipt: 'string',
        nf_xmotivo_receipt: 'string',
        nf_number: 1,
        nf_key: 'string',
        nf_protocoll: 'string',
        nf_protocoll_date: 'string',
        nf_protocoll_menssage: 'string',
        nf_year_month: 'string',
        nf_lot: 'string',
        nf_canceled: 'string',
        nf_canceled_protocoll: 'string',
        nf_canceled_date: 'string',
        nf_canceled_reason: 'string',
        nf_status: 'string',
        nfse_number: 'string',
        nfse_verification_code: 'string',
        nfse_issue_date: new Date().toLocaleDateString(),
        nfse_rps_number: 1,
        nfse_canceled: 'string',
        nfse_status: 'string',
        finished: 'string',
        payment_method: 'string',
        invoice_status: 'string',
        invoice_registered: 'string',
        invoice_bank_downloaded: 'string',
        operation_type: 'string',
        generated_user_id: 1,
        downloaded_user_id: 1,
        downloaded_at: new Date().toLocaleDateString(),
      },
      FinancialMovimentOrder: {
        financial_moviment_id: 1,
        order_id: 1,
      },
      FinancialMovimentType: {
        product_id: 1,
        financial_moviment_type_group_id: 1,
        name: 'name',
      },
      FinancialMovimentTypeGroup: {
        operation_type: 'string',
        active: 0,
        name: 'string',
      },
      FiscalSetting: {
        company_name: 'string',
        cnpj: 'string',
        city_registration: 'string',
        state_registration: 'string',
        address: 'string',
        nfse_env: false,
        nfse_rps_number: 0,
        certified_file: 'string',
        certified_validate: new Date().toLocaleDateString(),
        certified_password: 'string',
        nf_emission_due: 0,
        dir: 0,
        invoice_email_copy: 'string',
        active: 'string',
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
  './src/modules/financial/infra/http/routes/financialMovimentsTypes.routes.ts',
  './src/modules/financial/infra/http/routes/financialMovimentsTypesGroups.routes.ts',
  './src/modules/financial/infra/http/routes/fiscalSettings.routes.ts',
];

swaggerAutogen({
  openapi: '3.0.0',
})(outputFile, endpointsFiles, doc);
