const card = 'bg-dusty-grape-800/50 border border-dusty-grape-700 rounded-xl p-4 md:p-6 flex flex-col gap-4 md:gap-5 min-w-0 md:flex-1 animate-pulse'

const Field = () => (
    <div className="flex flex-col gap-1.5">
        <div className="h-4 bg-dusty-grape-700 rounded w-1/4"></div>
        <div className="h-11 bg-dusty-grape-700 rounded-full w-full"></div>
    </div>
)

export function ProfileSkeleton() {
    return (
        <div className="mx-auto flex flex-col gap-4 md:gap-6 p-4 w-full max-w-5xl min-h-screen">
            {/* Header */}
            <div className="flex items-center justify-between md:bg-dusty-grape-800/50 md:p-4 md:rounded-xl md:border md:border-dusty-grape-700">
                <div className="h-8 bg-dusty-grape-700 rounded w-28 animate-pulse"></div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-start">
                {/* Account card */}
                <div className={card}>
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 md:h-16 md:w-16 bg-dusty-grape-600 rounded-full flex-none"></div>
                        <div className="flex flex-col gap-2 w-full">
                            <div className="h-5 bg-dusty-grape-700 rounded w-1/2"></div>
                            <div className="h-4 bg-dusty-grape-700 rounded w-2/3"></div>
                        </div>
                    </div>
                    <Field />
                    <Field />
                    <Field />
                    <div className="h-11 bg-dusty-grape-700 rounded-full w-1/3"></div>
                </div>

                {/* Generators card */}
                <div className={card}>
                    <div className="flex flex-col gap-2">
                        <div className="h-4 bg-dusty-grape-700 rounded w-1/4"></div>
                        <div className="h-4 bg-dusty-grape-700 rounded w-3/4"></div>
                    </div>
                    <Field />
                    <Field />
                    <div className="flex flex-col sm:flex-row gap-3">
                        <div className="h-11 bg-dusty-grape-600 rounded-full flex-1"></div>
                        <div className="h-11 bg-dusty-grape-600 rounded-full flex-1"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
