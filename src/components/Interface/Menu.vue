<template>
    <div>
        <v-toolbar>
            <v-toolbar-items>
                <v-btn to="/Projects/list" text>Project</v-btn>
                <v-btn to="/Investors/list" text>Investor</v-btn>                
            </v-toolbar-items>
            <template v-if="$vuetify.breakpoint.smAndUp">
                <v-spacer></v-spacer>
                <v-menu offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn text v-on="on">
                            <v-icon class="mr-2">fa-user</v-icon>
                            Admin
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item>
                            <v-list-item-title
                                ><v-btn text to="/auth/logout"
                                    >Logout</v-btn
                                ></v-list-item-title
                            >
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>
        </v-toolbar>
    </div>
</template>
<script>
export default {};
</script>