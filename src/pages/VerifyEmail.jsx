import { Base } from '../components/Base'

export function VerifyEmail() {
    return (
        <Base>
            <div className="flex flex-col justify-center items-center min-h-screen p-6 space-y-4">
                <div className="bg-dusty-grape-800/80 border border-dusty-grape-700 rounded-xl shadow-2xl p-8 w-full max-w-lg flex flex-col gap-4 text-center">
                    <h1 className="text-3xl font-semibold text-dusty-grape-100">Verify your email address!</h1>
                    <p className="text-lg text-dusty-grape-200">We've sent you an email with a link to verify your account.</p>
                    <p className="text-lg text-dusty-grape-200">Please check your inbox and click the link in the email to confirm your address.</p>
                    <p className="text-lg text-dusty-grape-400 mt-2">
                        If you can't find the email, please check your <strong className="font-medium text-dusty-grape-100">Spam</strong> or <strong className="font-medium text-dusty-grape-100">Junk</strong> folder.
                    </p>
                </div>
            </div>
        </Base>
    )
}
