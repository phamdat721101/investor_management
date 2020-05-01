<template>
    <div>
        <v-card :loading="loading">
            <v-card-title class="headline">
                Update investment
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-form ref="createEmployeeForm">
                            <v-select
                                v-model="profit.pid"
                                :rules="rules.requiredInput"
                                outlined
                                :items="project"
                                label="Project"
                            ></v-select>
                            <v-text-field
                                v-model="profit.amount"
                                :rules="rules.requiredInput"
                                outlined
                                name="amount"
                                label="Amount"
                                id="amount"
                            ></v-text-field>
                            <v-text-field
                                v-model="profit.date"                                
                                outlined
                                type="date"
                                name="date"
                                label="Date"
                                id="date"
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
    mounted() {
        this.requestInvestors();
    },
    data() {
        return {         
            project:[1,2],  
            profit: {
                pid: '',
                amount: '',
                date: ''                
            },
            loading: false
        };
    },
    methods: {
        create() {
            if (this.$refs.createEmployeeForm.validate()) {
                this.loading = true;
                this.$store
                    .dispatch('Investors/profit', this.profit)
                    .then(response => {
                        this.$router.push('/Investors/list');                        
                    })
                    .catch(error => {                        
                        console.log(error);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
        requestInvestors() {
            //this.loading = true;            
            this.$store
                .dispatch('Projects/get')
                .then(response => {                    
                    this.project = response.data.map(dt => {return dt.id});
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
};
</script>