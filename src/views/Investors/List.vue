<template>
    <div>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-btn
                            class="float-right"
                            color="primary"
                            @click="openCreationEmployeDialog()"
                            >Create Investor</v-btn
                        >
                    </v-col>
                    <v-col cols="12">
                        <v-data-table
                            :headers="headers"
                            :items="$store.getters['Investors/getInvestors']"
                            :items-per-page="5"
                        >
                            <template v-slot:item.create_at="{ item }">
                                {{ parseDate(item.create_at, 'DD/MM/YYYY') }}
                            </template>
                            <template v-slot:item.actions="{ item }">
                                <v-btn text small color="secondary" @click="openViewEmployeeInformationDialog(item)">View</v-btn>
                                <v-btn
                                    text
                                    small
                                    color="secondary"
                                    :to="{
                                        name: 'edit investor',
                                        params: { id: item.id_investor }
                                    }"
                                    >Update Profit</v-btn
                                >                                
                            </template>
                        </v-data-table>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
        <v-row justify="center">
            <v-dialog
                v-model="showCreationEmployeDialog"
                persistent
                max-width="500"
            >
                <maintenance-form-Investors
                    @cancel-creation="closeCreationEmployeDialog()"
                    @confirm-creation="confirmEmployeeCreation()"
                />
            </v-dialog>
        </v-row>
        <v-dialog
            v-model="viewInvestorDialog"
            max-width="600"
            transition="dialog-transition"
        >
            <view-employee-information @close-dialog="viewInvestorDialog = false" :investor="investor"/>
        </v-dialog>
    </div>
</template>
<script>
import MaintenanceFormInvestors from '@/components/Investors/MaintenanceForm';
import viewEmployeeInformation from '@/components/Investors/ViewEmployeeInformation';
import moment from 'moment';

export default {
    components: { MaintenanceFormInvestors, viewEmployeeInformation },
    mounted() {
        this.requestInvestors();
    },
    data() {
        return {
            headers: [                
                { text: 'Name', value: 'name' },
                { text: 'ProjectId', value: 'projectId' },
                { text: 'InvestmentPercentage', value: 'investmentPercentage' },                
                { text: 'Actions', value: 'actions', sortable: false }
            ],
            showCreationEmployeDialog: false,
            investor:{},
            viewInvestorDialog:false
        };
    },
    methods: {
        closeCreationEmployeDialog() {
            this.showCreationEmployeDialog = false;
        },
        openCreationEmployeDialog() {
            this.showCreationEmployeDialog = true;
        },
        openViewEmployeeInformationDialog(investor){                     
            this.investor = investor;
            this.viewInvestorDialog = true;
        },
        requestInvestors() {
            this.$store.dispatch('Investors/get').then(response => {
                this.$store.commit('Investors/SET_Investors', response.data);
            });
        },
        confirmEmployeeCreation() {
            this.showCreationEmployeDialog = false;
            this.requestInvestors();
        },
        parseDate(date, format) {
            return moment(date).format(format);
        }
    }
};
</script>