<template>
  <b-container class="m-auto">
    <div id="summernote"></div>
  </b-container>
</template>


<style lang="scss">
@import "../../common/css/summernote";

.nav-header {
  background: #fff;
  box-shadow: 0 5px 4px -4px rgba(25, 25, 25, 0.1);
  color: #888;
}

.submit-btn {
  color: #007bff;
  border-color: #007bff;
}

.submit-btn:hover {
  background: #007bff;
  border: 1px solid #007bff;
  color: #fff;
}
</style>

<style lang="scss" scoped>
/deep/ .active{
  background: #e6e6e6;
}
</style>

<script>
import Apis from "@/service/api";

export default {
  data() {
    return {
      aid: "",
      oriContent: ""
    };
  },
  mounted() {
    this.initArticle();
  },

  created() {
    this.aid = this.$route.params.aid;
    this.username = this.$store.state.username
  },

  methods: {
    createBtn(context) {
      const ui = $.summernote.ui;
      // create button
      let button = ui.button({
        contents: '<i class="fa fa-child" id="submit" /> 提交更新',
        tooltip: "提交",
        click: this.sendUpdated
      });
      return button.render();
    },

    async initArticle() {
      const res = await Apis.getArticleByAid(this.aid);
      this.oriContent = res.content;
      // init editor
      $("#summernote").summernote({
        lang: "zh-CN",
        height: 500,
        disableDragAndDrop: true,
        tabDisable: true,
        disableGrammar: true,
        toolbar: [
          ["style", ["bold", "italic", "underline", "clear"]],
          ["fontsize", ["fontsize", "backcolor", "fontname"]],
          ["color", ["color"]],
          ["para", ["ul", "ol", "paragraph", "style"]],
          ["insert", ["picture", "link", "table", "hr"]],
          ["Misc", ["help", "fullscreen", "submit"]]
        ],
        buttons: {
          submit: this.createBtn
        },
        callbacks: {
          onImageUpload: async function(files) {
            // create img node
            const api = "/api/publish/file/";
            const prefix = `img-${files[0]["lastModified"]}`;
            const suffix = /image\/(.*)/.exec(files[0]["type"])[1];
            const filename = `${prefix}.${suffix}`;
            let imgNode = (prefix, suffix) => {
              const imgNode = document.createElement("img");
              imgNode.setAttribute("src", `${api}${filename}`);
              return imgNode;
            };
            // upload to the server
            let formData = new FormData();
            formData.append("file", files[0], filename);
            try {
              const res = await Apis.uploadImg(formData);
              if (res.statusCode === 200) {
                $("#summernote").summernote(
                  "insertNode",
                  imgNode(prefix, suffix)
                );
              }
            } catch (error) {
              console.log(error);
            }
          }
        }
      });
      // insert ori content
      $("#summernote").summernote("code", this.oriContent);
      // init style
      $("#submit")
        .parent()
        .addClass("submit-btn");
    },

    cleanDom(content) {
      let dom = document.createElement("div");
      dom.innerHTML = content;
      const elems = dom.getElementsByTagName("*");
      const len = elems.length;
      for (let i = 0; i < len; i++) {
        if (elems[i]) {
          const temp = elems[i].innerHTML.trim().replace(/&nbsp;/g, "");
          elems[i].innerHTML = temp.replace(/<br>/g, "");
        }
      }
      return dom.innerHTML;
    },

    async sendUpdated() {
      const html = $("#summernote").summernote("code");
      const content = this.cleanDom(html);
      const res = await Apis.putArticle({ aid: this.aid, content: content, username: this.username });
      if (res.statusCode === 200) {
        swal({
          text: "发布成功",
          title: "成功",
          type: "info",
          confirmButtonText: "确认",
          confirmButtonColor: "red"
        });
        setTimeout(() => {
          this.$router.push({
            name: "index",
            params: { user: this.$store.state.username }
          });
        }, 2000);
      } else {
        swal({
          text: res.message,
          title: "发布失败",
          type: "info",
          confirmButtonText: "确认",
          confirmButtonColor: "red"
        });
      }
    }
  }
};
</script>