<template>
    <div></div>
</template>
<script>
export default {
    mounted() {
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('investors');
        this.$router.push('/auth/login');
    }
};
</script>