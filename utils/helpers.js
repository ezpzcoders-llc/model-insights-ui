export const convertFileToBase64 = async (file, cb) => {
    const reader = new FileReader()
    reader.onloadend = () => {
        const base64 = reader.result
        cb(base64)
    }
    reader.readAsDataURL(file)
}

export const currencyFormatter = value => {
    const formatted = parseFloat(value).toLocaleString('en-US', {
        // const formatted = value.toLocaleString('en-US', {
        style: 'decimal',
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    })
    console.log(`formatted`, formatted)
    return formatted
}
