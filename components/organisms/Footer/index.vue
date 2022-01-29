<template>
	<footer class="">
		<v-footer
				dark
				padless
				absolute
			>
			<!-- <v-row
				justify="center"
				no-gutters
			>
				<v-btn
					v-for="link in links"
					:key="link"
					color="white"
					text
					rounded
					class="my-2"
				>
					{{ link }}
				</v-btn>
				<v-col
					class="primary lighten-2 py-4 text-center white--text"
					cols="12"
				>
					{{ new Date().getFullYear() }} — <strong>Vuetify</strong>
				</v-col>
			</v-row> -->
		</v-footer>
	</footer>

</template>


<style lang="scss">
footer{
	width: 100%;
	height: 100px;
	margin-top: 50px;
}
</style>