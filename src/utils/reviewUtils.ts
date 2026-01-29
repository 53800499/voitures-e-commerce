/**
 * Utilitaires pour la gestion des avis (reviews)
 */

export interface Review {
  id?: string;
  text: string;
  author: string;
  rating?: number;
  date?: Date | string | { seconds: number; nanoseconds: number };
  dateTimestamp?: Date | string | { seconds: number; nanoseconds: number };
}

/**
 * Formate la date d'un avis pour l'affichage
 */
export function formatReviewDate(review: Review): string {
  if (!review.date && !review.dateTimestamp) {
    return "Date non disponible";
  }

  const dateValue = review.dateTimestamp || review.date;
  
  if (!dateValue) {
    return "Date non disponible";
  }

  // Si c'est un objet avec seconds (Firebase Timestamp)
  if (typeof dateValue === "object" && "seconds" in dateValue) {
    return new Date(dateValue.seconds * 1000).toLocaleDateString("fr-FR");
  }

  // Si c'est une string, on essaie de la convertir
  if (typeof dateValue === "string") {
    const date = new Date(dateValue);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString("fr-FR");
    }
    return dateValue; // Retourne la string si elle ne peut pas être convertie
  }

  // Si c'est un Date
  if (dateValue instanceof Date) {
    return dateValue.toLocaleDateString("fr-FR");
  }

  return "Date non disponible";
}

/**
 * Obtient la date d'un avis sous forme de Date
 */
export function getReviewDate(review: Review): Date | null {
  if (!review.date && !review.dateTimestamp) {
    return null;
  }

  const dateValue = review.dateTimestamp || review.date;
  
  if (!dateValue) {
    return null;
  }

  // Si c'est un objet avec seconds (Firebase Timestamp)
  if (typeof dateValue === "object" && "seconds" in dateValue) {
    return new Date(dateValue.seconds * 1000);
  }

  // Si c'est une string
  if (typeof dateValue === "string") {
    const date = new Date(dateValue);
    return !isNaN(date.getTime()) ? date : null;
  }

  // Si c'est un Date
  if (dateValue instanceof Date) {
    return dateValue;
  }

  return null;
}


