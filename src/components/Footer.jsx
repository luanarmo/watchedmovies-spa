export function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
                {/* Derechos de autor */}
                <div className="mb-4 md:mb-0">
                    <p className="text-sm">&copy; 2024 luanarmo.</p>
                </div>

                {/* Enlaces a redes sociales */}
                <div className="mb-4 md:mb-0">
                    <ul className="flex space-x-4">
                        <li>
                            <a
                                href="https://github.com/luanarmo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400"
                            >
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.linkedin.com/in/luis-angel-arroyo-morales-31b25a1ab"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400"
                            >
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:luisangel_arroyo@outlook.com"
                                className="hover:text-blue-400"
                            >
                                Email
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Información adicional */}
                <div>
                    <p className="text-sm">Desarrollador FullStack</p>
                </div>
            </div>
        </footer>
    )
}