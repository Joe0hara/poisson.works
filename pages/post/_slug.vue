<template>
	<v-app>
			<Header/>

			<main>
				<h1>{{post.fields.title}}</h1>
				<img class="thimbnail" :src="post.fields.thumbnail.fields.file.url" />
				<RechtextRender :richtext-data="post.fields.body" />
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
					content_type: "post",
					"fields.slug": params.slug,
          "fields.sercret[ne]" : true,
				}),
      ])
        .then(([entries]) => {
          return {
            post: entries.items[0],
          };
        })
        .catch(console.error);
    },
}
</script>

<style>
.thimbnail{
	margin-bottom: 25px;
}
</style>
