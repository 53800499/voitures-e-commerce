"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { loginUser } from "@/services/auth/authService";
import { useAuth } from "@/context/AuthUserContext";
import { wording } from "@/utils/wording";
import Container from "@/components/container/container";
import Typography from "@/ui/designSystem/typography/typography";
import Button from "@/ui/designSystem/button/button";
import { FiMail, FiLock, FiAlertCircle, FiArrowRight } from "react-icons/fi";
import { useNotification } from "@/components/notifications/NotificationProvider";
import AuthBenefits from "@/components/auth/AuthBenefits";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { showNotification } = useNotification();
  const { authUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (authUser) {
      router.push("/");
    }
  }, [authUser, router]);

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await loginUser(data.email, data.password);

      if (result.error) {
        setError(result.error.message);
        showNotification(result.error.message, "error");
        setIsLoading(false);
        return;
      }

      if (result.user) {
        showNotification(wording.auth.login.success, "success");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Une erreur est survenue";
      setError(errorMessage);
      showNotification(errorMessage, "error");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 flex items-center relative overflow-hidden">
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Colonne gauche - Image et texte */}
            <div className="hidden lg:block space-y-8">
              <div className="relative h-[500px] bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden shadow-2xl">
                <div className="absolute inset-0">
                  <Image
                    src="/assets/images.jpg"
                    alt="Voitures sans permis"
                    width={800}
                    height={500}
                    quality={100}
                    className="object-cover w-full h-full opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
                <AuthBenefits
                  title={wording.auth.login.benefits.title}
                  description={wording.auth.login.benefits.description}
                  benefits={wording.auth.login.benefits.items}
                />
              </div>
            </div>

            {/* Colonne droite - Formulaire */}
            <div className="w-full">
              <div className="bg-white/80 backdrop-blur-lg shadow-2xl border border-gray-200/50 p-10 relative">
                {/* Badge décoratif */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 shadow-lg">
                  <Typography variant="body-sm" theme="white" weight="bold">
                    Connexion sécurisée
                  </Typography>
                </div>

                {/* En-tête */}
                <div className="text-center mb-10 mt-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 mb-4">
                    <FiLock className="text-primary text-2xl" />
                  </div>
                  <Typography variant="h1" theme="black" weight="bold" className="mb-3">
                    {wording.auth.login.title}
                  </Typography>
                  <Typography variant="body-base" theme="gray">
                    {wording.auth.login.subtitle}
                  </Typography>
                </div>

                {/* Message d'erreur global */}
                {error && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 flex items-start gap-3 animate-slide-up">
                    <FiAlertCircle className="text-red-500 text-xl shrink-0 mt-0.5" />
                    <Typography variant="body-sm" theme="black" className="text-red-700">
                      {error}
                    </Typography>
                  </div>
                )}

                {/* Formulaire */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                      {wording.auth.login.email} *
                    </label>
                    <div className="relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r border-gray-300 bg-gray-50 group-focus-within:bg-primary/5 group-focus-within:border-primary transition-colors">
                        <FiMail className="text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                      </div>
                      <input
                        id="email"
                        type="email"
                        {...register("email", {
                          required: wording.auth.errors.required,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: wording.auth.errors.invalidEmail,
                          },
                        })}
                        placeholder={wording.auth.login.emailPlaceholder}
                        className="w-full pl-14 pr-4 py-4 border-2 border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white hover:border-gray-400"
                        aria-label={wording.auth.login.email}
                      />
                    </div>
                    {errors.email && (
                      <Typography variant="caption2" theme="red" className="mt-2 flex items-center gap-1">
                        <FiAlertCircle size={14} />
                        {errors.email.message}
                      </Typography>
                    )}
                  </div>

                  {/* Mot de passe */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                      {wording.auth.login.password} *
                    </label>
                    <div className="relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r border-gray-300 bg-gray-50 group-focus-within:bg-primary/5 group-focus-within:border-primary transition-colors">
                        <FiLock className="text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                      </div>
                      <input
                        id="password"
                        type="password"
                        {...register("password", {
                          required: wording.auth.errors.required,
                          minLength: {
                            value: 6,
                            message: wording.auth.errors.passwordTooShort,
                          },
                        })}
                        placeholder={wording.auth.login.passwordPlaceholder}
                        className="w-full pl-14 pr-4 py-4 border-2 border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white hover:border-gray-400"
                        aria-label={wording.auth.login.password}
                      />
                    </div>
                    {errors.password && (
                      <Typography variant="caption2" theme="red" className="mt-2 flex items-center gap-1">
                        <FiAlertCircle size={14} />
                        {errors.password.message}
                      </Typography>
                    )}
                  </div>

                  {/* Mot de passe oublié */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember"
                        type="checkbox"
                        className="w-4 h-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                        Se souvenir de moi
                      </label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:text-primary/80 hover:underline font-medium transition-colors"
                    >
                      {wording.auth.login.forgotPassword}
                    </Link>
                  </div>

                  {/* Bouton de soumission */}
                  <Button
                    type="submit"
                    variant="accent"
                    size="large"
                    className="w-full group relative overflow-hidden"
                    disabled={isLoading}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          {wording.auth.login.loading}
                        </>
                      ) : (
                        <>
                          {wording.auth.login.submit}
                          <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </Button>
                </form>

                {/* Divider */}
                <div className="my-8 flex items-center">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-4 text-sm text-gray-500">ou</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* Lien vers l'inscription */}
                <div className="text-center">
                  <Typography variant="body-sm" theme="gray">
                    {wording.auth.login.noAccount}{" "}
                    <Link href="/register" className="text-primary hover:text-primary/80 hover:underline font-semibold transition-colors">
                      {wording.auth.login.registerLink}
                    </Link>
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

