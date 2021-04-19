export const type={
    SIGN_IN:'SIGN_IN',
    SIGN_OUT:'SIGN_OUT'
}

export function signIn(userInfo){
    return {
        type:type.SIGN_IN,
        userInfo
    }
}
export function signOut(){
    return {
        type:type.SIGN_OUT
    }
}