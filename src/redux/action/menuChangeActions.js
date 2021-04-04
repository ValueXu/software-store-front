export const type={
    MENU_CHANGE:"MENU_CHANGE"
}

export function menuChange(menuInfo={title:"",content:""}){
    return {
        type:type.MENU_CHANGE,
        menuInfo
    }
}