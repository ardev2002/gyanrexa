import React from 'react'
import ProfileDetails from './ProfileDetails';
import { signInGoogle } from '@/utils/lib/authFunctions';
import { auth } from '@/auth';

export default async function RightNavSection() {
    const user = (await auth())?.user;
    return user ?
        <ProfileDetails user={user} />
        :
        <form action={async () => await signInGoogle()}>
            <button
                type="submit"
                className="cursor-pointer p-1 rounded-full hover:text-primary transition-colors"
                title="Sign in"
            >
                Sign in
            </button>
        </form>;
}
