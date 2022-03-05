export const required = value => {
    if (value === undefined || value === null || value.length === 0) {
        return "Field is required"
    }
    return true
}
