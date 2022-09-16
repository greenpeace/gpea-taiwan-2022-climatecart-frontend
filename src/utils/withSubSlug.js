export function withSubSlug(path) {
    return process.env.REACT_APP_SUB_SLUG ? `/${process.env.REACT_APP_SUB_SLUG}${path}` : path
}
