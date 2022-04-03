<template>
  <div class="article-meta">
    <nuxt-link :to="{
      name: 'profile',
      params: {
        username: article.author.username
      }
    }">
      <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link class="author" :to="{
        name: 'profile',
        params: {
          username: article.author.username
        }
      }">
        {{ article.author.username }}
      </nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
    </div>

    <!-- 如果是自己的文章 -->
    <template v-if="user.username === article.author.username">
      <button
        class="btn btn-sm btn-outline-secondary"
        @click="toEditorPage()"
      >
        <i class="ion-edit"></i>
        &nbsp;
        Edit Article
      </button>
      &nbsp;&nbsp;
      <button
        class="btn btn-sm btn-outline-danger"
        @click="deleteArticle()"
      >
        <i class="ion-trash-a"></i>
        &nbsp;
        Delete Article
      </button>
    </template>

    <!-- 如果是别人的文章 -->
    <template v-else>
      <button 
        class="btn btn-sm btn-outline-secondary"
        :class="{
          active: article.author.following
        }"
        @click="onFollow(article.author.username)"
      >
        <i class="ion-plus-round"></i>
        &nbsp;
        {{ article.author.following ? 'Unfollow' : 'Follow' }} {{ article.author.username }} 
      </button>

      &nbsp;&nbsp;

      <button
        class="btn btn-sm btn-outline-primary"
        :class="{
          active: article.favorited
        }"
      >
        <i class="ion-heart"></i>
        &nbsp;
        {{ article.favorited ? 'Favorite Article' : 'Unfavorite Article' }}  <span class="counter">(29)</span>
      </button>
    </template>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { deleteArticle } from '@/api/article'
import { followUser, unFollowUser } from '@/api/profile'

export default {
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async onFollow (username) {
      if (this.article.author.following) {
        await unFollowUser(username)
        this.article.author.following = false
      } else {
        await followUser(username)
        this.article.author.following = true
      }
    },
    toEditorPage(){
      this.$router.push({
        name: 'editor1',
        params: {
          slug: this.article.slug
        }
      })
    },
    async deleteArticle(){
      await deleteArticle(this.article.slug)
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>