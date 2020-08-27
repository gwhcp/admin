<script>
export default {
    name: 'AccountProfile',
    computed: {
        accountProfile: {
            get() {
                return this.$store.state.auth.profile;
            }
        }
    }
};
</script>