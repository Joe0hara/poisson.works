<template>
	<v-app>
			<Header/>

			<main>
				<RechtextRender :richtext-data="page.fields.body" />

				<Card :posts="posts"/>

			</main>

			<Footer/>

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

	asyncData({params}){
      return Promise.all([
        client.getEntries({
					content_type: "page",
					"fields.slug": "home"
				}),
        client.getEntries({
          content_type: 'post',
          "fields.sercret[ne]" : true,
        }),
      ])
        .then(([page, posts]) => {
          return {
            page: page.items[0],
            posts: posts.items,
						slug: params
          };
        })
        .catch(console.error);
    },
}
</script>

<style>

</style>
