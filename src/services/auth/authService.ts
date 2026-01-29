/**
 * Service d'authentification Firebase
 */

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User,
  UserCredential
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/config/firebase-config";

export interface AuthError {
  code: string;
  message: string;
}

export interface AuthResult {
  user?: User | null;
  error?: AuthError | null;
}

/**
 * Créer un nouvel utilisateur avec email et mot de passe
 */
export async function registerUser(
  email: string,
  password: string,
  nom: string,
  prenom: string
): Promise<AuthResult> {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Créer le document utilisateur dans Firestore
    if (userCredential.user) {
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email,
        nom,
        prenom,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return {
      user: null,
      error: {
        code: error.code || "unknown",
        message: getErrorMessage(error.code),
      },
    };
  }
}

/**
 * Connecter un utilisateur avec email et mot de passe
 */
export async function loginUser(
  email: string,
  password: string
): Promise<AuthResult> {
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return {
      user: null,
      error: {
        code: error.code || "unknown",
        message: getErrorMessage(error.code),
      },
    };
  }
}

/**
 * Déconnecter l'utilisateur
 */
export async function logoutUser(): Promise<AuthResult> {
  try {
    await signOut(auth);
    return { user: null, error: null };
  } catch (error: any) {
    return {
      user: null,
      error: {
        code: error.code || "unknown",
        message: "Erreur lors de la déconnexion",
      },
    };
  }
}

/**
 * Envoyer un email de réinitialisation de mot de passe
 */
export async function resetPassword(email: string): Promise<AuthResult> {
  try {
    await sendPasswordResetEmail(auth, email);
    return { user: null, error: null };
  } catch (error: any) {
    return {
      user: null,
      error: {
        code: error.code || "unknown",
        message: getErrorMessage(error.code),
      },
    };
  }
}

/**
 * Traduire les codes d'erreur Firebase en messages français
 */
function getErrorMessage(code: string): string {
  const errorMessages: Record<string, string> = {
    "auth/email-already-in-use": "Cette adresse e-mail est déjà utilisée.",
    "auth/invalid-email": "Cette adresse e-mail n'est pas valide.",
    "auth/operation-not-allowed": "Ce mode d'enregistrement n'est pas actif.",
    "auth/weak-password": "Le mot de passe doit contenir au moins 6 caractères.",
    "auth/user-disabled": "Ce compte a été désactivé.",
    "auth/user-not-found": "Aucun compte trouvé avec cette adresse e-mail.",
    "auth/wrong-password": "Le mot de passe est incorrect.",
    "auth/invalid-credential": "Les identifiants sont incorrects.",
    "auth/too-many-requests": "Trop de tentatives. Veuillez réessayer plus tard.",
    "auth/network-request-failed": "Erreur de connexion réseau.",
  };

  return errorMessages[code] || "Une erreur est survenue. Veuillez réessayer.";
}

