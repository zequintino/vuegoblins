import Vue from 'vue'
import VueRouter from 'vue-router'

import DenView from '@/views/DenView.vue'
import ManagerView from '@/views/ManagerView.vue'
import SectionManagerView from '@/views/SectionManagerView.vue'
import GoblinsView from '@/views/GoblinsView.vue'
import GoblinsEditorView from '@/views/GoblinsEditorView.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'den',
		component: DenView
	},
	{
		path: '/club-manager',
		name: 'manager',
		component: ManagerView
	},
	{
		path: '/club-manager/:index',
		name: 'section-manager',
		component: SectionManagerView
	},
	{
		path: '/goblins',
		name: 'goblins',
		component: GoblinsView
	},
	{
		path: '/goblins/:index:gindex',
		name: 'goblins-edit',
		component: GoblinsEditorView
	},
]

const router = new VueRouter({
	mode: 'history',
	routes
})

export default router
