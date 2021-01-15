<template>
	<div class="dropdown-menu">
		<nav class="menu-container">
			<transition name="fade">
				<ul class="menu" v-if="isOpen">
					<li class="menu-item" v-for="menu in menus" :key="menu.text">
						<nuxt-link :to="menu.link">{{menu.text}}</nuxt-link>
					</li>
				</ul>
			</transition>
		</nav>
	</div>
</template>

<script>
export default {
	props: ['isOpen'],
	data() {
		return {
			menus: [
				{ text: 'Top', link: '/'},
				{ text: 'About', link: '/about'},
				{ text: 'Works', link: '/works'},
				{ text: 'Prototype', link: '/prototype'},
				{ text: 'Tutorial', link: '/tutorial'},
			]
		}
	},
}
</script>

<style lang="scss">
.dropdown-menu{
	width: 100%;
	display: flex;
	.menu-container {
		margin: 0;
		width: 100%;
		.menu {
			position: relative;
			width: 100%;
			justify-content: space-between;
			margin: 0;
			padding: 0;
			z-index: 999;
			.menu-item {
				flex: 1;
				a {
					font-weight: bolder;
					transition: 0.5s;
					background: $primary-light;
					color: $border-color;
					display: block;
					padding: 0.6em 0.4em;
					text-align: center;
					text-decoration: none;
					border: none;
					// border-bottom: 1px solid $primary-lighter;
					// border-right: none;
					&:hover{
						background: $primary_color;
						color: $text_color;
					}
				}
			}
		}
	}
}
.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
</style>