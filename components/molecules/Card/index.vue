<template>
  <nuxt-link
    :to="'post/'+slug"
    class="wrapper"
  >
    <article class="card">
      <h1 class="card_title">{{ title }}</h1>
      <p class="card_date">{{ (new Date(date)).toLocaleDateString() }}</p>
      <img :src="thumbnail_url" alt="" />
    </article>

  </nuxt-link>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
    thumbnail_url: {
      type: String,
      default: ''
    }
  }
}
</script>