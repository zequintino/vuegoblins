<template>
	<div class="pa-16">
		<center>
			<h1 class="font-color">
				<v-icon color="grey darken-2" x-large>
					mdi-axe
				</v-icon>
				Section Editor
				<v-icon color="grey darken-2" x-large>
					mdi-axe
				</v-icon>
			</h1>
		</center>
		<v-divider class="title pa-5" style="border-top: 1px solid #757575">
		</v-divider>
		<validation-observer ref="observer" v-slot="{ invalid }">
			<form @submit.prevent="submit">
				<validation-provider v-slot="{ errors }" name="Name" rules="required|max:15">
					<v-text-field v-model="name" :counter="15" :error-messages="errors"
						label="New Manager Name"></v-text-field>
				</validation-provider>
				<center class="pt-7">
					<v-btn :disabled="invalid" class="mr-4" type="submit" @click="submit()" rounded>
						<v-icon color="grey darken-2" large>
							mdi-bottle-tonic</v-icon>
					</v-btn>
					<v-btn @click="clear()" rounded>
						<v-icon color="grey darken-2" large>
							mdi-bottle-tonic-outline</v-icon>
					</v-btn>
				</center>

			</form>
		</validation-observer>

		<v-list two-line>

			<v-list-item class="ma-8">
				<v-list-item-avatar>
					<v-icon class="grey darken-2" dark>
						mdi-anvil
					</v-icon>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title v-text="section.sectionName"></v-list-item-title>

					<v-list-item-subtitle v-text="'Manager: ' + section.manager"></v-list-item-subtitle>
					<v-divider></v-divider>
				</v-list-item-content>

			</v-list-item>
			<center>
				<v-btn rounded class="mr-4" @click="goToClubManager()">
					<v-icon color="grey darken-2" large>
						mdi-arrow-projectile-multiple</v-icon>
				</v-btn>
			</center>
		</v-list>

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
		let index = parseInt(this.$route.params.index)
		return {
			roles: [
				'Den\'s Bar',
				'Cave\'s Bar',
				'DJ\'s',
				'VJ\'s',
			],
			sections: [],
			section: {},
			select: null,
			name: '',
			sectionIndex: index,
		}
	},

	methods: {
		submit() {
			this.$refs.observer.reset()
			if (this.name) {
				this.createSection();
				this.clear();
			}
			// else {
			//   this.$refs.observer.validate()
			// }
		},
		createSection() {
			this.section.manager = this.name;
			this.saveSection()
		},
		clear() {
			this.$refs.observer.reset()
			this.name = '';
		},
		saveSection() {
			localStorage.setItem('sections', JSON.stringify(this.sections))
		},
		editSection(index) {
			console.log(index);
			this.$router.push({ name: "section-manager", params: { index: index } });
		},
		goToClubManager() {
			this.$router.push({ name: "manager" })
		}
	},

	mounted() {
		if (localStorage.getItem('sections')) {
			console.log(this.sectionIndex)
			this.sections = JSON.parse(localStorage.getItem('sections'));
			this.section = this.sections[this.sectionIndex];
			console.log(this.section)
		}
	},
}
</script>