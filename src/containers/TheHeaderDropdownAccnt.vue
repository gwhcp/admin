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
                         src="img/avatars/6.jpg"/>
                </div>
            </CHeaderNavLink>
        </template>

        <CDropdownHeader class="text-center"
                         color="light"
                         tag="div">
            <strong>Account</strong>
        </CDropdownHeader>

        <CDropdownItem>
            <CIcon name="cil-bell"/>
            Updates

            <CBadge class="ml-auto"
                    color="info">{{ itemsCount }}
            </CBadge>
        </CDropdownItem>

        <CDropdownItem>
            <CIcon name="cil-envelope-open"/>
            Messages

            <CBadge class="ml-auto"
                    color="success">{{ itemsCount }}
            </CBadge>
        </CDropdownItem>

        <CDropdownItem>
            <CIcon name="cil-task"/>
            Tasks

            <CBadge class="ml-auto"
                    color="danger">{{ itemsCount }}
            </CBadge>
        </CDropdownItem>

        <CDropdownItem>
            <CIcon name="cil-comment-square"/>
            Comments

            <CBadge class="ml-auto"
                    color="warning">{{ itemsCount }}
            </CBadge>
        </CDropdownItem>

        <CDropdownHeader class="text-center"
                         color="light"
                         tag="div">
            <strong>Settings</strong>
        </CDropdownHeader>

        <CDropdownItem :to="{name: 'account:account:profile'}">
            <CIcon name="cil-user"/>
            Profile
        </CDropdownItem>

        <CDropdownItem :to="{name: 'account:account:accesslog'}">
            <CIcon name="cil-user"/>
            Access Logs
        </CDropdownItem>

        <CDropdownItem :to="{name: 'account:login:password'}">
            <CIcon name="cil-lock-locked"/>
            Change Password
        </CDropdownItem>

        <CDropdownDivider/>

        <CDropdownItem :to="{name: 'logout'}">
            <CIcon name="cil-account-logout"/>
            Logout
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
}
</script>

<style scoped>
.c-icon {
    margin-right: 0.3rem;
}
</style>