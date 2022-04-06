<template>
	<v-app>
			<Header/>

			<main>
				<h1>{{post.fields.title}}</h1>

				<table class="detail">
					<tr v-if="post.fields.date"><th>date</th><th>{{post.fields.date}}</th></tr>
					<tr v-if="post.fields.venue"><th>venue</th><th>{{post.fields.venue}}</th></tr>
					<tr v-if="post.fields.role"><th>my role</th><th>{{post.fields.role}}</th></tr>
				</table>
				<img class="thimbnail" :src="post.fields.thumbnail.fields.file.url" />
				<RechtextRender :richtext-data="post.fields.body" />
				<button @click="$router.go(-1)">Back</button>
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

<style lang="scss" scoped>
h1{
	margin-bottom: 25px;
}
.thimbnail{
	margin-bottom: 25px;
}
button{
	text-decoration: underline;
	font-weight: bolder;
}
.detail{
	/* text-align: right; */
	margin-bottom: 10px;

	th{
		text-align: left;
	}
	th:nth-of-type(2){
		padding-left: 20px;
	}
}
</style>
