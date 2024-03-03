const { MercadoPagoConfig, Payment } = require('mercadopago');

// Seu código aqui


const client = new MercadoPagoConfig({
  accessToken:'TEST-8010438967553830-011511-2d95e55bff78877667d05c95759268ac-1640003182',
  options:{timeout: 5000, idempotencyKey:'Doming-001'}
});

const payment = new Payment(client);

const body = {
  transaction_amount: 1.0 ,
  description: 'Gerar pix de Teste' ,
  payment_method_id: 'mastercard' ,
  payer: {
    email: 'test_user_1325226208@testuser.com'
  },
  notification_url: 'http://192.168.1.13:5000/process_payment'
};

payment.create({body}).then(response=>console.log(response)).catch(error=>console.error('Erro no servidor:',error.message || error));