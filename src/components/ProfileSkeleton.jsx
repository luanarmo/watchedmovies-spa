export function ProfileSkeleton() {
    return (
        <section className="flex flex-col lg:flex-row p-6 gap-6 items-center lg:items-start justify-center min-h-[80vh] w-full">

            {/* Formulario de perfil */}
            <div className="bg-dusty-grape-800/80 p-8 rounded-xl shadow-xl w-full max-w-lg flex flex-col gap-6 animate-pulse border border-dusty-grape-700">
                <div className="h-8 bg-dusty-grape-700 rounded w-1/2"></div>

                {/* Email */}
                <div className="flex items-center gap-4">
                    <div className="h-6 w-6 bg-dusty-grape-600 rounded-full"></div>
                    <div className="h-6 bg-dusty-grape-700 rounded w-1/2"></div>
                </div>

                {/* Nombre */}
                <div className="flex items-center gap-4">
                    <div className="h-6 w-6 bg-dusty-grape-600 rounded-full"></div>
                    <div className="h-10 bg-dusty-grape-700 rounded w-full"></div>
                </div>

                {/* Biografía */}
                <div className="flex items-center gap-4">
                    <div className="h-6 w-6 bg-dusty-grape-600 rounded-full"></div>
                    <div className="h-10 bg-dusty-grape-700 rounded w-full"></div>
                </div>

                {/* Fecha de nacimiento */}
                <div className="flex items-center gap-4">
                    <div className="h-6 w-6 bg-dusty-grape-600 rounded-full"></div>
                    <div className="h-10 bg-dusty-grape-700 rounded w-full"></div>
                </div>

                {/* Botón de enviar */}
                <div className="h-12 bg-dusty-grape-700 rounded w-1/3 self-start"></div>
            </div>

            {/* Formulario de collage de posters */}
            <div className="bg-dusty-grape-800/80 p-8 rounded-xl shadow-xl w-full max-w-lg flex flex-col gap-6 animate-pulse border border-dusty-grape-700">
                <div className="h-8 bg-dusty-grape-700 rounded w-1/2"></div>

                {/* Año */}
                <div className="flex flex-col gap-2">
                    <div className="h-6 bg-dusty-grape-700 rounded w-1/4"></div>
                    <div className="h-10 bg-dusty-grape-700 rounded w-full"></div>
                </div>

                {/* Ordenar por */}
                <div className="flex flex-col gap-2">
                    <div className="h-6 bg-dusty-grape-700 rounded w-1/4"></div>
                    <div className="h-10 bg-dusty-grape-700 rounded w-full"></div>
                </div>

                {/* Botones de generar */}
                <div className="flex gap-4 mt-2">
                    <div className="h-10 bg-dusty-grape-600 rounded w-full flex-1"></div>
                    <div className="h-10 bg-dusty-grape-600 rounded w-full flex-1"></div>
                </div>
            </div>

        </section>
    )
}