export default {
    setPaginationData(state, payload){
        state.pagination.current_page = payload.current_page
        state.pagination.last_page = payload.last_page
        state.pagination.total_entries = payload.total
        state.pagination.per_page = payload.per_page
        state.pagination.message = '(' + (state.pagination.current_page*state.pagination.per_page - state.pagination.per_page +1).toString()
            + '-' + (state.pagination.current_page*state.pagination.per_page).toString()
            + ') from '
            + (state.pagination.total_entries).toString() 
    },
}
