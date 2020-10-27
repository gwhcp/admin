<template>
    <div class="c-app">
        <TheSidebar/>

        <CWrapper>
            <TheHeader/>

            <div class="c-body">
                <main class="c-main">
                    <CContainer fluid>
                        <transition name="fade">
                            <router-view></router-view>
                        </transition>
                    </CContainer>
                </main>
            </div>

            <TheFooter/>
        </CWrapper>
    </div>
</template>

<script>
import TheFooter from "@/containers/TheFooter";
import TheHeader from "@/containers/TheHeader";
import TheSidebar from "@/containers/TheSidebar";

export default {
    name: 'TheContainer',
    components: {
        TheFooter,
        TheHeader,
        TheSidebar
    }
};
</script>
