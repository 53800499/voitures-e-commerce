# Configuration de Firebase Admin SDK

## Problème

Si vous voyez l'erreur :
```
Could not load the default credentials. Browse to https://cloud.google.com/docs/authentication/getting-started for more information.
```

Cela signifie que Firebase Admin SDK n'est pas correctement configuré.

## Solution

### Étape 1 : Obtenir les credentials Firebase Admin

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet
3. Cliquez sur l'icône ⚙️ (Settings) > **Project Settings**
4. Allez dans l'onglet **Service Accounts**
5. Cliquez sur **Generate new private key**
6. Un fichier JSON sera téléchargé (ex: `your-project-firebase-adminsdk-xxxxx.json`)

### Étape 2 : Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine de votre projet (s'il n'existe pas déjà) et ajoutez les variables suivantes :

```env
# Firebase Admin SDK Configuration
FIREBASE_PROJECT_ID=votre_project_id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@votre_project_id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nVotre_clé_privée_ici\n-----END PRIVATE KEY-----\n"
```

**Important :**
- `FIREBASE_PROJECT_ID` : Trouvez-le dans le fichier JSON téléchargé (champ `project_id`)
- `FIREBASE_CLIENT_EMAIL` : Trouvez-le dans le fichier JSON (champ `client_email`)
- `FIREBASE_PRIVATE_KEY` : Trouvez-le dans le fichier JSON (champ `private_key`)
  - **Vous devez inclure les `\n` dans la chaîne** pour que les sauts de ligne soient correctement interprétés
  - La clé doit être entre guillemets et inclure les `-----BEGIN PRIVATE KEY-----` et `-----END PRIVATE KEY-----`

### Exemple de configuration

```env
FIREBASE_PROJECT_ID=shobmarket-341da
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abc123@shobmarket-341da.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC...\n-----END PRIVATE KEY-----\n"
```

### Étape 3 : Redémarrer le serveur de développement

Après avoir ajouté les variables d'environnement, **redémarrez votre serveur Next.js** :

```bash
# Arrêtez le serveur (Ctrl+C)
# Puis relancez-le
npm run dev
```

## Vérification

Une fois configuré, vous devriez voir dans la console :
```
✅ Firebase Admin SDK initialisé avec credentials personnalisés
```

## Alternative : Utiliser un fichier de service account

Si vous préférez utiliser un fichier JSON directement (non recommandé pour la production) :

1. Placez le fichier JSON téléchargé dans le dossier `src/config/` (ex: `src/config/firebase-service-account.json`)
2. Modifiez `src/config/firebase-admin.ts` pour charger ce fichier :

```typescript
import serviceAccount from './firebase-service-account.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});
```

**⚠️ Attention :** Ne commitez jamais le fichier de service account dans Git ! Ajoutez-le à `.gitignore`.

## Sécurité

- **Ne commitez jamais** votre fichier `.env.local` ou le fichier JSON de service account
- Assurez-vous que `.env.local` est dans `.gitignore`
- En production, utilisez les variables d'environnement de votre plateforme d'hébergement (Vercel, Netlify, etc.)

## Dépannage

### L'erreur persiste après configuration

1. Vérifiez que les variables d'environnement sont bien nommées (sans `NEXT_PUBLIC_` pour Admin SDK)
2. Vérifiez que `FIREBASE_PRIVATE_KEY` contient bien les `\n` pour les sauts de ligne
3. Redémarrez complètement le serveur de développement
4. Vérifiez que le fichier `.env.local` est bien à la racine du projet

### Les commandes ne s'affichent pas

Si les statistiques des commandes ne s'affichent pas mais que les produits et catégories fonctionnent, c'est normal. Les commandes nécessitent Firebase Admin SDK pour être lues, tandis que les produits et catégories utilisent le client Firebase.

