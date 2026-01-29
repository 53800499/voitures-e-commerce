/** @format */

import clsx from "clsx";
import React from "react";

interface Props {
  variant?:
    | "display"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "lead"
    | "body"
    | "body-lg"
    | "body-base"
    | "body-sm"
    | "caption1"
    | "caption2"
    | "caption3"
    | "caption4";
  component?: "h1" | "h2" | "h3" | "h4" | "h5" | "div" | "p" | "span";
  theme?: "black" | "white" | "gray" | "primary" | "secondary" | "red";
  weight?: "regular" | "medium" | "bold";
  className?: string;
  children: React.ReactNode;
}

export default function                                           Typography({
  children,
  variant = "body",
  component: Component = "div",
  theme = "black",
  weight = "medium",
  className
}: Props) {
  // Styles pour les variantes
  const variantStyles: Record<string, string> = {
    display: "text-4xl lg:text-5xl",
    h1: "text-3xl lg:text-4xl",
    h2: "text-2xl lg:text-3xl",
    h3: "text-xl lg:text-2xl",
    h4: "text-lg lg:text-xl",
    h5: "text-base lg:text-lg",
    lead: "text-lg lg:text-xl",
    "body-lg": "text-base lg:text-lg",
    body: "text-sm lg:text-base",
    "body-base": "text-base",
    "body-sm": "text-sm",
    caption1: "text-sm leading-snug text-gray-500",
    caption2: "text-xs leading-snug text-gray-500",
    caption3: "text-[11px] leading-tight text-gray-400",
    caption4:
      "text-[10px] leading-tight text-gray-400 uppercase tracking-wide"
  };

  // Couleurs dynamiques
  const themeStyles: Record<string, string> = {
    black: "text-gray-900",
    gray: "text-gray-400",
    white: "text-white",
    primary: "text-primary",
    secondary: "text-secondary",
    red: "text-danger"
  };

  return (
    <Component
      className={clsx(
        variantStyles[variant],
        themeStyles[theme],
        {
          "font-normal": weight === "regular",
          "font-medium": weight === "medium",
          "font-bold": weight === "bold"
        },
        className
      )}>
      {children}
    </Component>
  );
}
