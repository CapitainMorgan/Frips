const emailMessage = (profile,sender,id_Chat, item,pricepropose) => {

  return `
  <html lang="fr">
  <head>
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
  </head>
  <div
    id="__react-email-preview"
    style="
      display: none;
      overflow: hidden;
      line-height: 1px;
      opacity: 0;
      max-height: 0;
      max-width: 0;
    "
  >
    
    
  </div>

  <body
    style="
      background-color: #ffffff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
    "
  >
    <table
      style="
        background-color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
      "
      align="center"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      width="100%"
    >
      <tbody>
        <tr>
          <td>
            <table
              align="center"
              role="presentation"
              cellspacing="0"
              cellpadding="0"
              border="0"
              width="100%"
              style="
                max-width: 37.5em;
                margin: 0 auto;
                padding: 20px 0 48px;
                width: 580px;
              "
            >
              <tr style="width: 100%">
                <td>
                  <table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <img alt="Airbnb"
                          src=${"https://myfrips.ch/Logo.png"}
                          width="40" height="40" style=" display: block;
                          outline: none; border: none; text-decoration: none; "
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  ${
                    Boolean(profile.image?.image)
                      ? `<table
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <img
                            alt="${profile.Firstname}"
                            src="https://api.myfrips.ch:5000//imageProfile/${profile.id}/${profile.image?.image}"
                            width="96"
                            height="96"
                            style="
                              display: block;
                              outline: none;
                              border: none;
                              text-decoration: none;
                              margin: 0 auto;
                              margin-bottom: 16px;
                              border-radius: 50%;
                            "
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>`
                      : "<br/>"
                  }
                  <table
                    style="padding-bottom: 20px"
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td>
                          <table
                            align="center"
                            role="presentation"
                            cellspacing="0"
                            cellpadding="0"
                            border="0"
                            width="100%"
                          >
                            <tbody style="width: 100%">
                              <tr style="width: 100%">
                                <p
                                  style="
                                    font-size: 32px;
                                    line-height: 1.3;
                                    margin: 16px 0;
                                    font-weight: 700;
                                    color: #484848;
                                  "
                                >
                                  Bonjour ${profile.Firstname}
                                </p>
                               
                                ${content(pricepropose,sender)}
                                ${Boolean(item) ? `
                                
                                <table
  style="
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 40px;
    padding-bottom: 40px;
  "
  align="center"
  border="0"
  cellpadding="0"
  cellspacing="0"
  role="presentation"
  width="100%"
>
  <tbody>
    <tr>
      <td>
        <table
          align="center"
          role="presentation"
          cellspacing="0"
          cellpadding="0"
          border="0"
          width="100%"
        >
          <tbody style="width: 100%">
            <tr style="width: 100%">
              <td>
                <img alt="${item.Name}"
                src=${`https://api.myfrips.ch:5000//images/${item.id}/${item.image[0].image}`}
                width="150px" height="150px" style=" display: block; outline:
                none; border: none; text-decoration: none; float: left;
                object-fit: cover; " />
              </td>
              <td style="vertical-align: top; padding-left: 12px">
                <p
                  style="
                    font-size: 14px;
                    line-height: 2;
                    margin: 0;
                    font-weight: 500;
                  "
                >
                  ${item.Name}
                </p>
                <p
                  style="
                    font-size: 14px;
                    line-height: 2;
                    margin: 0;
                    color: #747474;
                    font-weight: 500;
                  "
                >
                  ${item.Size}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
                                `:""}

                                <a
                                  href=https://myfrips.ch/member/message/${id_Chat}
                                  style="
                                    background-color: #82a0c2;
                                    border-radius: 3px;
                                    color: #fff;
                                    font-size: 18px;
                                    text-decoration: none;
                                    text-align: center;
                                    display: inline-block;
                                    width: 100%;
                                    p-y: 19px;
                                    line-height: 100%;
                                    max-width: 100%;
                                    padding: 19px 0px;
                                  "
                                  >
                                  ${typeMessage(item)}
                                </a>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </table>
            <table align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                    <tbody>
                      <tr>
                        <td>
                          <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%">
                            <tbody style="width:100%">
                              <tr style="width:100%">
                              
                                <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#cccccc;margin:20px 0" />
                                <a target="_blank" style="color:#9ca299;text-decoration:underline;font-size:14px" href="https://myfrips.ch/">MyFrips</a>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
  
  `;
};

