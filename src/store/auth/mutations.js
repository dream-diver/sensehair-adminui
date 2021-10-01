export default {
    setAuthToken(state, payload){
        state.authToken = payload
    },
    setLoggedInUserData(state, payload){
        state.loggedInUser = payload
    },
}
