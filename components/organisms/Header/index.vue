<template>
	<header>
		<v-app-bar app dark>

			<v-app-bar-nav-icon v-on:click="drawer = !drawer"></v-app-bar-nav-icon>

			<v-toolbar-title>poisson.work</v-toolbar-title>

			<v-tabs right>
				<v-tab v-for="(menu, index) in menuList" :key="index" :to=menu.link>
					{{ menu.name }}
				</v-tab>
			</v-tabs>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" fixed temporary>
			<v-list nav dense>
				<v-list-item-group>
					<v-list-item v-for="(menu, index) in menuList" :key="index" :to=menu.link>
						<v-list-item-title>{{ menu.name }}</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>

  </header>
</template>

<script>

export default {

	data() {
		return {
			drawer: false,
			menuList: [{
				name: 'HOME',
				link: '/'
			},
			{
				name: 'ABOUT',
				link: '/about'
			},
			]
		}
	},
	methods: {

	}
}
</script>

<style lang="scss" scoped>
.v-toolbar__title {
  overflow: visible !important;
  margin-right: 50px !important;
}
.v-app-bar__nav-icon {
  @include display_pc {
    display: none !important;
  }
}
.v-tabs {
  display: none;

  @include display_pc {
    display: block !important;
  }
}
</style>