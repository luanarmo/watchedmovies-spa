const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

/**
 * Inicia sesión un usuario en la aplicación.
 *
 * Esta función realiza una petición POST a la API para autenticar a un usuario
 * con su dirección de correo electrónico y contraseña. Si la autenticación
 * es exitosa, devuelve los datos del usuario; de lo contrario, lanza un error.
 *
 * @param {Object} credentials - Las credenciales del usuario.
 * @param {string} credentials.email - La dirección de correo electrónico del usuario.
 * @param {string} credentials.password - La contraseña del usuario.
 * @returns {Promise<Object>} Los datos del usuario si la autenticación es exitosa.
 * @throws {Error} Lanza un error si la autenticación falla o si ocurre un problema
 * durante la petición.
 */
export const login = async ({ email, password }) => {

    const response = await fetch(`${BASE_API_URL}/api/auth/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.detail || "Error desconocido!")
    }

    return data
}