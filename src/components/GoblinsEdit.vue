<template>
	<div class="pa-16">
		<center>
			<h1 class="font-color">
				<v-icon color="grey darken-2" x-large>
					mdi-emoticon-devil
				</v-icon>
				Goblin Editor
				<v-icon color="grey darken-2" x-large>
					mdi-emoticon-devil
				</v-icon>
			</h1>
		</center>
		<v-divider class="title pa-5" style="border-top: 1px solid #757575">
		</v-divider>
		<validation-observer ref="observer" v-slot="{ invalid }">
			<form @submit.prevent="submit">
				<validation-provider v-slot="{ errors }" name="Name" rules="max:15">
					<v-text-field v-model="name" :counter="15" :error-messages="errors"
						label="New Goblin Name"></v-text-field>
				</validation-provider>
				<validation-provider v-slot="{ errors }" name="Age" rules="max:15">
					<v-text-field v-model="age" :counter="15" :error-messages="errors"
						label="New Goblin Age"></v-text-field>
				</validation-provider>
				<validation-provider v-slot="{ errors }" name="Role" rules="max:15">
					<v-text-field v-model="role" :counter="15" :error-messages="errors" label="New Role"></v-text-field>
				</validation-provider>
				<validation-provider v-slot="{ errors }" name="Salary" rules="max:15">
					<v-text-field v-model="salary" :counter="15" :error-messages="errors"
						label="New Salary" :disabled="!validPassword"></v-text-field>
				</validation-provider>
				<validation-provider v-slot="{ errors }" name="Comment" rules="max:30">
					<v-text-field v-model="comment" :counter="30" :error-messages="errors"
						label="Add Comment" :disabled="!validPassword"></v-text-field>
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
			</form>
				<v-form @submit.prevent="submitPassword" class="pa-10">
					<v-container fluid>
						<v-row class="center-password">
							<v-col cols="12" sm="6">
								<v-text-field v-model="password" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
									:rules="validSubmit? [rules.success] : [rules.required]" :type="show1 ? 'text' : 'password'"
									name="input-10-1" label="Manager Password"
									@click:append="show1 = !show1" :disabled="validPassword"></v-text-field>
							</v-col>
						</v-row>
					</v-container>
					<center class="pt-3">
						<v-btn class="mr-4" type="submit" :disabled="!password || validPassword" @click="submitPassword" rounded>
							<v-icon color="grey darken-2" large>
								mdi-bottle-tonic</v-icon>
						</v-btn>
					</center>
				</v-form>
		</validation-observer>
		<v-divider></v-divider>
		<v-list two-line>

			<v-list-item class="ma-8">

				<v-list-item-avatar>
					<v-icon class="grey darken-2" dark>
						mdi-anvil
					</v-icon>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title v-text="goblin.goblinName"></v-list-item-title>
					<v-list-item-subtitle v-text="'SECTION: ' + goblin.clubSection"></v-list-item-subtitle>
					<v-list-item-subtitle v-text="'AGE: ' + goblin.age"></v-list-item-subtitle>
					<v-list-item-subtitle v-text="'ROLE: ' + goblin.role"></v-list-item-subtitle>
					<v-list-item-subtitle v-if="validPassword" v-text="'SALARY: ' + goblin.salary"></v-list-item-subtitle>
					<v-list-item-subtitle v-if="validPassword" v-text="'COMMENT: ' + goblin.comment"></v-list-item-subtitle>
					<v-divider></v-divider>
				</v-list-item-content>

			</v-list-item>
		</v-list>
		<center>
			<v-btn rounded class="mr-4" @click="goToGoblins">
				<v-icon color="grey darken-2" large>
					mdi-arrow-projectile-multiple</v-icon>
			</v-btn>
		</center>

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
	components: {
		ValidationProvider,
		ValidationObserver,
	},
	data() {
		let index = parseInt(this.$route.params.index)
		let gindex = parseInt(this.$route.params.gindex)
		return {
			sections: [],
			section: {},
			goblin: [],
			select: null,
			name: '',
			age: '',
			role: '',
			salary: '',
			comment: '',
			sectionIndex: index,
			goblinIndex: gindex,
			show1: false,
			validPassword: false,
			validSubmit: false,
			expectedPassword: 'goblin',
			password: '',
			rules: {
				required: value => !!value || 'Incorrect Manager Password',
				success: () =>   this.validSubmit && 'Success.',
				passwordMatch: () => (`The Goblin Master password you entered don't match`),
			},
		}
	},

	methods: {
		submitPassword() {
			if (this.password === this.expectedPassword) {
				this.validPassword = true;
				this.validSubmit = true;
				this.password = ''
			} else {
				this.validSubmit = false;				
				this.password = ''
			}
		},
		submit() {
			this.$refs.observer.reset()
			if (this.name || this.age || this.role || this.salary || this.comment) {
				this.createSection();
				this.clear();
			} else {
				this.$refs.observer.validate()
			}
		},
		createSection() {
			if (this.name) {
				this.goblin.goblinName = this.name
			} if (this.age) {
				this.goblin.age = this.age
			} if (this.role) {
				this.goblin.role = this.role
			} if (this.salary) {
				this.goblin.salary = this.salary
			} if (this.comment) {
				this.goblin.comment = this.comment
			}
			this.saveSection()
		},
		clear() {
			this.$refs.observer.reset()
			this.name = '';
			this.age = '';
			this.role = '';
			this.salary = '';
			this.comment = '';
		},
		saveSection() {
			localStorage.setItem('sections', JSON.stringify(this.sections))
		},
		goToGoblins() {
			this.$router.push({ name: "goblins" })
			this.validPassword = false
		}
	},

	mounted() {
		if (localStorage.getItem('sections')) {
			this.sections = JSON.parse(localStorage.getItem('sections'));
			this.section = this.sections[this.sectionIndex];
			this.goblin = this.section.goblins[this.goblinIndex];
		}
	},
}
</script>

<style>
.center-password {
	padding-left: 35%;
}
</style>