<template>
  <b-container class="at-container m-auto">
    <b-form-group>
      <b-form-input
        v-model="title"
        v-validate="this.descriptor.title"
        id="title"
        type="text"
        required
        placeholder="文章标题"
      ></b-form-input>
    </b-form-group>
    <b-form-select
      v-model="category"
      v-validate="this.descriptor.category"
      :options="options"
      id="category"
    ></b-form-select>
    <b-button-group>
      <b-button variant="outline-primary" class="at-btn" v-validTrigger="publish">发布文章</b-button>
      <b-button v-b-modal.ct-modal variant="outline-success" class="at-btn">新的分类</b-button>
    </b-button-group>
    <b-modal id="ct-modal">
      <template v-slot:modal-title>创建分类</template>
      <b-form-input type="text" v-model="newCategory" required placeholder="分类名"></b-form-input>
      <b-button
        @click="createNewCatrgory"
        type="button"
        id="btn1"
        variant="primary"
        class="md-btn"
        style="float: right; margin-top:12px"
      >提交</b-button>
      <b-tooltip
        :disabled.sync="disabled"
        target="btn1"
        title="分类名必须在1-12之间"
        variant="danger"
        placement="left"
        triggers="click"
      ></b-tooltip>
    </b-modal>
    <div id="summernote"></div>
  </b-container>
</template>

<script>
import Apis from "@/service/api";

export default {
  data() {
    return {
      disabled: true,
      title: "",
      cName: "",
      category: null,
      newCategory: "",
      options: [],
      descriptor: {
        title: {
          rules: {
            required: true,
            max: 20
          },
          msg: {
            required: "标题不能为空",
            max: "标题长度不得大于20"
          },
          settings: {
            domOp: false
          }
        },
        category: {
          rules: {
            required: true,
            min: 24,
            max: 24
          },
          msg: {
            required: "分类不能为空",
            min: "分类名不合法",
            max: "分类名不合法"
          },
          settings: {
            domOp: false
          }
        }
      }
    };
  },

  created(){
    this.$store.state.selfPage = true
  },

  mounted() {
    this.getCategoryList();

    $("#summernote").summernote({
      lang: "zh-CN",
      height: 500,
      disableDragAndDrop: true,
      tabDisable: true,
      disableGrammar: true,
      toolbar: [
        // [groupName, [list of button]]
        ["style", ["bold", "italic", "underline", "clear"]],
        ["fontsize", ["fontsize", "backcolor", "fontname"]],
        ["color", ["color"]],
        ["para", ["ul", "ol", "paragraph", "style"]],
        ["insert", ["picture", "link", "table", "hr"]],
        ["Misc", ["codearea", "help", "fullscreen"]]
      ],
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
  },

  methods: {
    async publish() {
      // 标题和分类检验
      const msgKeys = Object.keys(this.errMsg);
      if (msgKeys.length > 0) {
        swal({
          text: this.errMsg[msgKeys[0]],
          title: "错误",
          type: "info",
          confirmButtonText: "确认",
          confirmButtonColor: "red"
        });
        return false;
      }
      // 文章内容检验
      if ($("#summernote").summernote("isEmpty")) {
        swal({
          text: "发布内容不得为空",
          title: "错误",
          type: "info",
          confirmButtonText: "确认",
          confirmButtonColor: "red"
        });
        return false;
      }
      const html = $("#summernote").summernote("code");
      const content = this.cleanDom(html);
      const selectedCategory = this.options.filter(obj => obj.value === this.category).pop()
      const postData = {
        uid: this.$store.state.id,
        username: this.$store.state.username,
        cid: selectedCategory.value,
        cName: selectedCategory.text,
        content: content,
        title: this.title,
      }
      const res = await Apis.postArticle(postData)
      if(res.statusCode === 200){
        swal({
          text: "发布成功",
          title: "成功",
          type: "info",
          confirmButtonText: "确认",
          confirmButtonColor: "red"
        })
        setTimeout(() => {
          this.$router.push({ name: 'index', params: { user: this.$store.state.username}})
        }, 1000);
      }else{
        swal({
          text: res.message,
          title: "发布失败",
          type: "info",
          confirmButtonText: "确认",
          confirmButtonColor: "red"
        })
      }
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

    async createNewCatrgory() {
      if (this.newCategory.length > 12 || this.newCategory.length == 0) {
        this.disabled = false;
        return;
      }
      this.disabled = true;
      try {
        const res = await Apis.createCategory({
          cName: this.newCategory,
          uid: this.$store.state.id
        });
        if (res.statusCode === 200) {
          swal({
            text: res.message,
            title: "创建成功",
            type: "info",
            confirmButtonText: "确认",
            confirmButtonColor: "red"
          });
        } else {
          swal({
            text: res.message,
            title: "创建失败",
            type: "info",
            confirmButtonText: "确认",
            confirmButtonColor: "red"
          });
        }
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (err) {
        swal({
          text: err.message,
          title: "创建失败",
          type: "info",
          confirmButtonText: "确认",
          confirmButtonColor: "red"
        });
      }
    },

    async getCategoryList() {
      try {
        const username = this.$store.state.username;
        const res = await Apis.getUser(username);
        const category = res.category;
        this.options = category.map(obj => {
          return { value: obj.cid, text: obj.cName };
        });
        this.options.unshift({ value: null, text: "文章分类", disabled: true });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>


<style lang="scss">
@import "../../common/css/summernote";
</style>

<style lang="scss" scoped>
/deep/ .active{
  background: #e6e6e6;
}

.at-container {
  margin-top: 40px !important;
  margin-bottom: 10px !important;

  .at-btn {
    margin-bottom: 15px;
    display: inline-block;
    margin-right: 10px !important;
  }

  #title {
    font-size: 16px;
    font-weight: bold;
  }

  #category {
    margin-bottom: 20px;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>