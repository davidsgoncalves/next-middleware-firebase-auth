// app/workspace/page.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@lib/firebase";

const WorkspacesPage: React.FC = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
};

export default WorkspacesPage;
