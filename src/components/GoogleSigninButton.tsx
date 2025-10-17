import { signInGoogle } from '@/utils/actions/authFunctions'

export default function GoogleSigninButton() {
  return (
    <form action={signInGoogle}>
            <button
                type="submit"
                className="cursor-pointer text-white p-1 rounded-full hover:text-primary transition-colors"
                title="Sign in"
            >
                Sign in
            </button>
        </form>
  )
}
