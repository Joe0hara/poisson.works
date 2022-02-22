<template>
	<v-app>
			<Header/>

			<main>
				<RechtextRender :richtext-data="page.fields.body" />
          <h1><a href="/work">work</a></h1>
          <Card :posts=work />

          <h1><a href="/prototype">prototype</a></h1>
          <Card :posts=prototype />

          <h1><a href="/tutorial">tutorial</a></h1>
          <Card :posts=tutorial />
			  <Footer/>
      </main>

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
        "fields.category.sys.contentType.sys.id": "category",
        "fields.category.fields.slug": 'work',
        limit: 4,
        "fields.sercret[ne]" : true,
      }),
      client.getEntries({
        content_type: 'post',
        "fields.category.sys.contentType.sys.id": "category",
        "fields.category.fields.slug": 'prototype',
        limit: 4,
        "fields.sercret[ne]" : true,
      }),
      client.getEntries({
        content_type: 'post',
        "fields.category.sys.contentType.sys.id": "category",
        "fields.category.fields.slug": 'tutorial',
        limit: 4,
        "fields.sercret[ne]" : true,
      }),
    ])
      .then(([page, work, prototype, tutorial]) => {
        return {
          page: page.items[0],
          work: work.items,
          prototype: prototype.items,
          tutorial: tutorial.items,
          slug: params
        };
      })
      .catch(console.error);
    },
}
</script>

<style>

</style>
