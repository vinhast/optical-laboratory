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
  './src/modules/commercial/infra/http/routes/providers.routes.ts',
  './src/modules/commercial/infra/http/routes/clients.routes.ts',
  './src/modules/financial/infra/http/routes/bankAccounts.routes.ts',
  './src/modules/warehouse/infra/http/routes/products.routes.ts',
  './src/modules/warehouse/infra/http/routes/productCategories.routes.ts',
];

swaggerAutogen({
  openapi: '3.0.0',
})(outputFile, endpointsFiles, doc);
