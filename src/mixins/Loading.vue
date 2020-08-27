<script>
/**
 * Plugin by https://github.com/noxludio/vuejs-loading-plugin
 */
export default {
    name: "Loading",
    data() {
        return {
            loading: false
        };
    },
    computed: {
        loadingState: {
            get: function () {
                return this.loading;
            },
            set: function (value) {
                this.loading = value;
            }
        }
    },
    watch: {
        loading(value) {
            if (value)
                this.$loading(true);
            else
                this.$loading(false);
        },
        /*formErrors(value) {
            if (value)
                this.$nextTick(() => {
                    this.loadingState = false;
                });
        },
        formSuccess(value) {
            if (value)
                this.$nextTick(() => {
                    this.loadingState = false;
                });
        }*/
    },
    created() {
        this.loadingState = true;
    },
    mounted() {
        this.$nextTick(() => {
            this.loadingState = false;
        });
    },
    destroyed() {
        this.$loading(false);
    }
};
</script>