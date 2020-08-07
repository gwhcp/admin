<template>
    <div class="mb-2">
        <h6 class="font-weight-bold">{{ name }}</h6>
        <div v-if="value && !ahref">
            {{ value }}
        </div>

        <div v-if="ahref">
            <router-link :to="ahref"
                         v-if="hasPerm(permission)">
                {{ value }}
            </router-link>

            <div v-else>
                {{ value }}
            </div>
        </div>

        <div v-if="datetime">
            {{ convertDate(datetime) }}
        </div>
    </div>
</template>

<script>
import AccountProfile from "@/mixins/AccountProfile";
import Permission from "@/mixins/Permission";
import moment from "moment-timezone";

export default {
    name: 'StaticData',
    mixins: [
        AccountProfile,
        Permission
    ],
    props: {
        ahref: {
            type: Object
        },
        datetime: {
            type: String
        },
        name: {
            type: String
        },
        permission: {
            type: String
        },
        value: {
            type: null
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
}
</script>