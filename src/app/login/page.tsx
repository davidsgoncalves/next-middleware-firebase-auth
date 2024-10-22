// app/login/page.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { auth } from "@lib/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        // Obtém o ID token do usuário
        const idToken = await user.getIdToken();

        // Armazena o token em um cookie HTTP-only
        document.cookie = `token=${idToken}; path=/;`;

        // Redireciona para a área protegida
        router.push("/workspaces");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleGoogleLogin}>Entrar com Google</button>
    </div>
  );
};

export default LoginPage;
