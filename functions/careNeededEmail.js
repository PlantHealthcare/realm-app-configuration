exports = async function() {
  
  let apiKey = context.values.get("sendgrid_api_key");
  
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(apiKey)
  const msg = {
    to: 'galateanmarcell96@gmail.com',
    from: 'planthealthcareapp@gmail.com',
    subject: 'Care needed for plant',
    text: 'Care needed for plant',
  }
  await sgMail.send(msg)

};
