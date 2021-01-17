<template>
	<div class="container">
		<Header />

    <card
      v-for="(post,i ) in posts"
      :key="i"
      :title="post.fields.title"
      :id="post.sys.id"
      :date="post.sys.updatedAt"
    />

		<Footer />
	</div>
</template>

<script>
import {createClient} from '~/plugins/contentful.js'
const client = createClient()
export default {
	asyncData({env, params}){
		return client
			.getEntries(env.CTF_BLOG_POST_TYPE_ID)
			.then(entries => {
				return {
					posts:entries.items
				}
			})
			.catch(console.error)
	}
}
</script>

<style>

</style>
