<template>
	<div class="markdown_container">
		<div v-html="$md.render(changed_post_content)"></div>
	</div>
</template>

<script>
export default {
	props: ['markdownData'],
	computed:{
		changed_post_content : function () {
			return this.markdownData.split('/uploads/').join(process.env.strapiBaseUri+'/uploads/');
		}
	},
}
</script>

<style lang="scss">
.markdown_container{
	width: 80%;
	min-width: 300px;
	max-width: 750px;
	margin: 0 auto;

	img{
		max-width: 100%;
	}
}
</style>