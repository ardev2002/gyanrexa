"use server";

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";

export async function signout() {
    await signOut();
    revalidatePath('/');
}

export async function signInGoogle() {
    await signIn("google");
    revalidatePath('/');
}