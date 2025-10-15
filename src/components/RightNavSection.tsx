import ProfileDetails from './ProfileDetails';
import { auth } from '@/auth';
import GoogleSigninButton from "./GoogleSigninButton";

export default async function RightNavSection() {
    const user = (await auth())?.user;
    return user ? <ProfileDetails user={user} /> : <GoogleSigninButton />
}
