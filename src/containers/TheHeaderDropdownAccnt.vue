<template>
    <CDropdown add-menu-classes="pt-0"
               class="c-header-nav-items"
               inNav
               placement="bottom-end">
        <template #toggler>
            <CHeaderNavLink>
                <div class="c-avatar">
                    <img alt="Avatar"
                         class="c-avatar-img"
                         src="img/avatar_user.svg"/>
                </div>
            </CHeaderNavLink>
        </template>

        <CDropdownHeader class="text-center"
                         color="light"
                         tag="div">
            <strong>Account</strong>
        </CDropdownHeader>

        <CDropdownItem :to="{ name: 'employee:account:profile' }">
            <i class="fas fa-user-circle mr-1"/> Profile
        </CDropdownItem>

        <CDropdownItem :to="{ name: 'employee:account:accesslog' }">
            <i class="fas fa-dungeon mr-1"/> Access Logs
        </CDropdownItem>

        <CDropdownItem :to="{ name: 'employee:account:password' }">
            <i class="fas fa-unlock-alt mr-1"/> Change Password
        </CDropdownItem>

        <CDropdownDivider/>

        <CDropdownItem :to="{ name: 'logout' }">
            <i class="fas fa-sign-out-alt mr-1"/> Logout
        </CDropdownItem>
    </CDropdown>
</template>

<script>
export default {
    name: 'TheHeaderDropdownAccnt',
    data() {
        return {
            itemsCount: 42
        };
    }
};
</script>