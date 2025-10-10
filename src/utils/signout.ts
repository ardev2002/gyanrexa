"use server";

import { signIn, signOut } from "@/../auth";

export async function signout() {
    await signOut();
}

export async function signInGoogle() {
    await signIn("google");
}