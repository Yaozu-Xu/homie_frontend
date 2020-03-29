<template>
  <b-container class="login-container">
    <div class="logo-brand ml-auto">
      <router-link to="/">
        <img src="../../assets/logo.png" style="width:96px; height:96px; border-radius:50%">
      </router-link>
    </div>
    <div class="fm-header">
      <h1>创建你的账号 !</h1>
    </div>
    <b-form class="fm-body">
      <b-form-group label="Email" label-for="email">
        <b-form-input
          type="email"
          id="email"
          placeholder="you@example"
          required
          v-model="email"
          v-validate="this.descriptor.email"
        ></b-form-input>
        <div
          tabindex="-1"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          class="invalid-feedback"
        ></div>
      </b-form-group>
      <b-form-group label="UserName" label-for="user">
        <b-form-input
          type="text"
          id="user"
          placeholder="数字or字母or下划线"
          required
          v-model="user"
          v-validate="this.descriptor.user"
        ></b-form-input>
        <div
          tabindex="-1"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          class="invalid-feedback"
        ></div>
      </b-form-group>
      <b-form-group label="Password" label-for="password">
        <b-form-input
          type="password"
          id="pwd"
          placeholder="9-22位密码"
          required
          v-model="pwd"
          v-validate="this.descriptor.pwd"
        ></b-form-input>
        <div
          tabindex="-1"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          class="invalid-feedback"
        ></div>
      </b-form-group>
      <b-button
        type="button"
        variant="success"
        class="fm-bt"
        v-validTrigger="sendRegData"
      >Join</b-button>
    </b-form>
  </b-container>
</template>

<script>
import Apis from "@/service/api";
import "@/common/css/sweetalert.css";
import "@/common/js/sweetalert.min.js";

export default {
  data() {
    return {
      email: "",
      user: "",
      pwd: "",
      descriptor: {
        email: {
          rules: {
            required: true,
            type: "email",
            max: 24
          },
          msg: {
            type: "邮箱格式不合法",
            required: "邮箱不能为空",
            max: "邮箱长度不得大于24"
          }
        },
        user: {
          rules: {
            required: true,
            min: 3,
            max: 9
          },
          msg: {
            required: "用户名不能为空",
            min: "用户名长度不得小于3",
            max: "用户名长度不得大于9"
          }
        },
        pwd: {
          rules: {
            required: true,
            min: 9,
            max: 22
          },
          msg: {
            required: "密码不能为空",
            min: "密码长度不得小于9",
            max: "密码长度不得大于22"
          }
        }
      }
    };
  },

  computed: {},

  methods: {
    async sendRegData() {
      if (Object.keys(this.errMsg).length > 0) {
        return false;
      }
      try {
        const res = await Apis.register({
          email: this.email,
          username: this.user,
          password: this.pwd
        });
        if (res.statusCode == 200) {
          swal({
            text: res.message,
            title: "注册成功",
            type: "info",
            confirmButtonText: "确认",
            confirmButtonColor: "red"
          });
        } else {
          swal({
            text: res.message,
            title: "注册失败",
            type: "info",
            confirmButtonText: "确认",
            confirmButtonColor: "red"
          });
        }
      } catch (error) {
        swal({
          text: '服务器异常',
          title: "错误",
          type: "info",
          confirmButtonText: "确认",
          confirmButtonColor: "red"
        });
      }
    },

    clearInput() {
      this.email = "";
      this.user = "";
      this.password = "";
    }
  }
};
</script>


<style lang="scss">
.form-group {
  font-weight: 500;

  .invalid-feedback {
    text-align: right;
    font-size: 90%;
    float: right;
  }
}

.login-container {
  width: 340px;
  margin-top: 40px;
  margin-bottom: 30px;

  .logo-brand {
    text-align: center;
    margin-bottom: 30px;
  }

  .fm-header {
    margin-bottom: 22px;
    color: #333;
    text-align: center;
    text-shadow: none;
    background-color: initial;
    border: 0;

    h1 {
      font-size: 22px;
      font-weight: 400;
      letter-spacing: -0.5px;
    }
  }

  .fm-body {
    padding: 20px;
    font-size: 14px;
    background-color: #fff;
    border: 1px solid #d8dee2;
    border-radius: 3px;

    .fm-bt {
      display: block;
      margin-top: 30px;
      width: 100%;
      text-align: center;
    }
  }
}
</style>