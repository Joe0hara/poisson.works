<template>
	<v-app>
			<Header/>

			<main>
				<RechtextRender :richtext-data="page.fields.body" />

				<!-- <Card
					v-for="(post, i) in posts"
					:key="i"
					:title="post.fields.title"
					:id="post.sys.id"
					:date="post.sys.updatedAt"
				/> -->
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

	asyncData({env}){
      return Promise.all([
        client.getEntries({
					content_type: "page",
					"fields.slug": "home"
				}),
        client.getEntries({
          content_type: env.CTF_BLOG_POST_TYPE_ID,
        }),
      ])
        .then(([entries, posts]) => {
          return {
            page: entries.items[0],
            posts: posts.items,
          };
        })
        .catch(console.error);
    },
}
</script>

<style>

</style>
