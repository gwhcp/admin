<template>
    <div>
        Main Page

        <CRow>
            <CCol col="12"
                  sm="6">
                <CCallout color="info">
                    <small class="text-muted">New Clients</small><br>
                    <strong class="h4">9,123</strong>
                </CCallout>
            </CCol>

            <CCol col="12"
                  sm="6">
                <CCallout color="danger">
                    <small class="text-muted">Recurring Clients</small><br>
                    <strong class="h4">22,643</strong>
                </CCallout>
            </CCol>
        </CRow>
    </div>
</template>

<script>
import Loading from "@/mixins/Loading";

export default {
    name: 'Dashboard',
    mixins: [
        Loading
    ]
}
</script>
