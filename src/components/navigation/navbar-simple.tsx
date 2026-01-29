"use client";

import React, { useState, useEffect } from "react";
import Container from "@/components/container/container";
import { wording } from "@/utils/wording";

export default function NavbarSimple() {
  const [showSecondMessage, setShowSecondMessage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondMessage(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container className="flex justify-center h-8 my-auto text-white bg-blue-600">
      <p className="text-sm font-medium">
        {!showSecondMessage
          ? wording.navbar.message1
          : wording.navbar.message2}
      </p>
    </Container>
  );
}

