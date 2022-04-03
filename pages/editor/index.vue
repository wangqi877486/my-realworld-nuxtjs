<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ul class="error-messages">
            <template
              v-for="(messages, field) in errors"
            >
              <li
                v-for="(message, index) in messages"
                :key="index"
              >{{ field }} {{ message }}</li>
            </template>
          </ul>
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.title"
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="article.description"
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="article.body"
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="tagField"
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  @keyup.enter="addTag()"
                />
                <div class="tag-list">
                  <span
                    v-for="tag in article.tagList"
                    :key="tag"
                    class="tag-default tag-pill ng-binding ng-scope"
                  >
                    <i class="ion-close-round" @click="removeTag(tag)"></i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click="onSubmit()"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from "@/api/article"

export default {
  // 在路由匹配组件渲染之前会先执行中间件处理
  middleware: "authenticated",
  name: "EditorIndex",
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
      tagField: "",
      errors: {} // 错误信息
    };
  },
  methods: {
    addTag() {
      this.article.tagList.push(this.tagField)
      this.tagField = ""
    },
    removeTag(tag) {
      this.article.tagList.splice(this.article.tagList.indexOf(tag), 1)
    },
    async onSubmit() {
      try {
        const { data } = await createArticle({ article: this.article })
        this.$router.push({
          name: 'article',
          params: {
            slug: data.article.slug
          }
        })
      } catch (err) {
        this.errors = err.response.data.errors
      }
    },
  }
}
</script>

<style>
</style>