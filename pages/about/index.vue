<template>
	<v-app>
		<Header />
		<RechtextRender :richtext-data="page.fields.body" />
		<Footer />
	</v-app>

</template>

<script>
import Header from '~/components/organisms/Header'
import Footer from '~/components/organisms/Footer'

import RechtextRender from '~/components/organisms/RichTextRender'

import Card from '~/components/molecules/Card'

import {createClient} from '~/plugins/contentful.js'
const client = createClient()

export default {
		components: {
    Header,
    Footer,
		RechtextRender,
		Card,
  },
	asyncData({env}){
		return Promise.all([
			client.getEntries({
				content_type: "page",
				"fields.slug": "about"
			})
		])
			.then(([entries, posts]) => {
				return {
					page: entries.items[0],
				};
			})
			.catch(console.error);
	},
}
</script>

<style>

</style>
