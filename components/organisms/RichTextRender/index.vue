<template>
	<div class="richtext_container">
		<div v-html=changed_page_content></div>
	</div>
</template>

<script>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
	props: ['richtextData'],
	computed:{
		changed_page_content : function () {
			return documentToHtmlString(this.richtextData)
		}
	},
		methods: {
			toHtmlString(obj) {
				return documentToHtmlString(obj)
			}
		}
}
</script>

<style lang="scss">
.richtext_container{
	width: 80%;
	min-width: 300px;
	max-width: 750px;
	margin: 0 auto;
	img{
		max-width: 100%;
	}
}
</style>