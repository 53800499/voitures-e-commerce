/**
 * Fichier centralisé contenant tous les textes de l'application
 * Aucun texte ne doit être en dur dans le code
 */

export const wording = {
  // Métadonnées générales
  metadata: {
    siteName: "Auto Liberte Vsp",
    defaultTitle: "Auto Liberte Vsp — La mobilité accessible à tous",
    defaultDescription: "Spécialistes de la vente de voitures sans permis neuves et d'occasion. Nous vous proposons une sélection de véhicules fiables, adaptés à tous vos besoins de mobilité.",
  },

  // Navigation
  navigation: {
    home: "Accueil",
    shop: "Boutique",
    trackOrder: "Suivre ma commande",
    about: "Qui sommes-nous?",
    contact: "Contact",
    searchPlaceholder: "Rechercher un produit...",
    cart: "Panier",
    login: "Se connecter",
    profile: "Mon Profil",
    adminDashboard: "Dashboard Admin",
  },

  // Navbar (banner)
  navbar: {
    message1: "Livraison gratuite pour nos produits",
    message2: "Produits de très bonne qualité",
  },

  // Page d'accueil
  home: {
    hero: {
      welcome: "Bienvenue chez Auto Liberte Vsp",
      title: "Auto Liberte Vsp — La mobilité accessible à tous.",
      description: "Spécialistes de la vente de voitures sans permis neuves et d'occasion. Nous vous proposons une sélection de véhicules fiables, adaptés à tous vos besoins de mobilité.",
      subtitle: "Profitez d'un accompagnement personnalisé, de solutions de financement, et de véhicules prêts à rouler au meilleur prix.",
      cta: "Trouvez votre voiture sans permis idéale dès aujourd'hui !",
      button: "Commander maintenant",
    },
    features: {
      securePayment: {
        title: "Paiement Sécurisé",
        description: "Achetez en toute confiance ! Paiement sécurisé par nos partenaires bancaires certifiés.",
      },
      deliveryPrice: {
        title: "Livraison bon prix",
        description: "Faites-vous livrer votre voiture sans permis à domicile ! Profitez de notre service de livraison rapide et sécurisé pour seulement 300 € TTC.",
      },
      fastDelivery: {
        title: "Livraison Rapide",
        description: "Votre voiture sans permis livrée rapidement à votre porte ! Avec Auto Liberte Vsp, profitez d'une livraison rapide, fiable et adaptée à votre emploi du temps.",
      },
      excellentService: {
        title: "Excellent Service",
        description: "Un service client à votre écoute Conseils, accompagnement, livraison : nous sommes là pour vous offrir une expérience exceptionnelle.",
      },
    },
    categories: {
      title: "Nos Catégories",
      aixam: {
        name: "Aixam",
        description: "Aixam, la référence de la voiture sans permis Robuste, élégante et ultra-sécurisée, Aixam vous offre une expérience de conduite exceptionnelle. Fiabilité, confort et innovation sont au cœur de chaque modèle Aixam.",
      },
      ligier: {
        name: "Ligier",
        description: "Ligier : performance, design et liberté. Alliez style sportif, confort premium et technologies modernes avec Ligier, la référence des voitures sans permis dynamiques et fiables.",
      },
      chatenet: {
        name: "Chatenet",
        description: "Chatenet : élégance, confort et caractère. Avec son design raffiné et ses finitions haut de gamme, Chatenet vous offre une conduite unique, alliant style, sécurité et plaisir au quotidien.",
      },
      casalini: {
        name: "Casalini",
        description: "Casalini : performance, élégance et innovation. Casalini propose des voitures sans permis puissantes, au design raffiné, avec une qualité de finition exceptionnelle pour une expérience de conduite unique.",
      },
    },
    products: {
      title: "Nos Products",
      rating: "Note",
      outOf: "sur",
      originalPrice: "Le prix initial était :",
      currentPrice: "Le prix actuel est :",
      promo: "Promo !",
      sampleProducts: [
        {
          id: "1",
          name: "AIXAM 500 4 places",
          category: "Aixam",
          price: 1500,
        },
        {
          id: "2",
          name: "AIXAM CITY PACK",
          category: "Aixam",
          price: 1300,
        },
        {
          id: "3",
          name: "AIXAM CITY S9",
          category: "Aixam",
          price: 2000,
          originalPrice: 3500,
          isPromo: true,
        },
      ],
    },
    testimonials: {
      title: "Que dis les clients de nous",
      subtitle: "Voilà un bon nombre d'avis de nos clients",
      reviews: [
        {
          text: "Un super service du début à la fin ! Mon véhicule a été livré rapidement, conforme à ce que j'attendais. L'équipe de Auto Liberté Vsp est vraiment à l'écoute et professionnelle. Je recommande les yeux fermés !",
          author: "Cathérine",
        },
        {
          text: "Excellent accueil et conseils de qualité. J'ai trouvé la voiture sans permis parfaite pour mes besoins. Tout a été simple : achat, financement et livraison rapide. Merci Auto Liberte Vsp pour votre sérieux !",
          author: "Jean-Claude",
        },
        {
          text: "Top expérience ! Première voiture sans permis, un peu stressé au début, mais l'équipe a su me rassurer et m'accompagner. Super contente de mon Aixam, et la livraison a été rapide et sans surprise.",
          author: "Juliette",
        },
      ],
    },
  },

  // Page Boutique
  shop: {
    title: "Boutique",
    description: "Découvrez notre sélection de voitures sans permis",
    filters: "Filtres",
    sortBy: "Trier par",
    noProducts: "Aucun produit trouvé",
    loading: "Chargement des produits...",
    category: "Catégorie",
    allCategories: "Toutes les catégories",
    price: "Prix",
    sortOptions: {
      priceAsc: "Prix croissant",
      priceDesc: "Prix décroissant",
      nameAZ: "Nom A-Z",
    },
    product: "Produit",
  },

  // Page Suivre ma commande
  trackOrder: {
    title: "Suivre ma commande",
    description: "Suivez l'état de votre commande en temps réel",
    orderNumber: "Numéro de commande",
    orderNumberPlaceholder: "Entrez votre numéro de commande",
    search: "Rechercher",
    notFound: "Commande non trouvée",
    orderStatus: "Statut de la commande",
    orderNumberLabel: "Numéro:",
    statusLabel: "Statut:",
    status: {
      pending: "En attente",
      processing: "En cours de traitement",
      shipped: "Expédiée",
      delivered: "Livrée",
      cancelled: "Annulée",
    },
  },

  // Page Qui sommes-nous
  about: {
    title: "Qui sommes-nous?",
    description: "Découvrez Auto Liberte Vsp",
    history: {
      title: "Notre histoire",
      paragraph1: "Auto Liberte Vsp est né de la passion pour l'automobile et du désir de rendre la mobilité accessible à tous.",
      paragraph2: "Spécialistes des **voitures sans permis**, nous accompagnons nos clients dans leur projet d'achat en leur garantissant sérieux, qualité et proximité.",
    },
    challenge: {
      title: "Notre défis",
      paragraph1: "Notre défis est simple : **offrir à chacun la liberté de se déplacer en toute confiance.**",
      paragraph2: "Nous sélectionnons soigneusement nos véhicules pour garantir leur fiabilité, et proposons un service complet : **vente, livraison rapide, service après-vente et paiement sécurisé.**",
    },
    whyChoose: {
      title: "Pourquoi choisir Auto Liberté Vsp ?",
      items: [
        "**Livraison rapide** sous **24h à 72h** partout en France",
        "**Paiement sécurisé** par virement bancaire avec traçabilité",
        "**Véhicules garantis**, conformes aux photos",
        "**Service après-vente** disponible et à votre écoute",
      ],
    },
    sections: {
      mission: {
        title: "Notre Mission",
        content: "Auto Liberte Vsp est spécialisé dans la vente de voitures sans permis neuves et d'occasion. Notre mission est de rendre la mobilité accessible à tous en proposant des véhicules fiables, adaptés à tous les besoins, avec un accompagnement personnalisé et des solutions de financement adaptées.",
      },
      values: {
        title: "Nos Valeurs",
        content: "Nous croyons en la qualité, la fiabilité et le service client. Chaque véhicule que nous proposons est soigneusement sélectionné pour garantir votre satisfaction et votre sécurité.",
      },
      commitment: {
        title: "Notre Engagement",
        content: "Nous nous engageons à vous offrir une expérience d'achat exceptionnelle, avec un paiement sécurisé, une livraison rapide et un service client à votre écoute.",
      },
    },
  },

  // Page Contact
  contact: {
    title: "Contact",
    description: "Contactez-nous pour toute question",
    form: {
      name: "Name",
      namePlaceholder: "Votre nom",
      email: "Email",
      emailPlaceholder: "Votre adresse email",
      message: "Message",
      messagePlaceholder: "Votre message",
      submit: "Submit",
      submitting: "Chargement en cours",
      success: "Message envoyé avec succès !",
      error: "Une erreur est survenue. Veuillez réessayer.",
    },
    required: "*",
    jsRequired: "Veuillez activer JavaScript dans votre navigateur pour remplir ce formulaire.",
  },

  // Carousel (section avant footer)
  carousel: {
    slides: [
      {
        id: 1,
        tagline: "L'excellence au service de votre liberté — Auto Liberte Vsp",
        guarantee: "Achetez en toute sérénité avec Auto Liberte Vsp",
        guaranteeLine1: "Nous vous garantissons des véhicules de qualité, un service personnalisé, un paiement 100% sécurisé et une",
        guaranteeLine2: "livraison rapide partout en Europe.",
        guaranteeLine3: "Votre satisfaction est notre priorité.",
      },
      {
        id: 2,
        tagline: "Votre mobilité, notre passion — Auto Liberte Vsp",
        guarantee: "Découvrez notre sélection exceptionnelle",
        guaranteeLine1: "Des voitures sans permis neuves et d'occasion soigneusement sélectionnées,",
        guaranteeLine2: "des solutions de financement adaptées à vos besoins.",
        guaranteeLine3: "L'excellence à chaque étape de votre achat.",
      },
      {
        id: 3,
        tagline: "La liberté de rouler, l'excellence du service",
        guarantee: "Rejoignez des milliers de clients satisfaits",
        guaranteeLine1: "Un accompagnement personnalisé du début à la fin,",
        guaranteeLine2: "des véhicules prêts à rouler au meilleur prix.",
        guaranteeLine3: "Votre confiance est notre récompense.",
      },
    ],
  },

  // Pages d'authentification
  auth: {
    register: {
      title: "Inscription",
      subtitle: "Créez votre compte",
      firstName: "Prénom",
      firstNamePlaceholder: "Votre prénom",
      lastName: "Nom",
      lastNamePlaceholder: "Votre nom",
      email: "Adresse e-mail",
      emailPlaceholder: "votre@email.com",
      password: "Mot de passe",
      passwordPlaceholder: "Minimum 6 caractères",
      confirmPassword: "Confirmer le mot de passe",
      confirmPasswordPlaceholder: "Répétez votre mot de passe",
      submit: "Créer mon compte",
      loading: "Création du compte...",
      hasAccount: "Vous avez déjà un compte ?",
      loginLink: "Se connecter",
      success: "Compte créé avec succès !",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères",
      benefits: {
        title: "Rejoignez Auto Liberte Vsp",
        description: "Créez votre compte et profitez d'avantages exclusifs, suivez vos commandes et accédez à des offres spéciales.",
        items: [
          "Suivi de commande en temps réel",
          "Offres exclusives réservées aux membres",
          "Historique de vos achats",
        ],
      },
    },
    login: {
      title: "Connexion",
      subtitle: "Connectez-vous à votre compte",
      email: "Adresse e-mail",
      emailPlaceholder: "votre@email.com",
      password: "Mot de passe",
      passwordPlaceholder: "Votre mot de passe",
      submit: "Se connecter",
      loading: "Connexion en cours...",
      noAccount: "Vous n'avez pas de compte ?",
      registerLink: "Créer un compte",
      forgotPassword: "Mot de passe oublié ?",
      success: "Connexion réussie !",
      benefits: {
        title: "Bienvenue chez Auto Liberte Vsp",
        description: "Accédez à votre compte pour gérer vos commandes, suivre vos livraisons et profiter d'offres exclusives.",
        items: [
          "Gestion de vos commandes",
          "Suivi de livraison en temps réel",
          "Accès aux offres exclusives",
        ],
      },
    },
    errors: {
      required: "Ce champ est obligatoire",
      invalidEmail: "Adresse e-mail invalide",
      passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères",
      passwordsDoNotMatch: "Les mots de passe ne correspondent pas",
    },
  },

  // Footer
  footer: {
    tagline: "L'excellence au service de votre liberté — Auto Liberte Vsp",
    guarantee: "Achetez en toute sérénité avec Auto Liberte Vsp",
    guaranteeDescription: "Nous vous garantissons des véhicules de qualité, un service personnalisé, un paiement 100 % sécurisé et une livraison rapide partout en Europe. Votre satisfaction est notre priorité.",
    newsletter: {
      title: "Newsletter",
      description: "Recevez nos dernières offres exclusives et actualités directement dans votre boîte mail.",
      emailPlaceholder: "Votre adresse email",
      subscribe: "S'abonner",
      privacy: "🔒 Vos données sont protégées. Désabonnez-vous à tout moment.",
    },
    copyright: "Copyright ©",
    allRightsReserved: "Tous droits réservés.",
    links: {
      about: "À propos",
      quickLinks: "Liens rapides",
      customerService: "Service client",
      legal: "Mentions légales",
    },
  },

  // Messages généraux
  common: {
    loading: "Chargement...",
    error: "Une erreur est survenue",
    success: "Opération réussie",
    cancel: "Annuler",
    confirm: "Confirmer",
    save: "Enregistrer",
    delete: "Supprimer",
    edit: "Modifier",
    back: "Retour",
    next: "Suivant",
    previous: "Précédent",
    close: "Fermer",
    view: "Voir",
    add: "Ajouter",
    remove: "Retirer",
    empty: "Vide",
    noResults: "Aucun résultat",
  },

  // Panier
  cart: {
    title: "Panier",
    empty: "Votre panier est vide",
    total: "Total",
    subtotal: "Sous-total",
    shipping: "Livraison",
    checkout: "Passer la commande",
    continueShopping: "Continuer les achats",
    removeItem: "Retirer du panier",
    updateQuantity: "Mettre à jour la quantité",
  },

  // Dashboard Admin
  dashboard: {
    title: "Dashboard Admin",
    welcome: "Bienvenue dans le tableau de bord",
    menu: {
      dashboard: "Tableau de bord",
      products: "Produits",
      categories: "Catégories",
      orders: "Commandes",
      logout: "Déconnexion",
    },
    stats: {
      totalProducts: "Total produits",
      totalCategories: "Total catégories",
      totalOrders: "Total commandes",
      totalRevenue: "Chiffre d'affaires",
    },
    products: {
      title: "Gestion des produits",
      add: "Ajouter un produit",
      edit: "Modifier",
      delete: "Supprimer",
      name: "Nom",
      price: "Prix",
      category: "Catégorie",
      stock: "Stock",
      status: "Statut",
      actions: "Actions",
      noProducts: "Aucun produit",
      createSuccess: "Produit créé avec succès",
      updateSuccess: "Produit mis à jour avec succès",
      deleteSuccess: "Produit supprimé avec succès",
      deleteConfirm: "Êtes-vous sûr de vouloir supprimer ce produit ?",
    },
    categories: {
      title: "Gestion des catégories",
      add: "Ajouter une catégorie",
      edit: "Modifier",
      delete: "Supprimer",
      name: "Nom",
      description: "Description",
      image: "Image",
      actions: "Actions",
      noCategories: "Aucune catégorie",
      createSuccess: "Catégorie créée avec succès",
      updateSuccess: "Catégorie mise à jour avec succès",
      deleteSuccess: "Catégorie supprimée avec succès",
      deleteConfirm: "Êtes-vous sûr de vouloir supprimer cette catégorie ?",
    },
    orders: {
      title: "Gestion des commandes",
      orderNumber: "N° Commande",
      customer: "Client",
      date: "Date",
      total: "Total",
      status: "Statut",
      actions: "Actions",
      view: "Voir",
      noOrders: "Aucune commande",
      statuses: {
        pending: "En attente",
        processing: "En traitement",
        shipped: "Expédiée",
        delivered: "Livrée",
        cancelled: "Annulée",
      },
    },
  },
} as const;

// Types pour TypeScript
export type Wording = typeof wording;

