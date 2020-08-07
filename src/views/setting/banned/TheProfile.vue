<template>
    <CCard bodyWrapper>
        <static-data :value="formData.id"
                     name="Banned ID"/>

        <static-data :datetime="formData.date_from"
                     name="Created Date"/>

        <static-data :value="formData.name"
                     name="Name"/>

        <static-data :value="formData.banned_type_name"
                     name="Type"/>
    </CCard>
</template>

<script>
import StaticData from "@/components/StaticData";
import {mapActions, mapState} from "vuex";

export default {
    name: 'TheProfile',
    components: {
        StaticData
    },
    data() {
        return {
            bannedId: this.$route.params.id
        };
    },
    computed: {
        ...mapState('settingBanned', [
            'formData'
        ])
    },
    created() {
        this.getProfile({
            id: this.bannedId
        });
    },
    methods: {
        ...mapActions('settingBanned', [
            'getProfile'
        ])
    }
}
</script>
