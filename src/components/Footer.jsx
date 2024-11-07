export function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
                <div className="mb-4 md:mb-0">
                    <p className="text-base">luanarmo</p>
                </div>

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

                <div>
                    <p className="text-sm">FullStack Developer</p>
                </div>
            </div>
        </footer>
    )
}