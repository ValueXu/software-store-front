export const type={
    SIGN_IN:'SIGN_IN',
    SIGN_OUT:'SIGN_OUT'
}

export function signIn(paths){
    return {
        type:type.SIGN_IN,
        paths
    }
}
export function signOut(paths){
    return {
        type:type.SIGN_OUT
    }
}