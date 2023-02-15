<template>
	<div class="pa-16">
		<center>
			<h1 class="font-color">
				<v-icon color="grey darken-2" x-large>
					mdi-axe
				</v-icon>
				Sections
				<v-icon color="grey darken-2" x-large>
					mdi-axe
				</v-icon>
			</h1>
		</center>
		<v-divider class="title pa-5" style="border-top: 1px solid #757575"></v-divider>
		<validation-observer ref="observer" v-slot="{ invalid }">
			<form @submit.prevent="submit">
				<validation-provider v-slot="{ errors }" name="Name" rules="required|max:15">
					<v-text-field v-model="name" :counter="15" :error-messages="errors" label="Manager Name"
						required></v-text-field>
				</validation-provider>
				<validation-provider v-slot="{ errors }" name="select" rules="required">
					<v-select v-model="select" :items="roles" :error-messages="errors" label="Club Section"
						data-vv-name="select" required :disabled="!name">
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

				<v-list two-line>

					<v-list-item v-for="section, index in sections" :key="index" class="ma-8">
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

						<v-list-item-action>
							<div>
								<v-btn rounded class="mr-4" @click="editSection(index)">
									<v-icon color="grey darken-2" large>
										mdi-bottle-tonic-plus</v-icon>
								</v-btn>
								<v-btn rounded @click="deleteSection(index)">
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
			roles: [
				'DJ\'s',
				'VJ\'s',
				'Tower\'s Bar',
				'Den\'s Bar',
				'Cave\'s Bar',
				'Phill Gobllins',
			],
			sections: [],
			select: null,
			name: ''
		}
	},

	methods: {
		submit() {
			if (this.$refs.observer.validate() && (this.name && this.select)) {
				this.createSection();
			}
		},
		clear() {
			this.$refs.observer.reset()
			this.name = '';
			this.select = null;
		},
		createSection() {
			this.roles = this.roles.filter(role => role !== this.select);
			this.sections.push({
				manager: this.name,
				sectionName: this.select,
				goblins: [],
				key: this.index
			});
			this.name = '';
			this.select = null;
			this.$refs.observer.reset();
			this.saveSection()
		},
		editSection(index) {
			console.log(index);
			this.$router.push({ name: "section-manager", params: { index: index } });
		},
		deleteSection(index) {
			this.roles.push(this.sections[index].sectionName)
			this.sections.splice(index, 1);
			this.saveSection()
		},
		saveSection() {
			console.log(JSON.stringify(this.sections));
			console.log(JSON.stringify(this.roles));
			localStorage.setItem('sections', JSON.stringify(this.sections))
			localStorage.setItem('roles', JSON.stringify(this.roles))
		},
	},

	mounted() {
		if (localStorage.getItem('sections')) {
			this.sections = JSON.parse(localStorage.getItem('sections'));
			console.log(JSON.stringify(this.sections))
		};
		if (localStorage.getItem('roles')) {
			this.roles = JSON.parse(localStorage.getItem('roles'));
			console.log(JSON.stringify(this.roles))
		};
	},
}
</script>