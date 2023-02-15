<template>
    <div class="pa-16">
        <center>
            <h1 class="font-color">
                <v-icon color="grey darken-2" x-large>
                    mdi-bat
                </v-icon>
                Den
                <v-icon color="grey darken-2" x-large>
                    mdi-bat
                </v-icon>
            </h1>
        </center>
        
        <v-divider style="border-top: 1px solid #757575"></v-divider>
        
        <div class="scrollable-frame">
            <v-list two-line>
                <v-list-item v-for="section, index in sections" :key="index" class="ma-8">
                    
                    <v-list-item-avatar>
                        <v-icon class="grey darken-2" dark>
                            mdi-anvil
                        </v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-text="section.sectionName"></v-list-item-title>
                        <v-list-item-subtitle v-text="'MANAGER: ' + section.manager"></v-list-item-subtitle>
                        <v-divider></v-divider>
                    </v-list-item-content>

                    <v-list-item-action>
                        <v-btn rounded class="mr-4" @click="spySection(index)">
                            <v-icon :color="sectionButtons[index].iconColorState" large>
                                {{ sectionButtons[index].iconState }}
                            </v-icon>
                        </v-btn>
                    </v-list-item-action>

                </v-list-item>
            </v-list>
        </div>

        <v-divider style="border-top: 1px solid #757575"></v-divider>

        <v-list v-if="selectedSection.length === 1" two-line class="ma-8">
            <v-list-item v-for="goblin, gindex in liveSection.goblins" :key="gindex">
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
            </v-list-item>
        </v-list>
        <center>
            <img src="@/assets/goblin.gif" class="ma-16">
        </center>
    </div>
</template>

<script>
export default {
    data: () => ({
        sections: [],
        sectionButtons: [
            {spyState: false, iconState: 'mdi-cctv', iconColorState: 'grey darken-2'},
            {spyState: false, iconState: 'mdi-cctv', iconColorState: 'grey darken-2'},
            {spyState: false, iconState: 'mdi-cctv', iconColorState: 'grey darken-2'},
            {spyState: false, iconState: 'mdi-cctv', iconColorState: 'grey darken-2'},
            {spyState: false, iconState: 'mdi-cctv', iconColorState: 'grey darken-2'},
            {spyState: false, iconState: 'mdi-cctv', iconColorState: 'grey darken-2'},
        ],
        iconColorON: 'grey darken-2',
        iconColorOFF: 'red darken-4',
        iconON: 'mdi-cctv',
        iconOFF: 'mdi-cctv-off',
        selectedSection: [],
        liveSection: null
    }),
    mounted() {
        if (localStorage.getItem('sections')) {
            this.sections = JSON.parse(localStorage.getItem('sections'));
            console.log(JSON.stringify(this.sections))
        }
    },
    methods: {
        spySection(index) {
            
            const selectedIndex = this.selectedSection.indexOf(index);
            this.liveSection = this.sections[index];
            if (selectedIndex === -1) {
                this.selectedSection.push(index);
                this.sectionButtons[index].iconState = this.iconOFF;
                this.sectionButtons[index].iconColorState = this.iconColorOFF;
                this.sectionButtons[index].spyState = true;
            } else {
                this.selectedSection.splice(selectedIndex, 1);
                this.sectionButtons[index].iconState = this.iconON;
                this.sectionButtons[index].iconColorState = this.iconColorON;
                this.sectionButtons[index].spyState = false;
            }
        }
        
        // this.selectedSection = this.sections[index];
        // const selectedIndex = this.selectedSection.indexOf(index);
        // if (selectedIndex !== -1) {
        //     this.selectedSection.push(index);
            
        //     this.sectionButtons[index].iconState = this.iconOFF;
        //     this.sectionButtons[index].iconColorState = this.iconColorOFF;
        //     this.sectionButtons[index].spyState = true;
            
        // } else {
        //     this.selectedSection = null;
            
        //     this.sectionButtons[index].iconState = this.iconON;
        //     this.sectionButtons[index].iconColorState = this.iconColorON;
        //     this.sectionButtons[index].spyState = false
        // }
    }
}
</script>

<style>
.scrollable-frame {
    height: 367px;
    overflow-y: scroll;
}

.divider-color {
    border: black;
}

.font-color {
    color: #616161;
}
</style>