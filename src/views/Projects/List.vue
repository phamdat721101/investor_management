<template>
    <div>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-btn
                            class="float-right"
                            color="primary"
                            to="/Projects/create"
                            >Create Project</v-btn
                        >
                    </v-col>
                    <v-col cols="12">
                        <v-data-table
                            :headers="headers"
                            :items="$store.getters['Projects/getProjects']"
                            :items-per-page="5"
                        >
                            <template v-slot:item.create_at="{ item }">
                                {{ parseDate(item.create_at) }}
                            </template>
                            <template v-slot:item.actions="{ item }">                                                                
                                <v-btn
                                    text
                                    small
                                    color="secondary"
                                    @click="showEditProjectDialog(item)"
                                    >Edit</v-btn
                                >
                                <v-btn
                                    text
                                    small
                                    color="error"
                                    @click="toggleDeleteDialog(item)"
                                    >Delete</v-btn
                                >
                            </template>
                        </v-data-table></v-col
                    >
                </v-row>
            </v-card-text>
        </v-card>
        <delete-dialog
            title="Delete"
            message="Are you sure you want to delete this Project?"
            buttonLabelConfirm="Delete"
            buttonLabelCancel="No, keep it"
            :show-dialog="showDeleteDialog"
            @confirm-delete="deleteProject()"
            @cancel-delete="showDeleteDialog = false"
        />
        <v-dialog v-model="addNotedialog" max-width="400">
            <v-card>
                <v-card-title>
                    <v-spacer></v-spacer>
                    <v-icon class="float-right" @click="addNotedialog = false"
                        >fa-window-close</v-icon
                    >
                </v-card-title>
                <v-card-text>
                    <create-notes
                        @note-created="addNotedialog = false"
                        :Project="TempProjectForAddNote"
                    />
                </v-card-text>
            </v-card>
        </v-dialog>
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
import createNotes from '@/components/Projects/Notes/Create';
import editProject from '@/components/Projects/Edit';
import moment from 'moment';

export default {
    components: { deleteDialog, createNotes, editProject },
    mounted() {
        this.requestProjects();
    },
    data() {
        return {
            headers: [                
                { text: 'Name', value: 'name' },
                { text: 'Price', value: 'price' },
                { text: 'Description', value: 'description' },                
                { text: 'Actions', value: 'actions' }
            ],
            showDeleteDialog: false,
            tempProjectToDelete: {},
            addNotedialog: false,
            TempProjectForAddNote: '',
            editProjectDialog: false,
            tempProjectForEdit: ''
        };
    },
    methods: {
        requestProjects() {
            this.$store
                .dispatch('Projects/get')
                .then(response => {
                    this.$store.commit('Projects/SET_ProjectS', response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        toggleDeleteDialog(Project) {
            this.tempProjectToDelete = Project;
            this.showDeleteDialog = true;
        },
        deleteProject() {
            this.$store
                .dispatch('Projects/delete', this.tempProjectToDelete.id_Project)
                .then(response => {
                    this.requestProjects();
                    this.showDeleteDialog = false;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        showAddNoteDialog(Project) {
            this.TempProjectForAddNote = Project;
            this.addNotedialog = true;
        },
        showEditProjectDialog(Project) {
            this.tempProjectForEdit = Project;
            this.editProjectDialog = true;
        },
        confirmProjectUpdated() {
            this.requestProjects()
            this.editProjectDialog = false;
        },
        parseDate(date) {
            return moment(date).format('DD/MM/YYYY');
        }
    }
};
</script>