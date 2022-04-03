<template>
    <div class="profile-page">
        <div class="user-info">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-md-10 offset-md-1">
                        <img :src="profile.image" class="user-img"/>
                        <h4>{{ profile.username }}</h4>
                        <p>{{ profile.bio }}</p>
                        <button 
                            v-if="user.username === profile.username" 
                            class="btn btn-sm btn-outline-secondary action-btn"
                            @click="toSettingsPage()"
                        >
                            <i class="ion-gear-a"></i>
                            &nbsp;
                            Edit Profile Settings
                            <!-- <nuxt-link to="/settings" exact> Edit Profile Settings</nuxt-link> -->
                        </button>

                        <button 
                            v-else-if="user.username !== profile.username && !profile.following" 
                            class="btn btn-sm btn-outline-secondary action-btn"
                            @click="onFollow(profile.username)"
                        >
                            <i class="ion-plus-round"></i>
                            &nbsp;
                            Follow {{ profile.username }}
                        </button>

                        <button 
                            v-else-if="user.username !== profile.username && profile.following" 
                            class="btn btn-sm btn-outline-secondary action-btn"
                            @click="onUnFollow(profile.username)"
                        >
                            <i class="ion-plus-round"></i>
                            &nbsp;
                            Unfollow {{ profile.username }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-xs-12 col-md-10 offset-md-1">
                    <div class="articles-toggle">
                        <ul class="nav nav-pills outline-active">
                            <li class="nav-item">
                                <nuxt-link
                                    class="nav-link"
                                    exact
                                    :to="{
                                        name: 'profile',
                                        params: {
                                            username: profile.username
                                        }
                                    }"
                                >My Articles</nuxt-link>
                            </li>
                            <li class="nav-item">
                                <nuxt-link
                                    class="nav-link"
                                    exact
                                    :to="{
                                        name: 'profile1',
                                        params: {
                                            username: profile.username,
                                            tab: 'favorites'
                                        }
                                    }"
                                >Favorited Articles</nuxt-link>
                            </li>
                        </ul>
                    </div>

                    <div
                        class="article-preview"
                        v-for="article in articles"
                        :key="article.slug"
                    >
                        <div class="article-meta">
                        <nuxt-link :to="{
                            name: 'profile',
                            params: {
                                username: article.author.username
                            }}"
                        >
                            <img :src="article.author.image" />
                        </nuxt-link>
                        <div class="info">
                            <nuxt-link class="author" :to="{
                                name: 'profile',
                                params: {
                                    username: article.author.username
                                }}"
                            >
                                {{ article.author.username }}
                            </nuxt-link>
                            <span class="date">{{ article.createdAt | date('MMM DD, YYYY') }}</span>
                        </div>
                        <button
                            class="btn btn-outline-primary btn-sm pull-xs-right"
                            :class="{
                                active: article.favorited
                            }"
                            @click="onFavorite(article)"
                            :disabled="article.favoriteDisabled"
                        >
                            <i class="ion-heart"></i> {{ article.favoritesCount }}
                        </button>
                        </div>
                        <nuxt-link
                            class="preview-link"
                            :to="{
                                name: 'article',
                                params: {
                                    slug: article.slug
                                }
                            }"
                        >
                        <h1>{{ article.title }}</h1>
                        <p>{{ article.description }}</p>
                        <span>Read more...</span>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getArticles, deleteFavorite, addFavorite } from '@/api/article'
import { getProfile, followUser, unFollowUser } from '@/api/profile'
import { mapState } from 'vuex'

export default {
    middleware: 'authenticated',
    name: 'ProfileIndex',
    async asyncData ({ params }) {
        const tab = params.tab || 'my_articles'
        const author = tab === 'favorites' ? null : params.username
        const favorited = tab === 'favorites' ? params.username : null

        const [ articleRes, profileRes ] = await Promise.all([
            getArticles({
                author: author,
                favorited: favorited
            }),
            getProfile(params.username)
        ])

        const { articles } = articleRes.data
        const { profile } = profileRes.data

        articles.forEach(article => article.favoriteDisabled = false)

        return {
            articles, // 文章列表
            tab, // 选项卡
            profile // 数据标签
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        async onFavorite (article) {
            article.favoriteDisabled = true
            if (article.favorited) {
                // 取消点赞
                await deleteFavorite(article.slug)
                article.favorited = false
                article.favoritesCount += -1
            } else {
                // 添加点赞
                await addFavorite(article.slug)
                article.favorited = true
                article.favoritesCount += 1
            }
            article.favoriteDisabled = false
        },
        toSettingsPage () {
            this.$router.push('/settings')
        },
        async onFollow (username) {
            await followUser(username)
            this.profile.following = true
        },
        async onUnFollow (username) {
            await unFollowUser(username)
            this.profile.following = false
        }
    }
}
</script>

<style>

</style>