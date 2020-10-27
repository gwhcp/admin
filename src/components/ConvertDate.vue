<template>
    <div>{{ convertDate(datetime) }}</div>
</template>

<script>
import AccountProfile from "@/mixins/AccountProfile";
import moment from "moment-timezone";

export default {
    name: 'ConvertDate',
    mixins: [
        AccountProfile
    ],
    props: {
        datetime: {
            type: String
        }
    },
    methods: {
        convertDate(value) {
            if (this.accountProfile.time_format === 12) {
                return moment
                    .tz(value, this.accountProfile.time_zone)
                    .format('YYYY-MM-DD h:mm:ss A');
            } else {
                return moment
                    .tz(value, this.accountProfile.time_zone)
                    .format('YYYY-MM-DD H:mm:ss');
            }
        }
    }
};
</script>