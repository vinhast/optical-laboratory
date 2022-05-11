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
        order_id: 1,
        product_id: 1,
        initial_price: '100',
        single_discount: '100',
        total_discount: '100',
        charged_value: '100',
        cashback_value: '100',
        taxes: '100',
        quantity: 1,
        wrap: true,
        released: true,
        cfop: 1,
      },
      Order: {
        os: 'test_os',
        client_id: 1,
        products_value: '100',
        service_value: '100',
        lenses_value: '100',
        charged_value: '100',
        credit_value: '100',
        shipping_method: 'credit',
        shipping_value: '100',
        shipping_time: '90',
        payment_method: 'card',
        payment_date: '2022-04-05',
        installments: 1,
        status: 1,
        type: 'V',
        profit: 'N',
        note: 'test_note',
        user_id: 1,
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
      SaleTable: {
        name: 'string',
        description: 'string',
        active: true,
      },
      SaleTablePrice: {
        product_category_id: 1,
        table_id: 1,
        unit_price: 'string',
        wholesale_price: 'string',
        user_id: 1,
      },
      Provider: {
        company_social_name: 'test',
        company_name: 'test',
        cnpj: '123456789',
        phone: '123456789',
        mobile: '123456789',
        email: 'test@test.com',
        street: 'test',
        number: '1',
        complement: 'test',
        district: 'test',
        zip_code: '12345678',
        city: 'test',
        state: 'BA',
        ibge: 1,
        note: 'test',
        active: 'S',
      },
      Client: {
        cnpj: '123456789',
        company_name: 'test',
        table_id: 1,
      },
      Product: {
        product_category_id: 1,
        side: 'L',
        cylindrical: '100',
        spherical: '100',
        price: '100',
        bars_code: '1234567891011',
        active: 'S',
      },
      ProductCategory: {
        parent_id: 1,
        user_id: 1,
        name: 'test',
        description: 'test',
        type: 'A',
        ncm: 1,
        cst: 1,
        cfop: 1,
        unit_type_id: 1,
        price: '100',
        spherical_start: 1,
        spherical_end: 1,
        cylindrical_start: 1,
        cylindrical_end: 1,
      },
      StockMoviment: {
        product_id: 1,
        order_id: 1,
        financial_moviment_id: 1,
        user_id: 1,
        description: 'test',
        type: 'A',
        origin: 'AB',
        quantity: 1,
      },
      UnitType: {
        name: 'test',
        abbreviation: 'A',
      },
      ClientApplication: {
        name: 'test',
        email: 'test@test.com',
        avatar: 'image',
        street: 'test',
        cnpj: '123456789',
        number: '1',
        complement: 'test',
        district: 'test',
        city: 'test',
        state: 'T',
        zip_code: 'test',
        phone: '123456789',
        mobile: '123456789',
      },
      ClientApplicationUser: {
        username: 'test',
        password: '123456',
        active: true,
        client_application_id: 1,
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
  './src/modules/users/infra/http/routes/sessions.routes.ts',
  './src/modules/users/infra/http/routes/users.routes.ts',
  './src/modules/users/infra/http/routes/checkPermission.route.ts',
  './src/modules/users/infra/http/routes/menus.routes.ts',
  './src/modules/users/infra/http/routes/password.routes.ts',
  './src/modules/users/infra/http/routes/salesTables.routes.ts',
  './src/modules/users/infra/http/routes/salesTablesPrices.routes.ts',
  './src/modules/users/infra/http/routes/clientsApplicationsUsers.routes.ts',
  './src/modules/cache/infra/http/routes/cache.route.ts',
  './src/modules/commercial/infra/http/routes/orderProducts.routes.ts',
  './src/modules/commercial/infra/http/routes/orders.routes.ts',
  './src/modules/commercial/infra/http/routes/providers.routes.ts',
  './src/modules/commercial/infra/http/routes/clients.routes.ts',
  './src/modules/warehouse/infra/http/routes/products.routes.ts',
  './src/modules/warehouse/infra/http/routes/productCategories.routes.ts',
  './src/modules/warehouse/infra/http/routes/stockMoviments.routes.ts',
  './src/modules/warehouse/infra/http/routes/unitTypes.routes.ts',
  './src/modules/financial/infra/http/routes/bankAccounts.routes.ts',
  './src/modules/financial/infra/http/routes/credits.routes.ts',
  './src/modules/financial/infra/http/routes/financialMoviments.routes.ts',
  './src/modules/financial/infra/http/routes/financialMovimentsOrders.routes.ts',
  './src/modules/financial/infra/http/routes/financialMovimentsTypes.routes.ts',
  './src/modules/financial/infra/http/routes/financialMovimentsTypesGroups.routes.ts',
  './src/modules/financial/infra/http/routes/fiscalSettings.routes.ts',
  './src/shared/infra/http/routes/clientApplications.routes.ts',
];

swaggerAutogen({
  openapi: '3.0.0',
})(outputFile, endpointsFiles, doc);
