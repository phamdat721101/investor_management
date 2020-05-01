<template>
    <div>
        <v-card>
            <v-card-title class="headline">
                Create investor
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-form ref="createEmployeeForm">
                            <v-text-field
                                v-model="employee.name"
                                outlined
                                name="name"
                                label="name"
                                id="name"
                                :rules="rules.requiredInput"
                            ></v-text-field>                           
                            <v-text-field
                                v-model="employee.projectId"
                                outlined
                                name="projectId"
                                label="projectId"
                                id="projectId"
                                :rules="rules.requiredInput"
                            ></v-text-field>                             
                            <v-text-field
                                v-model="employee.investmentPercentage"
                                outlined
                                name="investmentPercentage"
                                label="investmentPercentage"
                                id="investmentPercentage"
                                :rules="rules.requiredInput"
                            ></v-text-field>
                        </v-form>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn color="success" :loading="loading" @click="create()">
                    Save
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    color="error"
                    :loading="loading"
                    @click="$emit('cancel-creation')"
                >
                    Cancel
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>
<script>
import FormRules from '@/mixins/Miscellany/FormRules';

export default {
    mixins: [FormRules],
    data() {
        return {
            status: ['active', 'inactive'],
            employee: {
                name: '',                
                projectId: '',                
                investmentPercentage: ''
            },
            loading: false
        };
    },
    methods: {
        create() {
            if (this.$refs.createEmployeeForm.validate()) {
                this.loading = true;
                this.$store
                    .dispatch('Investors/create', this.employee)
                    .then(response => {                        
                        this.$emit('confirm-creation');
                    })
                    .catch(error => {                        
                        console.log(error);
                    }).finally(()=>{
                        this.loading = false
                    })
            }
        }
    }
};
</script>