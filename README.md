# Convention d'étude

Page publique de signature de la convention d'étude Neoma Conseil. La personne ouvre le lien du site, remplit ses informations, relit la convention, signe, puis télécharge son PDF. Le même PDF est envoyé à Neoma Conseil.

## Configuration

1. Installer les dépendances :

```bash
npm install
cp .env.example .env.local
```

2. Renseigner le SMTP dans `.env.local` pour que le PDF parte par email. Sans ces valeurs, le signataire peut quand même télécharger sa copie.

   - **Brevo** (300 emails par jour) : hôte `smtp-relay.brevo.com`, port `587`.
   - **Gmail** : hôte `smtp.gmail.com`, port `587`, avec un mot de passe d'application.

3. Lancer l'application :

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Mise en ligne

Le plan gratuit de Vercel suffit. Importer le dépôt GitHub, recopier les variables de `.env.local`, puis partager l'adresse du site :

```text
https://<domaine>
```

Le texte de la convention est dans [`lib/contract.ts`](lib/contract.ts).

## Limite

La signature est une signature manuscrite horodatée (heure de Paris). Ce n'est pas une signature électronique qualifiée au sens du règlement eIDAS.
