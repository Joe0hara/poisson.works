<template>
	<header>
		<div class="header-left"></div>
		<div class="header-right">
			<HamburgerMenu  @click='HMBtnClick' />
		</div>
		<DropdownMenu :isOpen="isMenuOpen" />
	</header>
</template>

<script>
export default {
	data() {
		return {
			isMenuOpen: false,
		}
	},
	methods: {
		HMBtnClick: function(isOpen) {
			this.isMenuOpen = isOpen;
		}
	}
}
</script>

<style lang="scss">
header{
	width: 100%;
	height: 75px;
	background-color: #118077;
	.header-left{
		height: 100%;
		float: left;
	}
	.header-right{
		height: 100%;
		float: right;
	}

}
</style>