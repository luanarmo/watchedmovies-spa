import { Base } from './Base'

export function VerifyEmail() {
    return (
        <Base>
            <div className="flex flex-col justify-start items-center min-h-screen bg-gray-900 text-white p-6 space-y-4">
                <h1 className="text-3xl font-semibold text-center text-indigo-500">🔒 Verify your email address!</h1>
                <p className="text-lg text-center">We've sent you an email with a link to verify your account 📧</p>
                <p className="text-lg text-center">Please check your inbox and click the link in the email to confirm your address 📬</p>
                <p className="text-lg text-center text-gray-400 mt-6">
                    If you can't find the email, please check your <strong className="font-medium text-yellow-400">Spam</strong> or <strong className="font-medium text-yellow-400">Junk</strong> folder ⚠️
                </p>
            </div>
        </Base>
    )
}
