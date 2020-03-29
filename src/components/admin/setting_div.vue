<template>
  <div id="settings">
    <div class="icon-settings component">
      <img :src="icon" />
      <b-button v-b-modal.icon-modal variant="outline-primary">修改头像</b-button>
    </div>
    <div class="password-settings component">
      <i class="fa fa-lock" aria-hidden="true"></i>
      <b-button v-b-modal.pwd-modal variant="outline-primary">修改密码</b-button>
    </div>
    <div class="component">
      <i class="fa fa-sign-out" aria-hidden="true"></i>
      <b-button variant="outline-primary" @click="logOut">退出登陆</b-button>
    </div>
    <b-modal id="icon-modal" title="头像上传" hide-footer>
      <img class="icon-temp" :src="icon" />
      <input type="file" accept="image/*" class="img-input" @change="onUploadImage" />
      <b-button variant="primary" class="md-btn" style="float: right;" @click="uploadImage">提交</b-button>
    </b-modal>
    <b-modal id="pwd-modal" title="密码修改" hide-footer>
      <b-form-input
        type="password"
        v-model="password"
        required
        placeholder="9-22位新密码"
        minlength="9"
        maxlength="22"
      ></b-form-input>
      <b-button
        variant="primary"
        class="md-btn"
        style="float: right;margin-top: 1rem;"
        @click="resetPassWord"
        v-hotkey="{'enter': resetPassWord}"
      >提交</b-button>
    </b-modal>
  </div>
</template>

<style lang="scss">
#pwd-modal {
  input:invalid {
    border: 2px solid red;
  }
}

.icon-temp {
  width: 38px;
  height: 38px;
  border-radius: 50%;
}

.img-input {
  padding-left: 1rem;
  text-overflow: ellipsis;
}
</style>

<style lang="scss" scoped>
#settings {
  background: #fff;
  border-radius: 0 0 4px 4px;
  width: 100%;
  box-shadow: 0 1px 3px rgba(26, 26, 26, 0.1);
  display: flex;
  flex-direction: column;
  .component {
    padding: 1rem 0.5rem 1rem 0.5rem;
    display: flex;
    justify-content: space-between;
    img {
      width: 38px;
      height: 38px;
      border-radius: 50%;
    }
    i {
      font-size: 2rem;
      color: grey;
      padding-left: 0.5rem;
    }
  }
}

@media screen and (max-width: 992px) {
  #settings {
    max-height: 300px;
  }
}
</style>

<script>
import { removeStore } from "@/config/utils";
import Cookies from "js-cookie";
import { settingApi } from "@/service/api";

export default {
  data() {
    return {
      password: "",
      uid: "",
      filename: "",
      icon: null
    };
  },
  created() {
    this.uid = this.$store.state.id;
    this.initIcon();
  },
  methods: {
    initIcon() {
      const temp = this.$store.state.icon;
      if (!temp) {
        this.icon = require("../../assets/img/default.png");
      } else {
        this.icon = temp;
      }
    },
    onUploadImage() {
      let input = document.querySelector(".img-input");
      let file = input.files[0];
      const suffix = /image\/(.*)/.exec(file["type"])[1];
      const prefix = this.uid.slice(16, 24);
      this.filename = `${prefix}.${suffix}`;
      if (file) {
        let image = document.querySelector(".icon-temp");
        image.src = window.URL.createObjectURL(file);
      }
    },

    async uploadImage() {
      let input = document.querySelector(".img-input");
      let file = input.files[0];
      if (!file) {
        return;
      }
      // upload to the server
      let formData = new FormData();
      formData.append("file", file, this.filename);
      formData.append("uid", this.uid);
      try {
        const res = await settingApi.changeIcon(formData)
        swal({
          text: res.message,
          title: "消息",
          type: "info",
          confirmButtonText: "确认",
          confirmButtonColor: "red"
        });
        setTimeout(window.location.reload(), 2000);
      } catch (error) {
        console.log(error)
      }
    },

    async resetPassWord() {
      if (this.password.length < 9 || this.password.length > 22) {
        return;
      }
      try {
        const res = await settingApi.reset({
          uid: this.uid,
          password: this.password
        });
        swal({
          text: res.message,
          title: "消息",
          type: "info",
          confirmButtonText: "确认",
          confirmButtonColor: "red",
        });
        setTimeout(window.location.reload(), 2000);
      } catch (error) {
        console.log(error);
      }
    },

    logOut() {
      swal(
        {
          title: "退出？",
          text: "确定要退出吗",
          type: "info",
          confirmButtonColor: "red",
          confirmButtonText: "确定",
          showCancelButton: true,
          cancelButtonText: "取消",
        },
        function(willConfirm) {
          if (willConfirm) {
            removeStore("access_token");
            Cookies.remove("refresh_token");
            Cookies.remove("uid");
            setTimeout(window.location.reload(), 1000);
          }
        }
      );
    }
  }
};
</script>