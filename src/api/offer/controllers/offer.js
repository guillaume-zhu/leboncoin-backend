"use strict";

/**
 * offer controller
 */

const { createCoreController } = require("@strapi/strapi").factories;
const stripe = require("stripe")(process.env.STRIPE_API_SECRET);

module.exports = createCoreController("api::offer.offer", ({ strapi }) => ({
  async deleteAll(ctx) {
    try {
      // stocker l'id de l'utilisateur
      const userId = ctx.state.user.id;
      //   console.log(userId);

      // chercher et stocker les informations de l'user + populate la clef offers
      const userObject = await strapi.entityService.findOne(
        "plugin::users-permissions.user",
        userId,
        { populate: ["offers"] }
      );
      //   console.log(userObject);

      // stocker les offres liées à l'user
      const offers = userObject.offers;
      //   console.log(offers);

      // faire une boucle pour passer en revue chaque offre
      for (let i = 0; i < offers.length; i++) {
        // console.log(offers[i]);
        //// supprimer l'offre à chaque tour de boucle
        await strapi.entityService.delete("api::offer.offer", offers[i].id);
        // console.log(offers[i].id);
      }
      // return message
      return { message: "All offers deleted" };
      //   return "miaou";
    } catch (error) {
      ctx.response.status = 500;
      return { message: error.message };
    }
  },

  async buy(ctx) {
    try {
      const { status } = await stripe.charges.create({
        amount: ctx.request.body.amount * 100,
        currency: "eur",
        description: ctx.request.body.title,
        source: ctx.request.body.token,
      });
      return { status: status };
    } catch (error) {
      ctx.response.status = 500;
      return { message: error.message };
    }
  },
  async create(ctx) {
    try {
      // stocker l'id de l'user qui fait la requête
      const userId = ctx.state.user.id;
      // console.log(userId);

      // stocker les informations de la requête body
      ///// if la requête vient d'un form data transformer string en objet
      let offer = ctx.request.body.data;
      if (typeof ctx.request.body.data === "string") {
        offer = JSON.parse(ctx.request.body.data);
      }

      // console.log(offer);

      // stocker l'id de la clef d'owner
      const ownerId = offer.owner;
      // console.log(ownerId);

      ///// si l'id de la clef owner du body n'est pas identique à celle de l'user
      if (ownerId !== userId) {
        /// return 403 + erreur
        ctx.response.status = 403;
        return { message: "ownerId different from user Id" };
      }

      ///// sinon autoriser le fonctionnement normal du controller create
      const { data, meta } = await super.create(ctx);
      ///// return message succès
      return { data, meta };
    } catch (error) {
      ctx.response.status = 500;
      return { message: error.message };
    }
  },
}));

//// lorsqu'un user crée une offre, si la clef owner du body n'est pas identique au sien retourner une erreur, sinon créer normalement
