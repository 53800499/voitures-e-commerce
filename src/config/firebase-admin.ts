/** @format */

import admin from "firebase-admin";

let isInitialized = false;

// Initialiser Firebase Admin SDK uniquement si ce n'est pas déjà fait
if (!admin.apps.length) {
  try {
    // Option 1 : Utiliser les credentials depuis les variables d'environnement
    if (
      process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
    ) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY.replaceAll(
            String.raw`\n`,
            "\n"
          )
        })
      });
      console.log(
        "✅ Firebase Admin SDK initialisé avec credentials personnalisés"
      );
      isInitialized = true;
    } else {
      // Option 2 : Utiliser Application Default Credentials
      // Pour le développement local, vous pouvez utiliser le service account key
      // Téléchargez-le depuis Firebase Console > Project Settings > Service Accounts
      // OU configurez les variables d'environnement FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
      
      // Ne pas essayer d'initialiser avec ADC si les credentials ne sont pas disponibles
      // Cela évitera l'erreur "Could not load the default credentials"
      console.warn(
        "⚠️ Firebase Admin SDK: Les credentials ne sont pas configurés. " +
        "Veuillez configurer les variables d'environnement suivantes :\n" +
        "- FIREBASE_PROJECT_ID\n" +
        "- FIREBASE_CLIENT_EMAIL\n" +
        "- FIREBASE_PRIVATE_KEY\n" +
        "Ou utilisez un fichier de service account key."
      );
      isInitialized = false;
    }
  } catch (error) {
    console.error(
      "❌ Erreur lors de l'initialisation de Firebase Admin:",
      error
    );
    // En cas d'erreur, essayer quand même avec le projectId
    try {
      if (!admin.apps.length) {
        admin.initializeApp({
          projectId: "shobmarket-341da"
        });
        isInitialized = true;
      }
    } catch (fallbackError) {
      console.error(
        "❌ Impossible d'initialiser Firebase Admin SDK:",
        fallbackError
      );
      isInitialized = false;
    }
  }
}

// Exporter avec vérification de disponibilité
// Initialiser avec null pour éviter les erreurs TypeScript
let adminDb: admin.firestore.Firestore | null = null;
let adminAuth: admin.auth.Auth | null = null;
let adminTimestamp: typeof admin.firestore.Timestamp | null = null;

if (admin.apps.length > 0) {
  try {
    adminDb = admin.firestore();
    adminAuth = admin.auth();
    adminTimestamp = admin.firestore.Timestamp;
    isInitialized = true;
  } catch (error) {
    console.warn("⚠️ Impossible d'initialiser adminDb ou adminAuth:", error);
    isInitialized = false;
  }
}

// Fonction helper pour asserter que adminDb n'est pas null
function getAdminDb(): admin.firestore.Firestore {
  if (!adminDb || !isInitialized) {
    const errorMessage = 
      "Firebase Admin SDK n'est pas initialisé. " +
      "Veuillez configurer les variables d'environnement suivantes dans votre fichier .env.local :\n" +
      "- FIREBASE_PROJECT_ID\n" +
      "- FIREBASE_CLIENT_EMAIL\n" +
      "- FIREBASE_PRIVATE_KEY\n\n" +
      "Pour obtenir ces informations :\n" +
      "1. Allez sur Firebase Console > Project Settings > Service Accounts\n" +
      "2. Cliquez sur 'Generate new private key'\n" +
      "3. Utilisez les valeurs du fichier JSON généré pour remplir les variables d'environnement";
    
    console.error("❌", errorMessage);
    throw new Error(errorMessage);
  }
  return adminDb;
}

// Fonction helper pour asserter que adminTimestamp n'est pas null
function getAdminTimestamp(): typeof admin.firestore.Timestamp {
  if (!adminTimestamp) {
    throw new Error(
      "Firebase Timestamp n'est pas disponible. Vérifiez l'initialisation de Firebase Admin SDK."
    );
  }
  return adminTimestamp;
}

export {
  adminDb,
  adminAuth,
  adminTimestamp,
  isInitialized,
  getAdminDb,
  getAdminTimestamp
};

