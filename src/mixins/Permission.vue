<script>
export default {
    name: 'Permission',
    computed: {
        form: {
            get() {
                let form = document.querySelector('form');

                return form.elements;
            }
        },
        perm: {
            get() {
                return this.$store.state.auth.permit;
            }
        }
    },
    methods: {
        hasPerm(permission) {
            return this.perm.includes(permission);
        },
        hasPermForm(permission) {
            if (!this.perm.includes(permission)) {
                for (let i = 0, len = this.form.length; i < len; ++i) {
                    this.form[i].disabled = true;
                }
            }
        }
    }
};
</script>