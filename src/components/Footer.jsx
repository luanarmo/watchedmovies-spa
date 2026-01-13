export function Footer() {
    return (
        <footer className="bg-dusty-grape-900 text-dusty-grape-50 py-6 border-t border-dusty-grape-800">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
                <div className="mb-4 md:mb-0">
                    <p className="text-base font-semibold text-dusty-grape-300">luanarmo</p>
                </div>

                <div className="mb-4 md:mb-0">
                    <ul className="flex space-x-4">
                        <li>
                            <a
                                href="https://github.com/luanarmo"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-dusty-grape-300 transition-colors"
                            >
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.linkedin.com/in/luis-angel-arroyo-morales-31b25a1ab"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-dusty-grape-300 transition-colors"
                            >
                                LinkedIn
                            </a>
                        </li>
                        <li>
                            <a
                                href="mailto:luisangel_arroyo@outlook.com"
                                className="hover:text-dusty-grape-300 transition-colors"
                            >
                                Email
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <p className="text-sm text-dusty-grape-400">FullStack Developer</p>
                </div>
            </div>
        </footer>
    )
}