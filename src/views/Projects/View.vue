<template>
    <div>
        <v-card>
            <v-card-title primary-title>
                <v-btn
                    color="success"
                    outlined
                    class="mr-5"
                    @click="showEditProjectDialog"
                    >Edit</v-btn
                >
                <v-btn color="error" @click="deleteProject()" outlined
                    >Delete</v-btn
                >
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="2">
                        <p class="font-weight-bold">Project #</p>
                        <p class="font-weight-bold">Subject</p>
                        <p class="font-weight-bold">status</p>
                        <p class="font-weight-bold">Date</p>
                    </v-col>
                    <v-col cols="10">
                        <p>{{ Project.id_Project }}</p>
                        <p>{{ Project.subject }}</p>
                        <p>{{ Project.status }}</p>
                        <p>
                            {{
                                parseTimeStamp(
                                    Project.create_at,
                                    'DD/MM/YY h:mm:ss A'
                                )
                            }}
                        </p>
                    </v-col>
                    <v-col cols="12">
                        <p class="font-weight-bold">Description</p>
                        <p>{{ Project.description }}</p>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-card class="mt-2">
            <v-tabs v-model="tab" grow>                
                <v-tab>
                    Investors
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">                
                <v-tab-item>
                    <v-card flat>                        
                        <v-card-text>
                            <v-data-table
                                :headers="InvestorsHeaderTable"
                                :items="Project.Investors"
                                no-data-text="No employee asignated"
                            >
                                <template v-slot:item.actions="{ item }">
                                    <v-btn
                                        :to="`/users/view/${item.id_Project}`"
                                        text
                                        small
                                        color="secondary"
                                        >Edit</v-btn
                                    >
                                    <v-btn
                                        text
                                        small
                                        color="error"
                                        @click="toggleRemoveEmployeDialog(item)"
                                        >Remove</v-btn
                                    >
                                </template>
                            </v-data-table>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </v-card>
        <v-card class="mt-2">
            <v-card-title primary-title>
                Notes
            </v-card-title>
            <v-card-text>
                <notes-list />
                <create-notes @note-created="requestNotes()" :Project="Project" />
            </v-card-text>
        </v-card>
        <delete-dialog
            title="Remove"
            message="Are you sure you want to remove this employee?"
            buttonLabelConfirm="Remove it"
            buttonLabelCancel="No, keep it"
            :show-dialog="showRemoveEmployeDialog"
            @confirm-delete="confirmRemoveEmploye()"
            @cancel-delete="showRemoveEmployeDialog = false"
        />        
        <v-dialog v-model="editProjectDialog" max-width="400">
            <v-card>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-icon
                        class="float-right"
                        @click="editProjectDialog = false"
                        >fa-window-close</v-icon
                    >
                </v-card-title>
                <v-card-text>
                    <edit-Project
                        @Project-updated="confirmProjectUpdated()"
                        :Project="tempProjectForEdit"
                    />
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import deleteDialog from '@/components/Interface/DeleteDialog';
import notesList from '@/components/Projects/Notes/List';
import createNotes from '@/components/Projects/Notes/Create';
import moment from 'moment';

export default {
    components: {
        deleteDialog,                
        notesList,
        createNotes,
        editProject
    },
    async mounted() {        
        await this.requestProject();        
        this.requestNotes();
    },
    data() {
        return {
            Project: {},
            tab: null,
            InvestorsHeaderTable: [
                { text: 'First Name', value: 'first_name' },
                { text: 'Last Name', value: 'last_name' },
                { text: 'Email', value: 'email' },
                { text: 'Actions', value: 'actions' }
            ],
            showRemoveEmployeDialog: false,            
            tempEmployeForRemove: {},            
            editProjectDialog: false,
            tempProjectForEdit: ''
        };
    },
    methods: {
        toggleRemoveEmployeDialog(employee) {
            this.showRemoveEmployeDialog = true;
            this.tempEmployeForRemove = employee;
        },
        showEditProjectDialog() {
            this.tempProjectForEdit = this.Project;
            this.editProjectDialog = true;
        },
        confirmRemoveEmploye() {
            this.showRemoveEmployeDialog = false;
            this.$store
                .dispatch('Projects/deleteAssignedEmployee', {
                    idProject: this.Project.id_Project,
                    idEmployee: this.tempEmployeForRemove.id_employee
                })
                .then(response => {
                    this.$store.commit('snackbar/setSnackbar', {
                        show: true,
                        message: 'Employee remove',
                        color: 'success',
                        top: true
                    });
                    this.requestProject();
                })
                .catch(error => {
                    console.log(error);
                });
        },        
        async requestProject() {
            return this.$store
                .dispatch('Projects/getById', this.$route.params.id)
                .then(response => {
                    this.Project = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },        
        deleteProject() {
            let request = confirm('Are you sure you want delete this Project ?');
            if (request) {
                this.$store
                    .dispatch('Projects/delete', this.Project.id_Project)
                    .then(response => {
                        this.$router.push('/Projects/list');
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        },
        parseTimeStamp(timeStamp, format) {
            return moment(timeStamp).format(format);
        },
        requestNotes() {
            this.$store
                .dispatch('notes/get')
                .then(response => {
                    this.$store.commit('notes/SET_NOTES', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        confirmProjectUpdated(){
            this.requestProject()
            this.editProjectDialog = false
        }
    }
};
</script>