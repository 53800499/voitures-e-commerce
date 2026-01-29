"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthUserContext";
import { isAdmin } from "@/utils/auth";
import { wording } from "@/utils/wording";
import Container from "@/components/container/container";
import Typography from "@/ui/designSystem/typography/typography";
import Button from "@/ui/designSystem/button/button";
import LayoutSimple from "@/components/layout/layout-simple";
import { FiUser, FiMail, FiShield, FiLogOut, FiSettings } from "react-icons/fi";
import { logoutUser } from "@/services/auth/authService";
import { useNotification } from "@/components/notifications/NotificationProvider";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { authUser } = useAuth();
  const { showNotification } = useNotification();
  const [userIsAdmin, setUserIsAdmin] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!authUser) {
        router.push("/login");
        return;
      }
      const admin = await isAdmin(authUser);
      setUserIsAdmin(admin);
      setIsLoading(false);
    };
    checkAuth();
  }, [authUser, router]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      showNotification("Déconnexion réussie", "success");
      router.push("/");
    } catch {
      showNotification("Erreur lors de la déconnexion", "error");
    }
  };

  if (isLoading) {
    return (
      <LayoutSimple>
        <div className="min-h-screen flex items-center justify-center">
          <Typography variant="body-lg" theme="gray">Chargement...</Typography>
        </div>
      </LayoutSimple>
    );
  }

  if (!authUser) {
    return null;
  }

  return (
    <LayoutSimple>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* En-tête */}
            <div className="mb-8">
              <Typography variant="h1" theme="black" weight="bold" className="mb-2">
                Mon Profil
              </Typography>
              <Typography variant="body-base" theme="gray">
                Gérez vos informations personnelles et vos préférences
              </Typography>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-gray-200 p-6 mb-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-primary/10 flex items-center justify-center">
                      <FiUser className="text-primary text-2xl" />
                    </div>
                    <div>
                      <Typography variant="h3" theme="black" weight="bold">
                        {authUser.prenom || authUser.email?.split("@")[0] || "Utilisateur"}
                      </Typography>
                      <Typography variant="body-sm" theme="gray">
                        {authUser.email}
                      </Typography>
                    </div>
                  </div>
                  {userIsAdmin && (
                    <Link href="/dashboard" className="block mb-4">
                      <Button variant="accent" size="medium" className="w-full">
                        {wording.navigation.adminDashboard}
                      </Button>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <FiLogOut size={18} />
                    <span>Déconnexion</span>
                  </button>
                </div>
              </div>

              {/* Contenu principal */}
              <div className="lg:col-span-2 space-y-6">
                {/* Informations personnelles */}
                <div className="bg-white border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FiUser className="text-primary text-xl" />
                    <Typography variant="h2" theme="black" weight="bold">
                      Informations personnelles
                    </Typography>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Typography variant="body-sm" theme="gray" className="mb-1">
                        Prénom
                      </Typography>
                      <Typography variant="body-base" theme="black">
                        {authUser.prenom || "Non renseigné"}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body-sm" theme="gray" className="mb-1">
                        Nom
                      </Typography>
                      <Typography variant="body-base" theme="black">
                        {authUser.nom || "Non renseigné"}
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="body-sm" theme="gray" className="mb-1">
                        Email
                      </Typography>
                      <div className="flex items-center gap-2">
                        <FiMail className="text-gray-400" size={16} />
                        <Typography variant="body-base" theme="black">
                          {authUser.email}
                        </Typography>
                      </div>
                    </div>
                    {authUser.emailVerified !== undefined && (
                      <div>
                        <Typography variant="body-sm" theme="gray" className="mb-1">
                          Email vérifié
                        </Typography>
                        <div className="flex items-center gap-2">
                          <FiShield
                            className={authUser.emailVerified ? "text-green-500" : "text-yellow-500"}
                            size={16}
                          />
                          <Typography
                            variant="body-base"
                            theme="black"
                            className={authUser.emailVerified ? "text-green-600" : "text-yellow-600"}
                          >
                            {authUser.emailVerified ? "Oui" : "Non"}
                          </Typography>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions rapides */}
                <div className="bg-white border border-gray-200 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <FiSettings className="text-primary text-xl" />
                    <Typography variant="h2" theme="black" weight="bold">
                      Actions rapides
                    </Typography>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/track-order">
                      <div className="p-4 border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
                        <Typography variant="body-base" theme="black" weight="bold" className="mb-1">
                          Suivre mes commandes
                        </Typography>
                        <Typography variant="body-sm" theme="gray">
                          Consultez l&apos;état de vos commandes
                        </Typography>
                      </div>
                    </Link>
                    <Link href="/shop">
                      <div className="p-4 border border-gray-200 hover:border-primary hover:bg-primary/5 transition-colors cursor-pointer">
                        <Typography variant="body-base" theme="black" weight="bold" className="mb-1">
                          Continuer mes achats
                        </Typography>
                        <Typography variant="body-sm" theme="gray">
                          Parcourir notre catalogue
                        </Typography>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </LayoutSimple>
  );
}

