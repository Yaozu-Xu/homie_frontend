<template>
  <div id="article-area">
    <div
      class="article-container col-md-11 col-xl-11"
      v-for="(article, index) in articleList"
      :key="index"
    >
      <h2 :id="'item-'+ article._id">
        {{article.articleName}}
        <a></a>
      </h2>
      <b-row class="article-detail pt-sm-1">
        <div class="article-tag">
          <b-icon icon="tag"></b-icon>
          <span class="pl-1">{{article.category.cName}}</span>
        </div>
        <div class="article-time pl-3 pl-sm-4">
          <b-icon icon="clock"></b-icon>
          <span class="pl-1">{{article.createTime.slice(0, 10)}}</span>
        </div>
        <div class="article-editor pl-3 pl-sm-4" v-if="selfPage">
          <b-icon icon="pencil"></b-icon>
          <a class="pl-1" :href="'/edit/' + article._id" target="_blank">编辑</a>
        </div>
        <div class="article-del pl-3 pl-sm-4" v-if="selfPage">
          <b-icon icon="trash"></b-icon>
          <span class="pl-1" @click="delArticle(article._id)">删除</span>
        </div>
      </b-row>
      <div class="article-content" v-html="article.content"></div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#article-area {
  padding-top: 40px;
  padding-left: 35px;
  min-width: 70%;
  position: relative;
  .article-container {
    padding-bottom: 40px;
    h2 {
      font-family: "Times New Roman", Times, serif;
    }
    .article-detail {
      padding-left: 15px;
      span {
        color: #858585;
      }
      .article-editor {
        a {
          color:rgba(0, 0, 0, 0.5);
          text-decoration: none;
        }
        a:hover {
          color: #0056b3;
        }
      }
      .article-del {
        span {
          color: rgba(0, 0, 0, 0.5);
          cursor: pointer;
        }
        span:hover {
          color: #0056b3;
        }
      }
    }
    .article-content {
      width: 100%;
      padding-top: 15px;
      // 深度选择器，渲染v-html内的样式
      ::v-deep h1 {
        font-size: 1.8em;
      }
      ::v-deep h2 {
        font-size: 1.5em;
      }
      ::v-deep h3 {
        font-size: 1.2em;
      }
      ::v-deep ol {
        padding-inline-start: 15px;
      }
      ::v-deep ul {
        padding-inline-start: 15px;
      }
      ::v-deep pre {
        display: block;
        overflow: auto;
        word-wrap: normal;
        word-break: normal;
        padding: 28px 24px;
        font-size: 14px;
        background-color: #f6f6f6;
        border-radius: 4px;
        color: #68747f;
      }
    }
  }
}

@media (min-width: 768px) {
  .article-container {
    border-right: 1px solid rgba(25, 25, 25, 0.1);
  }
}
</style>

<script>
import Apis from "@/service/api";

export default {
  data() {
    return {
      selfPage: null,
      articleList: ""
    };
  },

  created() {
    this.selfPage = this.$store.state.selfPage;
  },

  mounted() {
    this.getArticleList();
  },

  methods: {
    async getArticleList() {
      try {
        this.articleList = await Apis.getOnesAriticles(this.$store.state.id);
      } catch (error) {

      }
    },

    async delArticle(aid) {
      try {
        swal(
          {
            title: "删除？",
            text: "确定要删除该文章吗",
            type: "info", 
            confirmButtonColor: "red",
            confirmButtonText: "确定"
          },
          async function(willConfirm) {
            if (willConfirm) {
              const res = await Apis.delArticle(aid);
              if (res.statusCode === 200) {
                swal({
                  text: "删除成功",
                  title: "成功",
                  type: "info",
                  confirmButtonText: "确认",
                  confirmButtonColor: "red"
                });
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              } else {
                swal({
                  text: "删除失败",
                  title: res.message,
                  type: "info",
                  confirmButtonText: "确认",
                  confirmButtonColor: "red"
                });
              }
            }
          }
        );
      } catch (error) {
        swal({
          text: "删除失败",
          title: "服务器异常",
          type: "info",
          confirmButtonText: "确认",
          confirmButtonColor: "red"
        });
      }
    }
  }
};
</script>