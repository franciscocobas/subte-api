"use strict";

/**
 * A set of functions called "actions" for `sendcontactemail`
 */

module.exports = {
  index: async (ctx, next) => {
    let response = {};
    try {
      const { from, name, text, subject, tel } = ctx.request.body;

      if (from && name && text) {
        await strapi.plugins["email"].services.email.send({
          to: "contacto.subte@gmail.com",
          from: from,
          replyTo: from,
          subject: `Contacto de la web por parte de: ${name}`,
          text: text,
          html: `
            <p>Asunto: ${subject}</p>
            <p>${text}</p>
            <p style="margin-top: 1em">${
              tel ? `Teléfono de contacto: ${tel}` : ""
            }</p>
          `,
        });
        response.status = "ok";
      } else {
        response.status = "error";
        response.error = "Please send required fields.";
      }
    } catch (err) {
      response.status = "error";
      response.error = err;
    }
    ctx.body = response;
  },
};
