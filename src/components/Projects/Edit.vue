<template>
    <div>
        <div>
            <p class="title">Edit Project# {{ Project.id_Project }}</p>
        </div>
        <v-select
            outlined
            :items="status"
            v-model="selectStatus"
            label="Status"
        ></v-select>
        <div>
            <v-btn
                :loading="loadingEdit"
                color="success"
                :disabled="selectStatus === ''"
                @click="saveEdit()"
                >Save</v-btn
            >
        </div>
    </div>
</template>
<script>
export default {
    props: ['Project'],
    data() {
        return {
            status: ['open', 'close', 'waiting the user'],
            selectStatus: '',
            loadingEdit: false
        };
    },
    methods: {
        saveEdit() {
            this.loadingEdit = true;
            this.$store
                .dispatch('Projects/patch', {
                    id_Project: this.Project.id_Project,
                    Project: { status: this.selectStatus }
                })
                .then(response => {
                    // this.$store.commit('snackbar/setSnackbar', {
                    //     show: true,
                    //     message: 'Project updated',
                    //     color: 'success',
                    //     top: true
                    // });
                    this.$emit('Project-updated')
                })
                .catch(error => {
                    console.log(error);
                })
                .finally(() => {
                    this.loadingEdit = false;
                });
        }
    }
};
</script>