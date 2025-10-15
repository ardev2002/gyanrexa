import ProfileDetails from './ProfileDetails';
import GoogleSigninButton from "./GoogleSigninButton";
import { User } from 'next-auth';

export default async function RightNavSection({ user }: { user: User | undefined }) {
    return user ? <ProfileDetails user={user} /> : <GoogleSigninButton />
}
