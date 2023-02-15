<template>
    <div class="pa-16">
        <center>
            <h1 class="font-color">
                <v-icon color="grey darken-2" x-large>
                    mdi-emoticon-devil
                </v-icon>
                Goblins
                <v-icon color="grey darken-2" x-large>
                    mdi-emoticon-devil
                </v-icon>
            </h1>
        </center>
        <v-divider class="title pa-5" style="border-top: 1px solid #757575"></v-divider>
        <validation-observer ref="observer" v-slot="{ invalid }">
            <form @submit.prevent="submit">
                <validation-provider v-slot="{ errors }" name="Name" rules="required|max:15">
                    <v-text-field v-model="name" :counter="15" :error-messages="errors" label="Goblin Name"
                        required></v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="Age" rules="required|max:15">
                    <v-text-field v-model="age" :counter="15" :error-messages="errors" label="Goblin Age"
                        required :disabled="!name"></v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="Role" rules="required|max:15">
                    <v-text-field v-model="role" :counter="15" :error-messages="errors" label="Role"
                        required :disabled="!name"></v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="Salary" rules="required|max:15">
                    <v-text-field v-model="salary" :counter="15" :error-messages="errors" label="Salary"
                        required :disabled="!name || !role"></v-text-field>
                </validation-provider>
                <validation-provider v-slot="{ errors }" name="select" rules="required">
                    <v-select v-model="clubSection" :items="sections.map(section => section.sectionName)"
                        :error-messages="errors" label="Club Section" data-vv-name="select" required
                        :disabled="!salary || !name || !role">
                    </v-select>
                </validation-provider>
                <center class="pt-7">
                    <v-btn class="mr-4" type="submit" :disabled="invalid" @click="submit()" rounded>
                        <v-icon color="grey darken-2" large>
                            mdi-bottle-tonic</v-icon>
                    </v-btn>
                    <v-btn @click="clear()" rounded>
                        <v-icon color="grey darken-2" large>
                            mdi-bottle-tonic-outline</v-icon>
                    </v-btn>
                </center>

                <v-list two-line v-for="section, index in sections" :key="index" v-if="section.goblins.length > 0" class="ma-8">
                    <v-list-item v-for="goblin, gindex in section.goblins"  :key="gindex">
                        <v-list-item-avatar>
                            <v-icon class="grey darken-2" dark>
                                mdi-anvil
                            </v-icon>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-text="goblin.goblinName"></v-list-item-title>
                            <v-list-item-subtitle v-text="'SECTION: ' + goblin.clubSection"></v-list-item-subtitle>
                            <v-list-item-subtitle v-text="'ROLE: ' + goblin.role"></v-list-item-subtitle>
                            <v-divider></v-divider>
                        </v-list-item-content>
                        <v-list-item-action>
                            <div>
                                <v-btn rounded class="mr-4" @click="editSection(index, gindex)">
                                    <v-icon color="grey darken-2" large>
                                        mdi-bottle-tonic-plus</v-icon>
                                </v-btn>
                                <v-btn rounded @click="deleteGoblin(index, gindex)">
                                    <v-icon color="grey darken-2" large>
                                        mdi-bottle-tonic-skull</v-icon>
                                </v-btn>
                            </div>
                        </v-list-item-action>
                    </v-list-item>
                </v-list>

            </form>
        </validation-observer>

    </div>

</template>

<script>
import { required, max } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('eager')

extend('required', {
    ...required,
    message: '{_field_} can not be empty',
})

extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
})

export default {
    appname: 'SectionForm',
    components: {
        ValidationProvider,
        ValidationObserver,
    },
    data() {
        return {
            name: '',
            age: '',
            role: '',
            salary: '',
            clubSection: '',
            comment: '',
            sections: [],
            roles: [
                'Den\'s Bar',
                'Cave\'s Bar',
                'DJ\'s',
                'VJ\'s',
            ],
            select: null,
        }
    },

    methods: {
        submit() {
            if (this.$refs.observer.validate() && (this.name && this.role && this.salary && this.clubSection)) {
                this.createSection();
            }
        },
        clear() {
            this.name = '';
            this.age = '';
            this.role = '';
            this.salary = '';
            this.select = null;
            this.$refs.observer.reset()
        },
        createSection() {
            const selectedIndex = this.sections.findIndex(section => section.sectionName === this.clubSection);
            if (selectedIndex !== -1) {
                this.sections[selectedIndex].goblins.push({
                    goblinName: this.name,
                    age: this.age,
                    role: this.role,
                    salary: this.salary,
                    clubSection: this.clubSection,
                    comment: this.comment,
                    key: this.gindex
                });
            }
            this.name = '';
            this.age = '';
            this.role = '';
            this.salary = '';
            this.clubSection = '';
            this.select = null;
            this.$refs.observer.reset();
            this.saveSection()
        },

        deleteGoblin(index, gindex) {
            this.sections[index].goblins.splice(gindex, 1);
            this.saveSection()
        },
        saveSection() {
            console.log(JSON.stringify(this.sections.goblins));
            localStorage.setItem('sections', JSON.stringify(this.sections))
        },
        editSection(index, gindex) {
            console.log("hello");
            this.$router.push({ name: "goblins-edit", params: { index: index, gindex: gindex } })
        },
    },

    mounted() {
        if (localStorage.getItem('sections')) {
            this.sections = JSON.parse(localStorage.getItem('sections'));
            console.log(JSON.stringify(this.sections))
        }
    },
}
</script>