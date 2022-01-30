<template>
  <article class="card">
    <v-card
        class="mx-auto"
        max-width=100%
        elevation = 0
      >
        <v-container fluid>
          <v-row dense>
            <v-col
              v-for="post in posts"
              :key="post.fields.title"
              :cols=12
              :md=6
            >
              <v-card
                :to="'/post/' + post.fields.slug"
                rounded="1"
                elevation = 0
              >
                <v-img
                  :src="post.fields.thumbnail.fields.file.url"
                  :aspect-ratio="16/9"
                  class="white--text align-end grey darken-4"
                  gradient="to bottom, rgba(0,0,0, 0.2), rgba(0,0,0,1.0)"
                  contain
                >
                  <v-card-title v-text="post.fields.title"></v-card-title>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
  </article>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default: []
    },
  }
}
</script>