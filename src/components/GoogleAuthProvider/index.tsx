"use client";

import { StateProvider, initialState } from "@/context/StateContext";
import { reducer } from "@/context/StateReducer";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SnackbarProvider } from "notistack";

export default function GoogleAuthProvier({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <SnackbarProvider
        maxSnack={2}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <GoogleOAuthProvider
          clientId={`${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}
        >
          {children}
        </GoogleOAuthProvider>
      </SnackbarProvider>
    </StateProvider>
  );
}
