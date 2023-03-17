const emailOfferAccepted = (profile) => {
  return `
    <!DOCTYPE html>
<html>
  <head>
    <title>Notification d'acceptation de votre offre</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body>
    <h1>Votre offre a été acceptée !</h1>
    <p>Bonjour ${profile.FirstName},</p>
    <p>Nous avons le plaisir de vous informer que une de vos offres a été acceptée sur MyFrips. Félicitations ! Vous avez 24 heures pour effectuer le paiement autrement l'offre disparaîtra</p>
    <p>Pour voir les détails de la transaction et finaliser l'achat, veuillez cliquer sur le lien ci-dessous :</p>
    <p><a                                     href=https://myfrips.ch/members/myFrips/myProposition    >Voir les détails de la transaction</a></p>
    <p>Merci de votre confiance,</p>
    <p>L'équipe MyFrips</p>
  </body>
</html>
    `;
};

module.exports = {emailOfferAccepted}
