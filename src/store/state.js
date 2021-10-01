export default {
    authToken: null,
    loggedInUser: {},

    pagination: {
        current_page: 1,
        last_page: 1,
        total_entries: 1,
        per_page: 1,
        message: '',
        numOfRowsOptions: [
            { text: '10 Entries', value: 10 },
            { text: '25 Entries', value: 25 },
            { text: '50 Entries', value: 50 },
            { text: '75 Entries', value: 75 },
            { text: '100 Entries', value: 100 },
            // { text: '150 Entries', value: 150 },
            // { text: '200 Entries', value: 200 },
            // { text: '250 Entries', value: 250 },
            // { text: '500 Entries', value: 500 },
        ],

    },
}
