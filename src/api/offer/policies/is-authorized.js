module.exports = async (policyContext, config, { strapi }) => {
  // chercher et stocker l'id de l'user avec policyContext
  const userId = policyContext.state.user.id;
  //   console.log(userId);

  // chercher et stocker l'id envoyé en params
  const params = policyContext.params.id;
  //   console.log(params);

  if (params) {
    // grace à l'id chercher et stocker l'offre liée à l'id et populate owner
    const offer = await strapi.entityService.findOne(
      "api::offer.offer",
      params,
      {
        populate: ["owner"],
      }
    );
    //   console.log(offer);

    // stocker l'id de la cléf owner de l'offre
    const owner = offer.owner;
    //   console.log(owner);
    const ownerId = owner.id;
    //   console.log(ownerId);

    // si l'id de la clef owner l'offre = l'id de l'utilisateur
    if (ownerId === userId) {
      /// return true
      return true;
      //// sinon return false
    } else {
      return false;
    }
  }
};
