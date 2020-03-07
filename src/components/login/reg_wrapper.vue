<template>
  <b-container class="login-container">
    <div class="logo-brand ml-auto">
      <a href="#">
        <svg
          height="48"
          class="octicon octicon-mark-github"
          viewBox="0 0 16 16"
          version="1.1"
          width="48"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          />
        </svg>
      </a>
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
      <b-button type="button" variant="success" class="fm-bt" v-validTrigger="sendRegData">Join</b-button>
    </b-form>
  </b-container>
</template>

<script>
import Apis from "@/service/api";
import "@/common/css/sweetalert.css"
import "@/common/js/sweetalert.min.js"

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
        })
        if(res.statusCode == 200){
          swal({
            text: res.message,
            title: "注册成功",
            type: "info",
            confirmButtonText: "确认",
            confirmButtonColor: "red"
          })
        }else{
          swal({
            text: res.message,
            title: "注册失败",
            type: "info",
            confirmButtonText: "确认",
            confirmButtonColor: "red"
          })
        }
      } catch (error) {
        const res = error.response.data
        swal({
          text: res.message,
          title: '服务器异常',
          type: "info",
          confirmButtonText: "确认",
          confirmButtonColor: "red"
        })
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