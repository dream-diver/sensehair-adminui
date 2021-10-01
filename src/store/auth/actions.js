import router from '@/router/index'

export default {
    // async fetchLoggedInUserData(context){
    //     const user = context.getters.loggedInUser
    //     if (!user) {
    //         await axios.get('api/user').then((response) => {
    //             context.commit('setLoggedInUserData', response.data.data)
    //         }).catch(error => {
    //             if (error.response.status == 401) {
    //                 localStorage.removeItem('auth_token')
    //                 router.push({name: 'dashboard'})
    //             }
    //         })
    //     }
    // },

    fetchLoggedInUserData(context, options = {force: false}){
        return new Promise(async (resolve, reject) => {
            const user = context.getters.loggedInUser
            if (Object.keys(user).length === 0 || options.force === true) {
                if(context.getters.authToken){
                    await axios.get('api/user').then((response) => {
                        context.dispatch('setLoggedInUserData', response.data)
                        resolve()
                    }).catch(error => {
                        if (error.response.status == 401) {
                            context.dispatch('removeAuthToken')
                            context.dispatch('removeLoggedInUser')
                            router.push({name: 'login'})
                            reject('401 Unauthorized')
                        }
                    })
                } else {
                    reject('No AuthToken Found')
                }
            } else {
                resolve();
            }
        })
    },
    async setLoggedInUserData(context, payload){
        context.commit('setLoggedInUserData', payload)
    },

    removeLoggedInUser(context){
        context.dispatch('setLoggedInUserData', {})
    },

    setAuthToken(context, payload){
        context.commit('setAuthToken', payload)
    },
    removeAuthToken(context){
        context.dispatch('setAuthToken', null)
    },
}
