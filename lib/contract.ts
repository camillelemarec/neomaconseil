import type { ContractContent, Owner, Signer } from "@/lib/types";

/**
 * Convention d'étude Neoma Conseil.
 * Le texte suit le modèle « Template Convention d'Etude 2025 ».
 * Les champs du signataire remplacent les mentions variables du modèle.
 */
export function renderContract(signer: Signer, owner: Owner): ContractContent {
  const clientName = `${signer.firstName} ${signer.lastName}`;
  const clientPlace = `${signer.address}, ${signer.postalCode} ${signer.city}`;

  return {
    title: `Convention d'étude - ${signer.studyType}`,
    intro: [
      `Référence : ${signer.studyRef}`,
      "Entre les soussignés :",
      [
        signer.company,
        `SIRET : ${signer.siret}`,
        `située ${clientPlace}`,
        `représentée par ${signer.role}, ${clientName}`,
        `email : ${signer.email}`,
        `téléphone : ${signer.phone}`,
        "ci-après dénommé le Client,",
        "d'une part,",
      ].join("\n"),
      "Et",
      [
        owner.company,
        `située ${owner.address}`,
        `représentée par son ${owner.role},`,
        `M. ${owner.name}`,
        `email : ${owner.email}`,
        "d'autre part,",
      ].join("\n"),
      "Il a été préalablement rappelé que Neoma Conseil est une Junior-Entreprise commerciale composée uniquement d'élèves de NEOMA Business School, et membre de la Confédération Nationale des Junior-Entreprises. Elle a pour vocation de compléter la formation théorique dispensée dans son établissement d'enseignement supérieur par des applications pratiques à vocation pédagogique dans un contexte professionnel. C'est dans cet esprit que le Client a confié à Neoma Conseil la réalisation de l'étude définie ci-dessous. La présente Convention a pour objet de définir les obligations réciproques des parties et de préciser les modalités d'exécution de l'étude, comme défini dans la Convention d'étude " +
        signer.studyRef +
        ".",
      "Il a été convenu et arrêté ce qui suit :",
    ],
    articles: [
      {
        title: "Article 1 - Objet de la présente convention",
        body: "Neoma Conseil réalisera pour le Client la prestation prévue par la Convention d'étude. Les prestations à fournir par Neoma Conseil ont été préalablement établies avec le Client et acceptées par ce dernier. Elles sont détaillées, notamment en ce qui concerne la méthodologie employée, mais aussi le déroulement temporel dans la présente Convention d'étude.",
      },
      {
        title: "Article 2 - Collaboration",
        body: "Les parties s'engagent à assurer une étroite collaboration afin de vérifier, aussi souvent que l'une d'elles le jugera nécessaire, l'adéquation entre la prestation fournie et les besoins du Client, tels qu'ils sont définis dans la présente Convention d'étude. Conformément aux dispositions liant la Junior-Entreprise à ses étudiants, les membres de l'équipe projet et les différents intervenants peuvent à tout moment se retirer de la mission. La Junior-Entreprise mettra alors en œuvre tous les moyens à sa disposition pour assurer la continuité de la mission. Dans l'hypothèse où l'une des deux parties considérerait que la mission ne s'exécute plus conformément aux conditions initiales, celles-ci conviendront de se rapprocher afin d'examiner les possibilités d'adaptation de la Convention d'étude. En cas de désaccord persistant rendant impossible la poursuite de l'étude, la Convention d'étude pourra être rompue à l'initiative de l'une ou l'autre partie selon les conditions et modalités prévues à l'article relatif à la résiliation.",
      },
      {
        title: "Article 3 - Responsabilités",
        body: "Toute inexécution de l'une des obligations visées à la présente Convention d'étude engage la responsabilité de son auteur. Compte tenu tant de la nature de la mission que de la spécificité de Neoma Conseil, il convient de rappeler que Neoma Conseil et ses intervenants ne sont tenus qu'à une obligation de moyen. Ils mettront donc en œuvre tout leur savoir-faire et tous les moyens nécessaires à l'exécution de la mission qui leur est confiée par la présente Convention d'étude.",
      },
      {
        title: "Article 4 - Délais de réalisation",
        body: "Le délai de réalisation de l'étude est précisé dans la présente Convention d'étude. L'étude débute à la signature de la présente Convention d'étude sauf cas de force majeure ou cause imputable au Client et sous réserve de réception de l'acompte éventuellement prévu par la présente Convention d'étude avant la date d'échéance de la facture, ainsi que sous réserve de réception des éléments nécessaires à la réalisation de l'étude tels que mentionnés dans la présente Convention d'étude. La fin de l'étude se matérialisera par l'envoi du livrable final au Client, acté par la signature du procès-verbal de recette final par les deux parties. Si des validations intermédiaires sont faites au cours de l'étude, elles se feront au moyen d'un procès-verbal de recette intermédiaire.",
      },
      {
        title: "Article 5 - Budget",
        body: `Le prix de l'étude réalisée par Neoma Conseil dans le cadre de la présente Convention d'étude est fixé d'un commun accord à ${signer.amountHt} HT. Les frais engagés pour la réalisation des prestations feront l'objet d'une facturation au forfait. Le montant du forfait est précisé dans le budget et déterminé d'un commun accord par les parties.`,
      },
      {
        title: "Article 6 - Conditions de paiement",
        body: "Conformément à la présente Convention d'étude, le Client s'engage à régler à Neoma Conseil le montant défini à l'article 5 selon les modalités de l'échéancier prévu dans la présente Convention d'étude et avant échéance de la facture correspondante. Le Client s'engage à avoir réglé à Neoma Conseil les différents versements au plus tard 30 jours après l'émission de la facture qui leur est associée. En cas de retard de paiement, conformément à la loi 2008-776 du 4 août 2008, il sera appliqué des pénalités au taux de 3 fois le taux d'intérêt légal en vigueur. Il sera également appliqué une indemnité de recouvrement de 40 euros. Le délai de retard peut en outre être ajouté au délai de réalisation tel que défini dans l'article 4. En cas de non-paiement, Neoma Conseil se réserve le droit de faire appel au tribunal compétent tel que défini dans l'article 13.",
      },
      {
        title: "Article 6 (suite) - Cessation de la mission",
        body: "Dans l'hypothèse où la mission confiée par le Client cesserait à la seule initiative de Neoma Conseil, Neoma Conseil s'engage à rembourser au Client l'intégralité de l'acompte versé, hormis les phases déjà acceptées sans réserve par celui-ci. Dans le cas où le montant des JEH effectués serait inférieur à celui de l'acompte versé, Neoma Conseil s'engage à reverser la différence au Client. Dans le cas contraire, le Client devra verser à Neoma Conseil la différence entre l'acompte versé et le montant des JEH effectués. Dans l'hypothèse où la mission cesserait de la seule initiative du Client, le montant de l'acompte reste acquis pour Neoma Conseil. Dans le cas où le montant de l'acompte versé est inférieur au montant des JEH effectués par Neoma Conseil au moment de la signification de la rupture par le Client, le Client devra verser à Neoma Conseil la différence entre l'acompte versé et le montant des JEH effectués. Dans l'hypothèse où la mission confiée cesserait d'un commun accord, les parties à la présente Convention d'étude régleront de manière amiable le sort des sommes perçues par Neoma Conseil. Toute rupture de la présente Convention d'étude doit respecter les termes de l'article relatif à la résiliation.",
      },
      {
        title: "Article 7 - Garantie de la prestation",
        body: "La prestation réalisée par Neoma Conseil est soumise à une garantie de conformité d'une durée de 1 mois pour tout livrable sous forme de rapport (papier ou numérique) et 3 mois pour tout autre type de livrable, à compter de la signature du procès-verbal de recette finale par les deux parties. Au cours de cette période, tout motif d'insatisfaction du Client portant sur un élément du cahier des charges défini dans la présente Convention devra être pris en compte par Neoma Conseil, qui s'engage à commencer la correction des prestations sous quinze jours ouvrés, tout en fournissant au préalable une estimation de la durée des travaux.",
      },
      {
        title: "Article 8 - Force majeure",
        body: "En cas de force majeure, la partie empêchée verra ses obligations suspendues pendant la durée de la force majeure. La partie empêchée doit en aviser immédiatement l'autre partie par lettre recommandée avec accusé de réception. La partie empêchée informera également des dispositions palliatives qu'elle a prises ou se propose de prendre.",
      },
      {
        title: "Article 9 - Modifications",
        body: "Toute modification de la présente convention devra faire l'objet d'un avenant signé par les parties. Toutes les modifications à l'exception des modifications de la méthodologie de l'étude et de la résiliation de la présente Convention d'étude pourront faire l'objet d'un accord écrit sous forme de courriel. Les parties déclarent expressément que les courriels visant à modifier l'échéancier prévisionnel de l'étude, le budget prévisionnel et/ou le cahier des charges de la présente Convention d'étude auront entre elles la valeur d'une preuve écrite et renoncent à exiger toute confirmation par lettre. En outre, le Client affirme qu'il est seul propriétaire de son adresse de courriels mentionnée dans la Convention d'étude et s'engage à prévenir la Junior en cas de changement de celle-ci.",
      },
      {
        title: "Article 10 - Résiliation",
        body: "Toute résiliation de la présente Convention d'étude définie d'un commun accord par les deux parties, notamment dans le cas où aucune solution satisfaisante n'est trouvée lors des négociations portant sur la réalisation de l'étude, se fera par la rédaction et la signature d'un avenant de rupture à la Convention d'étude. Cet avenant viendra fixer d'un commun accord le travail et les JEH réalisés par Neoma Conseil et validés par le Client, le sort des sommes perçues par Neoma Conseil ainsi que les nouvelles modalités de paiement. Toute résiliation de la présente Convention d'étude en cas de désaccord persistant entre les deux parties rendant impossible la poursuite de la mission ou pour non-respect par l'une des parties des obligations prévues par la présente Convention d'étude se fera par lettre recommandée avec accusé de réception. Elle devra être précédée d'une mise en demeure de se conformer auxdites obligations. La partie ne pourra procéder à la résiliation de la Convention d'étude que passé un délai de 15 jours après notification par lettre recommandée avec accusé de réception à l'autre partie.",
      },
      {
        title: "Article 11 - Confidentialité",
        body: "Tous les membres de Neoma Conseil seront tenus au secret le plus absolu et s'engagent à ne communiquer à des tiers aucune information transmise par le Client, ni les rapports, travaux, études, résultats de la mission. Le Client autorise néanmoins Neoma Conseil à citer son nom, ainsi que le domaine de l'étude réalisée pour celui-ci, à titre de référence. Neoma Conseil, en tant que membre de la Confédération Nationale des Junior-Entreprises (CNJE), bénéficie de la marque Neoma Conseil, déposée à l'INPI. Cette marque impose un audit-conseil chaque année, réalisé par l'intermédiaire d'auditeurs-conseil mandatés par la CNJE. Ces derniers sont chargés de veiller au respect de la réglementation spécifique applicable aux Junior-Entreprises et à la protection de cette même marque. Ils sont ainsi susceptibles de consulter tous les documents contractuels, les échanges et les livrables relatifs à la présente convention. Dans ce cadre, les membres de la CNJE mandatés par celle-ci sont soumis à une clause de confidentialité.",
      },
      {
        title: "Article 12 - Propriété de l'étude",
        body: "L'ensemble des techniques et méthodes de recherche demeure la propriété de Neoma Conseil et ne pourra faire l'objet d'aucune utilisation ou reproduction sans accord exprès. L'intégralité des droits patrimoniaux sur l'ensemble des travaux définis précédemment est cédée au Client en exclusivité et de façon définitive, dès lors que le Client a procédé au paiement de ces derniers. L'étudiant conserve son droit moral sur les travaux réalisés. Neoma Conseil, en accord avec le Client, archivera les données concernant l'étude sur support informatique et papier. Cependant, aucune utilisation ou reproduction des travaux ou études ne pourra se faire sans l'autorisation écrite du Client. Le Client pourra exploiter ou faire exploiter les résultats de l'étude sans aucune rémunération au profit de Neoma Conseil, autre que celle mentionnée dans l'article relatif aux budgets et délais des prestations. Neoma Conseil se réserve le droit d'utiliser le nom et le logo du Client à titre de référence.",
      },
      {
        title: "Article 13 - Litiges",
        body: "La présente Convention d'étude est soumise au droit français. En cas de litige relatif à l'interprétation, l'exécution ou la fin de la présente Convention d'étude, les parties s'engagent à rechercher, avant tout recours contentieux, une solution à l'amiable. Client privé : en cas de désaccord persistant, le litige sera porté devant le tribunal judiciaire dont dépend le siège de Neoma Conseil. Administration publique : en cas de désaccord persistant, le litige sera porté devant le tribunal administratif dont dépend le siège de Neoma Conseil. Sous-traitance : en cas de désaccord persistant, le litige sera porté en premier lieu devant le Conseil d'administration de la Confédération Nationale des Junior-Entreprises. Dans le cas où le litige ne serait pas résolu, celui-ci sera porté devant le tribunal judiciaire dont dépend le siège de Neoma Conseil.",
      },
      {
        title: "Article 14 - Loi Informatique et Libertés",
        body: "Les termes « données à caractère personnel », « traiter/traitement », « responsable du traitement », « sous-traitant » ont la même signification que celle qui leur est donnée par la loi « Informatique et Libertés » du 6 janvier 1978, ainsi que par tout règlement européen dès ce dernier applicable, ci-après dénommés « la Réglementation ». Les données récoltées et transmises au Client au cours de cette étude peuvent être nominatives et à destination du Client. Chacune des parties, en sa qualité de responsable de traitement distinct, déclare faire son affaire des diverses mesures exigées par la Réglementation dans le cadre de la mise en œuvre des traitements de données à caractère personnel. Neoma Conseil ne saurait être tenue responsable d'un quelconque manquement du Client aux obligations qui lui incombent. Les informations relatives aux personnels du Client font l'objet d'un traitement informatique, sont destinées à Neoma Conseil et traitées par le Président pour la gestion de la clientèle de Neoma Conseil et sa prospection commerciale. Elles sont conservées pendant la durée du présent contrat, à laquelle s'ajoute une durée de cinq ans, et sont destinées au pôle commercial de Neoma Conseil. Conformément à la Réglementation, le personnel du Client dispose et peut exercer ses droits d'accès, de rectification, d'effacement, d'opposition, de limitation et à la portabilité des informations qui le concernent, et les faire rectifier en contactant le secrétaire général adjoint de Neoma Conseil, par courrier électronique à perrine.chapelle@neomaconseil.com ou par courrier postal.",
      },
      {
        title: "Article 15 - Lettre recommandée électronique",
        body: `Conformément à l'article 43 § 1 du règlement de l'Union européenne eIDAS, chaque partie autorise l'autre partie à lui adresser toutes notifications pour les besoins du dossier par courrier recommandé avec accusé de réception électronique aux adresses suivantes (ci-après, le « compte-mail ») : pour ${clientName} : ${signer.email} ; pour M. ${owner.name} : ${owner.email}. Chaque partie reconnaît et garantit qu'elle dispose de la maîtrise exclusive du compte e-mail qu'elle a elle-même indiqué, notamment pour son accès régulier, la confidentialité des identifiants qui permettent d'y accéder, et la gestion des paramètres de réception et de filtrage des courriers entrants. Le cas échéant, chaque partie garantit que tout tiers accédant au compte e-mail est autorisé par elle à la représenter et à agir en son nom. La partie concernée s'engage à signaler immédiatement toute perte ou usage abusif de son compte e-mail. Jusqu'à la réception d'une telle notification, toute action effectuée par une partie au travers de son compte e-mail sera réputée effectuée par elle et relèvera de sa responsabilité exclusive.`,
      },
      {
        title: "Article 16 - Prise d'effet de la convention",
        body: "La présente convention prendra effet à compter de sa signature. Elle est établie à Reims.",
      },
    ],
    closing: `Pour ${signer.company}\n${clientName}, ${signer.role}`,
    legalNotice:
      "La signature manuscrite horodatée matérialise l'accord du Client. Elle ne constitue pas une signature électronique qualifiée au sens du règlement eIDAS.",
  };
}
