module.exports = ({ env }) => ({
  email: {
    provider: "sendgrid",
    providerOptions: {
      apiKey: env("SENDGRID_API_KEY"),
    },
    settings: {
      defaultFrom: "contacto.subte@gmail.com",
      defaultReplyTo: "hola@subte.uy",
    },
  },
});
