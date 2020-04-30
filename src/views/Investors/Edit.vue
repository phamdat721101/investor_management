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
                            <v-text-field
                                v-model="profit.pid"
                                outlined
                                name="pid"
                                label="Project"
                                id="pid"
                                :rules="rules.requiredInput"
                            ></v-text-field>
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
            this.loading = true;
            this.$store
                .dispatch('Investors/getById', this.$route.params.id)
                .then(response => {
                    this.employee.first_name = response.data.first_name;
                    this.employee.last_name = response.data.last_name;
                    this.employee.email = response.data.email;                    
                })
                .finally(() => {
                    this.loading = false;
                });
        }
    }
};
</script>