"use strict";

/**
 * A set of functions called "actions" for `sendcontactemail`
 */

module.exports = {
  index: async (ctx, next) => {
    let response = {};
    try {
      const { nombre, organizacion, mail, pregunta } = ctx.request.body;

      if (nombre && mail) {
        await strapi.plugins["email"].services.email.send({
          to: "contacto.subte@gmail.com",
          from: mail,
          replyTo: mail,
          subject: `Inscripcion al conversatorio: ${nombre}`,
          text: mail,
          html: `
            <p>Se inscribió: ${nombre}</p>
            <p>Mail: ${mail}</p>
            <p>Organización: ${organizacion}<p>
            <p>Pregunta: ${pregunta}</p>
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
