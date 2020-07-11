<template>
	<div>
		<Header />
		<MarkdownRender :markdownData="pageData.content" />
		<Footer />
	</div>

</template>

<script>
export default {
	data () {
		return {
			url: process.env.strapiBaseUri + '/pages/2',
			pageData: {
				content: ''
			},
		}
	},
	mounted () {
		this.$axios.$get(this.url)
		.then(response => (this.pageData = response))
	}
}
</script>

<style>

</style>
