<template>
	<div class="h-menu">
		<div class="menu-icon" v-on:click="onClick">
			<div class="menu-trigger" v-bind:class="{'opening': isOpen}">
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			isOpen: false,
		}
	},
	methods: {
		onClick: function (event) {
			this.isOpen = !this.isOpen;
			this.$emit('click', this.isOpen)
		}
	}

}
</script>

<style lang="scss">
.h-menu{
	width: 100%;
	height: 100%;
	display: flex;
}
.menu-icon{
	margin: auto 20px;
	width: 30px;
	height: 25px;
}
.menu-trigger,
.menu-trigger span {
	display: inline-block;
	transition: all .4s;
	box-sizing: border-box;
	cursor: pointer;
}
.menu-trigger {
	position: relative;
	width: 30px;
	height: 25px;
}
.menu-trigger span {
	position: absolute;
	right: 0;
	width: 100%;
	height: 4px;
	background-color: $border_color;
	border-radius: 4px;
}
.menu-trigger span:nth-of-type(1) {
	top: 0;
}
.menu-trigger span:nth-of-type(2) {
	top: 18px;
	top: 50%;
	left: 50%;
	-webkit-transform: translate3d(-50%, -50%, 0);
	transform: translate3d(-50%, -50%, 0);
}
.menu-trigger span:nth-of-type(3) {
	bottom: 0;
}
.menu-trigger span:nth-of-type(2)::after {
	position: absolute;
	top: 0;
	left: 0;
	content: '';
	width: 100%;
	height: 4px;
	background-color: $border_color;
	border-radius: 4px;
	transition: all .4s;
}
.menu-trigger.opening span:nth-of-type(2)::after {
	// position: absolute;
	// top: 0;
	// left: 0%;
	// content: '';
	// width: 100%;
	// height: 4px;
	// background-color: #000;
	// border-radius: 4px;
	transition: all .4s;
}
.menu-trigger.opening span:nth-of-type(1) {
	transform: translateY(20px) scale(0);
}
.menu-trigger.opening span:nth-of-type(2) {
	left: 0%;
	-webkit-transform: rotate(-45deg);
	transform: rotate(-45deg);
}
.menu-trigger.opening span:nth-of-type(2)::after {
	-webkit-transform: rotate(90deg);
	transform: rotate(90deg);
}
.menu-trigger.opening span:nth-of-type(3) {
	transform: translateY(-20px) scale(0);
}
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
				background-color: #fff;
				a {
					background: #fff;
					color: #333;
					display: block;
					padding: 0.6em 0.4em;
					text-align: center;
					text-decoration: none;
					border-bottom: 1px solid #ccc;
					border-right: none;
					&:hover{
						background: $primary_color;
						color: $text_color;
					}
				}
			}
		}
	}
}
</style>