<template>
    <div>
        <modal-success msg="Email template has been removed."/>

        <CTabs :active-tab="0"
               addNavClasses="border-bottom-0"
               variant="tabs">
            <CTab title="Search">
                <CCard bodyWrapper>
                    <CDataTable :fields="fields"
                                :items="formArr"
                                :items-per-page="10"
                                column-filter
                                hover
                                items-per-page-select
                                pagination
                                sorter
                                table-filter>
                        <template #show_details="{ item }">
                            <td class="py-2">
                                <CLink :to="{ name: 'setting:email:profile', params: { id: item.id }}">
                                    <CButton color="info"
                                             size="sm"
                                             square
                                             variant="outline">
                                        View
                                    </CButton>
                                </CLink>
                            </td>
                        </template>

                        <template #delete="{ item }">
                            <td class="py-2">
                                <modal-open-delete :delete="deleteEmailTemplate"
                                                   :formArr="formArr"
                                                   :params="{id: item.id}"
                                                   msg="Continuing will remove this email template."/>
                            </td>
                        </template>
                    </CDataTable>
                </CCard>
            </CTab>

            <CTab :to="{name: 'setting:email:create'}"
                  title="Create"
                  v-if="this.hasPerm('setting.email.add_emailtemplate')"/>
        </CTabs>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {ModalOpenDelete, ModalSuccess} from "@/components/modal";
import Permission from "@/mixins/Permission";

export default {
    name: 'TheSearch',
    components: {
        ModalOpenDelete,
        ModalSuccess
    },
    mixins: [
        Permission
    ],
    data() {
        return {
            fields: [
                {key: 'id', label: 'ID', _style: 'min-width:100px;'},
                {key: 'subject', _style: 'min-width:100px'},
                {key: 'template_name', label: 'Template', _style: 'min-width:100px;'},
                {key: 'show_details', label: '', _style: 'width:1%', sorter: false, filter: false}
            ]
        };
    },
    computed: {
        ...mapGetters('settingEmail', [
            'formArr'
        ])
    },
    created() {
        this.getSearch();
    },
    mounted() {
        if (this.hasPerm('setting.email.delete_emailtemplate')) {
            this.fields.push({key: 'delete', label: '', _style: 'width:1%', sorter: false, filter: false});
        }
    },
    methods: {
        ...mapActions('settingEmail', [
            'deleteEmailTemplate',
            'getSearch'
        ])
    }
}
</script>
