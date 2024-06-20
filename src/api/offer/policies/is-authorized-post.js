// module.exports = async (policyContext, config, { strapi }) => {
//   /// récupérer l'id de l'user qui fait le requete
//   const userId = policyContext.state.user.id;
//   //   console.log(userId);

//   /// récupérer le body de la requete
//   const offer = JSON.parse(policyContext.request.body.data);
//   //   console.log(offer);

//   /// récupérer l'id de la clef owner de la requete
//   const ownerId = offer.owner;
//   //   console.log(ownerId);

//   ////// si ownerId !== userId
//   if (ownerId !== userId) {
//     //// status 403 + return false

//     return false;
//   } else {
//     //// sinon return true
//     return true;
//   }
// };
