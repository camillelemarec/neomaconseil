# Convention d'étude

Page publique de signature de la convention d'étude Neoma Conseil. La personne ouvre le lien du site, remplit ses informations, relit la convention, signe, puis télécharge son PDF. Le même PDF est envoyé à Neoma Conseil.

## Configuration

1. Installer les dépendances :

```bash
npm install
cp .env.example .env.local
```

2. Renseigner uniquement l'email et le SMTP dans `.env.local`. Le nom, la fonction, la société et l'adresse sont dans [`lib/owner.ts`](lib/owner.ts). Sans SMTP, le signataire peut quand même télécharger sa copie.

   - **Gmail** : hôte `smtp.gmail.com`, port `587`, avec un mot de passe d'application.
   - **Brevo** (300 emails par jour) : hôte `smtp-relay.brevo.com`, port `587`.

3. Lancer l'application :

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Mise en ligne

GitHub Pages (`github.io`) affiche des fichiers statiques. Cette application a besoin d'un serveur pour créer le PDF et envoyer l'email, donc une adresse `github.io` ne peut pas faire signer.

Les secrets à créer dans le dépôt (Settings, Secrets and variables, Actions) sont seulement :

- `OWNER_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

Le nom du signataire Neoma Conseil n'en fait pas partie.

Le texte de la convention est dans [`lib/contract.ts`](lib/contract.ts).

## Limite

La signature est une signature manuscrite horodatée (heure de Paris). Ce n'est pas une signature électronique qualifiée au sens du règlement eIDAS.
