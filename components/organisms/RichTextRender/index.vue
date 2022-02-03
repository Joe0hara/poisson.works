<template>
	<div class="richtext_container">
		<div v-html=changed_page_content></div>
	</div>
</template>

<script>
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

export default {
	props: ['richtextData'],
	computed:{
		changed_page_content : function () {
			const options = {
        renderNode: {
          [BLOCKS.EMBEDDED_ASSET]: ({
            data: {
              target: { fields }
            }
          }) => {
							console.log(fields.file)
							const img_ext = ['png', 'jpg', 'gif']
							if (img_ext.includes(fields.file.url.slice(-3))) {
								return `<img src="${fields.file.url}"/>`
							}
							else{
								return `<a href="${fields.file.url}">${fields.file.fileName}</a>`
							}
						}
        }
      }
			return documentToHtmlString(this.richtextData, options)
		}
	},
}
</script>

<style lang="scss">
.richtext_container{
	width: 95%;
	// min-width: 300px;
	// max-width: 750px;
	margin: 0 auto;
	img{
		max-width: 100%;
	}
	code{
    font-family: Monaco, Consolas, "Andale Mono", "DejaVu Sans Mono", monospace;
    line-height: 125%;
    display: block;
    overflow: auto;
    white-space: pre;
    padding: 4px 10px 4px 8px;
    margin: 4px 0 2px 5px;
    color: white !important;
    background-color: #000 !important;
	}
}
</style>