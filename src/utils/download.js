export const base64ToBlob = (base64, type) => {
    const bytes = Uint8Array.from(atob(base64), char => char.charCodeAt(0))
    return new Blob([bytes], { type })
}

export const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    // Some browsers ignore the click of an anchor that is not in the document
    document.body.appendChild(link)
    link.click()
    link.remove()
    // Some browsers start the download asynchronously, so the URL can't be revoked right away
    setTimeout(() => URL.revokeObjectURL(url), 1000)
}
