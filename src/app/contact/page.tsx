"use client";

import { useState } from "react";
import Image from "next/image";
import { wording } from "@/utils/wording";
import Container from "@/components/container/container";
import Typography from "@/ui/designSystem/typography/typography";
import Button from "@/ui/designSystem/button/button";
import { FiUser, FiMail, FiMessageSquare, FiSend, FiAlertCircle, FiCheck, FiPhone, FiMapPin, FiClock } from "react-icons/fi";
import { useNotification } from "@/components/notifications/NotificationProvider";

export default function ContactPage() {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simuler l'envoi du formulaire
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      showNotification(wording.contact.form.success, "success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
      showNotification(wording.contact.form.error, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 relative overflow-hidden">
      {/* Éléments décoratifs en arrière-plan */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 blur-3xl"></div>
      </div>

      <Container className="relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-12">
            <Typography variant="h1" theme="black" weight="bold" className="mb-4">
              {wording.contact.title}
            </Typography>
            <Typography variant="body-lg" theme="gray" className="max-w-2xl mx-auto">
              {wording.contact.description}
            </Typography>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Colonne gauche - Informations de contact */}
            <div className="space-y-8">
              <div className="bg-white/80 backdrop-blur-lg shadow-2xl border border-gray-200/50 p-8">
                <Typography variant="h2" theme="black" weight="bold" className="mb-6">
                  Nos informations
                </Typography>
                
                <div className="space-y-6">
                  {/* Adresse */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                      <FiMapPin className="text-primary text-xl" />
                    </div>
                    <div>
                      <Typography variant="body-base" theme="black" weight="semibold" className="mb-1">
                        Adresse
                      </Typography>
                      <Typography variant="body-sm" theme="gray">
                        Auto Liberte Vsp<br />
                        Votre adresse complète<br />
                        Code postal, Ville
                      </Typography>
                    </div>
                  </div>

                  {/* Téléphone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                      <FiPhone className="text-primary text-xl" />
                    </div>
                    <div>
                      <Typography variant="body-base" theme="black" weight="semibold" className="mb-1">
                        Téléphone
                      </Typography>
                      <Typography variant="body-sm" theme="gray">
                        +33 X XX XX XX XX
                      </Typography>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                      <FiMail className="text-primary text-xl" />
                    </div>
                    <div>
                      <Typography variant="body-base" theme="black" weight="semibold" className="mb-1">
                        Email
                      </Typography>
                      <Typography variant="body-sm" theme="gray">
                        contact@autolibertevsp.com
                      </Typography>
                    </div>
                  </div>

                  {/* Horaires */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 flex items-center justify-center shrink-0">
                      <FiClock className="text-primary text-xl" />
                    </div>
                    <div>
                      <Typography variant="body-base" theme="black" weight="semibold" className="mb-1">
                        Horaires d&apos;ouverture
                      </Typography>
                      <Typography variant="body-sm" theme="gray">
                        Lundi - Vendredi: 9h00 - 18h00<br />
                        Samedi: 9h00 - 12h00<br />
                        Dimanche: Fermé
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image décorative */}
              <div className="relative h-[300px] bg-gradient-to-br from-primary/10 to-primary/5 overflow-hidden shadow-2xl">
                <div className="absolute inset-0">
                  <Image
                    src="/assets/images.jpg"
                    alt="Contact Auto Liberte Vsp"
                    width={600}
                    height={300}
                    quality={100}
                    className="object-cover w-full h-full opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Colonne droite - Formulaire */}
            <div className="w-full">
              <div className="bg-white/80 backdrop-blur-lg shadow-2xl border border-gray-200/50 p-10 relative">
                {/* Badge décoratif */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-2 shadow-lg">
                  <Typography variant="body-sm" theme="white" weight="bold">
                    Formulaire de contact
                  </Typography>
                </div>

                <noscript>
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500">
                    <Typography variant="body-sm" theme="black" className="text-red-700">
                      {wording.contact.jsRequired}
                    </Typography>
                  </div>
                </noscript>

                {/* Message de succès */}
                {submitStatus === "success" && (
                  <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 flex items-start gap-3 animate-slide-up">
                    <FiCheck className="text-green-500 text-xl shrink-0 mt-0.5" />
                    <Typography variant="body-sm" theme="black" className="text-green-700">
                      {wording.contact.form.success}
                    </Typography>
                  </div>
                )}

                {/* Message d'erreur */}
                {submitStatus === "error" && (
                  <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 flex items-start gap-3 animate-slide-up">
                    <FiAlertCircle className="text-red-500 text-xl shrink-0 mt-0.5" />
                    <Typography variant="body-sm" theme="black" className="text-red-700">
                      {wording.contact.form.error}
                    </Typography>
                  </div>
                )}

                {/* Formulaire */}
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  {/* Nom */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      {wording.contact.form.name}{" "}
                      <span className="text-red-500">{wording.contact.required}</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r border-gray-300 bg-gray-50 group-focus-within:bg-primary/5 group-focus-within:border-primary transition-colors">
                        <FiUser className="text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={wording.contact.form.namePlaceholder}
                        className="w-full pl-14 pr-4 py-4 border-2 border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white hover:border-gray-400"
                        required
                        aria-label={wording.contact.form.name}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      {wording.contact.form.email}{" "}
                      <span className="text-red-500">{wording.contact.required}</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-12 flex items-center justify-center border-r border-gray-300 bg-gray-50 group-focus-within:bg-primary/5 group-focus-within:border-primary transition-colors">
                        <FiMail className="text-gray-400 group-focus-within:text-primary transition-colors" size={20} />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={wording.contact.form.emailPlaceholder}
                        className="w-full pl-14 pr-4 py-4 border-2 border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white hover:border-gray-400"
                        required
                        aria-label={wording.contact.form.email}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-gray-900 mb-2"
                    >
                      {wording.contact.form.message}{" "}
                      <span className="text-red-500">{wording.contact.required}</span>
                    </label>
                    <div className="relative group">
                      <div className="absolute left-0 top-3 w-12 flex items-start justify-center border-r border-gray-300 bg-gray-50 group-focus-within:bg-primary/5 group-focus-within:border-primary transition-colors">
                        <FiMessageSquare className="text-gray-400 group-focus-within:text-primary transition-colors mt-2" size={20} />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={wording.contact.form.messagePlaceholder}
                        rows={6}
                        className="w-full pl-14 pr-4 py-4 border-2 border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all bg-white hover:border-gray-400 resize-none"
                        required
                        aria-label={wording.contact.form.message}
                      />
                    </div>
                  </div>

                  {/* Bouton de soumission */}
                  <Button
                    type="submit"
                    variant="accent"
                    size="large"
                    className="w-full group relative overflow-hidden"
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          {wording.contact.form.submitting}
                        </>
                      ) : (
                        <>
                          {wording.contact.form.submit}
                          <FiSend className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

