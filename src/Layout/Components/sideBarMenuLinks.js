export const adminMenuLinks = [
    {
        header: true,
        title: "Main Navigation"
    },
    {
        title: "Bookings",
        icon: "pe-7s-user",
        child: [
            {
                href: "/bookings",
                title: "Manage Bookings"
            },
            {
                href: "/bookings/create",
                title: "Add Bookings"
            },
        ]
    },
];
