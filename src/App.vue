<template>
	<v-app id="inspire">
		<v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" permanent app dark>
			<v-list-item class="px-2">
				<v-list-item-avatar>
					<v-img src="@/assets/gcmlogo.jpeg"></v-img>
				</v-list-item-avatar>

				<v-list-item-title>The Manager</v-list-item-title>

				<v-btn icon @click.stop="mini = !mini">
					<v-icon>mdi-arrow-projectile-multiple</v-icon>
				</v-btn>
			</v-list-item>

			<v-divider></v-divider>

			<v-list dense>
				<v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<v-main>
			<router-view />
		</v-main>
	</v-app>
</template>

<script>
export default {
	name: 'App',
	data() {
		return {
			drawer: true,
			items: [
				{ title: 'Den', icon: 'mdi-bat', to: '/' },
				{ title: 'Sections', icon: 'mdi-axe', to: '/club-manager' },
				{ title: 'Goblins', icon: 'mdi-emoticon-devil', to: '/goblins' },
			],
			mini: true,
		};
	},
};
</script>

<style>
*,
html,
body {
	font-family: monospace, sans-serif;
}
</style>
