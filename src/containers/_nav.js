export default [
    {
        _name: 'CSidebarNav',
        _children: [
            {
                _name: 'CSidebarNavItem',
                name: 'Dashboard',
                to: {name: 'dashboard'},
                icon: 'cil-speedometer'
            },
            {
                _name: 'CSidebarNavTitle',
                _children: ['Actions']
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Billing',
                route: '/billing',
                fontIcon: 'fas fa-hand-holding-usd',
                items: []
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Company',
                route: '/company',
                fontIcon: 'fas fa-building',
                items: []
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Customer',
                route: '/customer',
                fontIcon: 'fas fa-users',
                items: []
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Employee',
                route: '/employee',
                fontIcon: 'fas fa-user-tie',
                items: []
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Hardware',
                route: '/hardware',
                fontIcon: 'fas fa-wrench',
                items: []
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Network',
                route: '/network',
                fontIcon: 'fas fa-laptop',
                items: []
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Settings',
                route: '/setting',
                fontIcon: 'fas fa-cog',
                items: []
            },
            {
                _name: 'CSidebarNavDropdown',
                name: 'Store',
                route: '/store',
                fontIcon: 'fas fa-shopping-cart',
                items: []
            }
        ]
    }
]