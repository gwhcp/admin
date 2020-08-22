<template>
    <CCard bodyWrapper>
        <static-data :value="formObj.id"
                     name="Banned ID"/>

        <static-data :datetime="formObj.date_from"
                     name="Created Date"/>

        <static-data :value="formObj.name"
                     name="Name"/>

        <static-data :value="formObj.banned_type_name"
                     name="Type"/>
    </CCard>
</template>

<script>
import StaticData from "@/components/StaticData";
import {mapActions, mapGetters} from "vuex";
import Loading from "@/mixins/Loading";

export default {
    name: 'TheProfile',
    components: {
        StaticData
    },
    mixins: [
        Loading
    ],
    data() {
        return {
            bannedId: this.$route.params.id
        };
    },
    computed: {
        ...mapGetters('settingBanned', [
            'formObj'
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
