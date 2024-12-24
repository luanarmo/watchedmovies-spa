export function ProfileSkeleton() {
    return (
        <section className="flex flex-col lg:flex-row p-6 gap-6 items-center lg:items-start justify-center min-h-screen bg-slate-950 text-white">

            {/* Formulario de perfil */}
            <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-full max-w-lg flex flex-col gap-6 animate-pulse">
                <div className="h-8 bg-slate-700 rounded w-1/2"></div>

                {/* Email */}
                <div className="flex items-center gap-4">
                    <div className="h-6 w-6 bg-blue-400 rounded-full"></div>
                    <div className="h-6 bg-slate-700 rounded w-1/2"></div>
                </div>

                {/* Nombre */}
                <div className="flex items-center gap-4">
                    <div className="h-6 w-6 bg-green-400 rounded-full"></div>
                    <div className="h-8 bg-slate-700 rounded w-full"></div>
                </div>

                {/* Biografía */}
                <div className="flex items-center gap-4">
                    <div className="h-6 w-6 bg-blue-400 rounded-full"></div>
                    <div className="h-8 bg-slate-700 rounded w-full"></div>
                </div>

                {/* Fecha de nacimiento */}
                <div className="flex items-center gap-4">
                    <div className="h-6 w-6 bg-green-400 rounded-full"></div>
                    <div className="h-8 bg-slate-700 rounded w-1/2"></div>
                </div>

                {/* Botón de enviar */}
                <div className="h-10 bg-slate-700 rounded w-full"></div>
            </div>

            {/* Formulario de collage de posters */}
            <div className="bg-slate-800 p-4 rounded-lg shadow-lg w-full max-w-lg flex flex-col gap-4 animate-pulse">
                <div className="h-8 bg-slate-700 rounded w-1/2"></div>

                {/* Año */}
                <div className="h-8 bg-slate-700 rounded w-full"></div>

                {/* Ordenar por */}
                <div className="h-8 bg-slate-700 rounded w-full"></div>

                {/* Botón de generar imagen */}
                <div className="h-10 bg-slate-700 rounded w-full"></div>
            </div>

        </section>
    )
}