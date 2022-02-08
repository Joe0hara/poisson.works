<template>
	<header>
		<v-app-bar dark flat>

			<v-app-bar-nav-icon v-on:click="drawer = !drawer" class="d-md-none"></v-app-bar-nav-icon>

			<v-toolbar-title>poisson.work</v-toolbar-title>

			<v-tabs right>
				<v-tabs-slider color="rgba(0,0,0,0)"></v-tabs-slider>
				<v-tab class="d-none d-md-flex" active-class="active_tab" v-for="(menu, index) in menuList" :key="index" :to=menu.link>
					{{ menu.title }}
				</v-tab>
			</v-tabs>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" fixed temporary>
			<v-list nav dense>
				<v-list-item-group>
					<v-list-item v-for="(menu, index) in menuList" :key="index" :to=menu.link>
						<v-list-item-title>{{ menu.title }}</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>

  </header>
</template>

<script>
import {createClient} from '~/plugins/contentful.js'
const client = createClient()

export default {
	data() {
		return {
			drawer: false,
			menuList: [],
		}
	},
	async fetch (){
		const pagelist = await client.getEntries({
			content_type: "page",
			order: "sys.createdAt",
		})
		const menuList = []
		pagelist.items.forEach(page => {
			const menu = new Object()
			menu.title = page.fields.title
			menu.link = '/' + page.fields.slug
			if (page.fields.slug == 'home') {
				menu.link = '/'
			}
			menuList.push(menu)
		});
		this.menuList = menuList
	},
}
</script>

<style lang="scss" scoped>
.v-toolbar__title {
  overflow: visible !important;
  margin-right: 50px !important;
}
.active_tab{
	color: rgb(255,255,255) !important;
}
</style>