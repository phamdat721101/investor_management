<template>
    <div>
        <v-card>
            <v-card-title primary-title>
                Project creation
            </v-card-title>
            <v-card-text>
                <v-form ref="ProjectCreationForm">
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                outlined
                                name="name"
                                label="name"
                                id="name"
                                v-model="Project.name"
                                :rules="rules.requiredInput"
                            ></v-text-field>
                            <v-text-field
                                outlined
                                name="price"
                                label="price"
                                id="price"
                                v-model="Project.price"
                                :rules="rules.requiredInput"
                            ></v-text-field>
                            <p>The Project status is "OPEN" by default.</p>
                        </v-col>
                        <v-col cols="12">
                            <v-textarea                                
                                outlined
                                name="description"
                                label="description"    
                                id="description"
                                v-model="Project.description"                           
                            ></v-textarea>
                        </v-col>
                        <v-col cols="12">
                            <v-btn
                                color="success"
                                :loading="loadingCreation"
                                class="mr-5"
                                @click="createProject()"
                            >
                                Save
                            </v-btn>

                            <v-btn color="error" :loading="loadingCreation">
                                Cancel
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import formRules from '@/mixins/Miscellany/FormRules';

export default {
    mounted() {
        this.loadingInvestors = true;
        this.$store
            .dispatch('Investors/get')
            .then(response => {
                this.loadingInvestors = false;
                this.$store.commit('Investors/SET_Investors', response.data);
            })
            .catch(error => {
                console.log(error);
            });
    },
    mixins: [formRules],
    data() {
        return {            
            Project: {
                name: '', 
                price: '',               
                description: ''
            },            
            loadingCreation: false
        };
    },
    methods: {
        createProject() {
            if (!this.$refs.ProjectCreationForm.validate()) {
                if(this.Project.Investors.length === 0){
                    this.$store.commit('snackbar/setSnackbar', {
                        show: true,
                        message: 'Please select a employee',
                        color: 'error',
                        top: true
                    });
                }
                return false;
            }
            this.loadingCreation = true;
            this.$store
                .dispatch('Projects/create', this.Project)
                .then(response => {
                    this.$router.push('/Projects/list');
                }).catch(error=>{
                    console.log(error);
                    this.loadingCreation = false
                    this.$store.commit('snackbar/setSnackbar', {
                        show: true,
                        message: 'Opss, an error ocurred, please try again later',
                        color: 'error',
                        top: true
                    });
                })
        }
    }
};
</script>