const typeMessage = (price) => {
  if (price) {
    return `
    
    <span
  style="
    background-color: #82a0c2;
    border-radius: 3px;
    color: #fff;
    height:30px,
    font-size: 18px;
    text-decoration: none;
    text-align: center;
    display:flex;
    height:50px;
    justify-content:center;
    align-items:center;
    width: 100%;
    p-y: 19px;
    max-width: 100%;
    height:25px,
    line-height: 120%;
    text-transform: none;
    mso-padding-alt: 0px;
    mso-text-raise: 14.25px;
  "
  >Voir l'offre</span
>
    `;
  } else {
    return `
    <span
  style="
    background-color: #82a0c2;
    border-radius: 3px;
    color: #fff;
    font-size: 18px;
    text-decoration: none;
    text-align: center;
    display:flex;
    width: 100%;
    height:25px;
    justify-content:center;
    align-items:center;

    p-y: 19px;
    max-width: 100%;
    line-height: 120%;
    text-transform: none;
    mso-padding-alt: 0px;
    mso-text-raise: 14.25px;
  "
  >Voir le message</span
>
    `;
  }
};

const content = (pricepropose,sender) => {
  if (pricepropose) {
    return `
  <p style="
  font-size: 17px;
  line-height: 24px;
  margin: 16px 0;
    text-align: left;
">Tu viens de recevoir une offre intéressante sur l'un de tes produits de la part de ${sender.Pseudo} sur myfrips.ch ! On voulait te tenir informé(e) de cette opportunité sans tarder.</p>

<p style="font-size: 17px; line-height: 24px; margin: 16px 0; text-align: left;">
    <span style="font-weight: bold;">${sender.Pseudo}</span> a proposé une offre de <span style="font-weight: bold;">${pricepropose} CHF</span> pour ton annonce, et nous voulions nous assurer que tu ne passes pas à côté de cette formidable opportunité.
</p>


  <p style="
  font-size: 17px;
  line-height: 24px;
  margin: 16px 0;
    text-align: left;
"> Pour examiner cette offre, il te suffit de te connecter à ton compte et de te rendre dans ta section Message. Tu pourras alors accepter, refuser. </p>

<p style="
font-size: 17px;
line-height: 24px;
margin: 16px 0;
font-weight: bold;
text-align: left;
"> N'oublie pas que tu peux toujours contacter ${sender.Pseudo} pour clarifier toute question ou détail avant de prendre une décision. </p>

<p style="
font-size: 17px;
line-height: 24px;
margin: 16px 0;
text-align: left;
"> Merci de faire confiance à notre plateforme pour tes transactions. Nous te souhaitons une excellente expérience d'achat et de vente ! </p>
`;
  } else {
    return `
    <p style="
    font-size: 17px;
    line-height: 24px;
    margin: 16px 0;
    text-align: left;
    "> Nous sommes ravis de vous informer que vous avez reçu un nouveau message sur notre plateforme de la part de <strong>${sender.Pseudo}.</strong></p>

    <p style="
    font-size: 17px;
    line-height: 24px;
    margin: 16px 0;
    text-align: left;
    ">Pour accéder à votre boîte de réception, connectez-vous simplement à votre compte et cliquez sur la section "Messages". Vous pourrez y lire et répondre à tous vos messages avec les autres membres de notre communauté. </p>

    <p style="
    font-size: 17px;
    line-height: 24px;
    margin: 16px 0;
    text-align: left;
    "> Nous espérons que ce nouveau message vous aidera à conclure de nouvelles transactions et à établir de nouvelles relations avec les autres membres de notre communauté.</p>

    <p style="
    font-size: 17px;
    line-height: 24px;
    margin: 16px 0;
    text-align: left;
    "> Merci de faire confiance à notre plateforme.</p>

    <p style="
    font-size: 17px;
    line-height: 24px;
    margin: 16px 0;
    text-align: left;
    "> Cordialement, </p>

    <p style="
    font-size: 17px;
    line-height: 24px;
    margin: 16px 0;
    text-align: left;
    "> L'équipe de MyFrips </p>
  `;
  }
};

module.exports = {emailMessage};
