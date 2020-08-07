<template>
    <div>
        <CRow>
            <CCol lg="3">
                <router-link :to="{name: 'store:product:domain:search'}"
                             class="text-decoration-none">
                    <CWidgetIcon
                        color="success"
                        text="Domain Hosting">
                        <i class="fas fa-globe fa-2x"/>
                    </CWidgetIcon>
                </router-link>
            </CCol>

            <CCol lg="3">
                <router-link :to="{name: 'store:product:index'}"
                             class="text-decoration-none">
                    <CWidgetIcon
                        color="success"
                        text="Mail Hosting">
                        <i class="fas fa-at fa-2x"/>
                    </CWidgetIcon>
                </router-link>
            </CCol>

            <CCol lg="3">
                <router-link :to="{name: 'store:product:index'}"
                             class="text-decoration-none">
                    <CWidgetIcon
                        color="success"
                        text="MySQL Hosting">
                        <i class="fas fa-database fa-2x"/>
                    </CWidgetIcon>
                </router-link>
            </CCol>

            <CCol lg="3">
                <router-link :to="{name: 'store:product:index'}"
                             class="text-decoration-none">
                    <CWidgetIcon
                        color="success"
                        text="PostgreSQL Hosting">
                        <i class="fas fa-database fa-2x"/>
                    </CWidgetIcon>
                </router-link>
            </CCol>
        </CRow>

        <CRow>
            <CCol lg="3">
                <router-link :to="{name: 'store:product:index'}"
                             class="text-decoration-none">
                    <CWidgetIcon
                        color="success"
                        text="Dedicated / Private Server">
                        <i class="fas fa-server fa-2x"/>
                    </CWidgetIcon>
                </router-link>
            </CCol>

            <CCol lg="3">
                <router-link :to="{name: 'store:product:index'}"
                             class="text-decoration-none">
                    <CWidgetIcon
                        color="success"
                        text="Domain Registration">
                        <i class="fas fa-code fa-2x"/>
                    </CWidgetIcon>
                </router-link>
            </CCol>
        </CRow>

        <CRow>
            <CCol lg="3">
                <router-link :to="{name: 'store:product:index'}"
                             class="text-decoration-none">
                    <CWidgetIcon
                        color="success"
                        text="Add-ons">
                        <i class="fas fa-cart-plus fa-2x"/>
                    </CWidgetIcon>
                </router-link>
            </CCol>

            <CCol lg="3">
                <router-link :to="{name: 'store:product:index'}"
                             class="text-decoration-none">
                    <CWidgetIcon
                        color="success"
                        text="Coupon Codes">
                        <i class="fas fa-barcode fa-2x"/>
                    </CWidgetIcon>
                </router-link>
            </CCol>
        </CRow>
    </div>
</template>

<script>

export default {
    name: 'TheIndex'
}
</script>
