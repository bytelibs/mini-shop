import {defineStore} from "pinia";


export const useUserStore = defineStore({
    id: 'user',
    state: () => ({
        access_token: '',
        refresh_token: '',
        scope: '',
        openid: ''
    }),
    actions: {
        SET_ACCESS_TOKEN: (state: any, token: string) => {
            state.access_token = token
        },
        SET_REFRESH_TOKEN: (state: any, token: string) => {
            state.refresh_token = token
        },
        SET_SCOPE: (state: any, scope: string) => {
            state.scope = scope
        },
        SET_OPENID: (state: any, openid: string) => {
            state.openid = openid
        }
    }

})
