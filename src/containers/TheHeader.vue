<template>
    <CHeader fixed light with-subheader>
        <CToggler @click="$store.commit('toggleSidebarMobile')"
                  class="ml-3 d-lg-none"
                  in-header/>

        <CToggler @click="$store.commit('toggleSidebarDesktop')"
                  class="ml-3 d-md-down-none"
                  in-header/>

        <CHeaderBrand :to="{ name: 'dashboard' }"
                      class="mx-auto d-lg-none">
            <img src="img/gwhcp_header.svg"
                 alt="GWHCP"
                 height="48"/>
        </CHeaderBrand>

        <CHeaderNav class="d-md-down-none mr-auto">
            <CHeaderNavItem class="px-3">
                <CHeaderNavLink :to="{ name: 'dashboard' }">
                    Dashboard
                </CHeaderNavLink>
            </CHeaderNavItem>
        </CHeaderNav>

        <CHeaderNav class="mr-4">
            <TheHeaderDropdownAccnt/>
        </CHeaderNav>

        <CSubheader class="px-3">
            <CBreadcrumbRouter class="border-0 mb-0"/>
        </CSubheader>
    </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from "@/containers/TheHeaderDropdownAccnt";

export default {
    name: 'TheHeader',
    components: {
        TheHeaderDropdownAccnt
    }
};
</script>
