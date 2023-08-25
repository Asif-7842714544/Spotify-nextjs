"use client";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";

import React, { useEffect } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModalStore from "@/hooks/useAuthModal";

function AuthModal() {
  const supaBaseClient = useSupabaseClient();
  const router = useRouter();
  const { session } = useSessionContext();
  const { isOpen, onClose } = useAuthModalStore();

  const closeModal = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  return (
    <Modal
      title="Welcome Back"
      description="Login to your Account"
      isOpen={isOpen}
      onChange={closeModal}
    >
      <Auth
      theme="dark"
        magicLink
        providers={["google"]}
        supabaseClient={supaBaseClient}
        appearance={{
          theme: ThemeSupa,
        }}
      />
    </Modal>
  );
}

export default AuthModal;
