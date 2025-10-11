import { User } from 'next-auth'
import React from 'react'
import ProfileDetails from './ProfileDetails';
import { signInGoogle } from '@/utils/auth';

export default function RightNavSection({ user }: { user: User | undefined }) {
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
