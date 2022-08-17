export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.manage-user',
        menus: [
            // {
            //     // name: 'menu.system.system-administrator.header',
            //     subMenus: [
            //         // { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
            //         // { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },

            //     ]
            // },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
            {
                name: 'menu.admin.crud', link: '/system/user-manager'
            },
            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor', link: '/system/user-doctor'
            },
            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin'
            }
           
        ]
    },
    { //Quanr ly phong khasm
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            }
        ]
    },
    { //Quanr ly chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            }
        ]
    },
    { //Quanr ly cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            }
        ]
    },
];