<template>
  <b-container class="login-container">
    <div class="logo-brand ml-auto">
      <a>
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
      <h1>Sign in to homiepub</h1>
    </div>
    <b-form class="fm-body">
      <b-form-group label="Email address" label-for="user">
        <b-form-input
          v-model="email"
          id="email"
          type="text"
          required
          v-validate="this.descriptor.email"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Password" label-for="password">
        <b-form-input
          v-model="password"
          id="pwd"
          type="password"
          required
          v-validate="this.descriptor.pwd"
        ></b-form-input>
      </b-form-group>
      <b-button
        type="button"
        variant="primary"
        class="fm-bt"
        v-validTrigger="login"
        v-hotkey="{'enter': login}"
      >Login</b-button>
    </b-form>
    <div class="create-div">
      New to HomiePub?
      <a href="/join">Create an account</a>
    </div>
  </b-container>
</template>


<style lang="scss" scoped>
.form-group {
  font-weight: 500;
}

.login-container {
  width: 340px;
  margin-top: 40px;

  .logo-brand {
    text-align: center;
    margin-bottom: 30px;
  }

  .fm-header {
    margin-bottom: 22px;
    font-size: 14px;
    color: #333;
    text-align: center;
    text-shadow: none;
    background-color: initial;
    border: 0;

    h1 {
      font-size: 24px;
      font-weight: 300;
      letter-spacing: -0.5px;
    }
  }

  .fm-body {
    padding: 20px;
    font-size: 14px;
    background-color: #fff;
    border: 1px solid #d8dee2;
    border-radius: 3px;

    .forget-link {
      padding-top: 5px;
      float: right;
      color: #0366d6;
      padding-bottom: 10px;
    }

    .fm-bt {
      display: block;
      width: 100%;
      text-align: center;
    }
  }

  .create-div {
    margin-top: 20px;
    font-size: 14px;
    padding: 15px 20px;
    text-align: center;
    border: 1px solid #d8dee2;
    border-radius: 5px;
    margin-bottom: 30px;
  }
}
</style>

<script>
import Apis from "@/service/api";
import { parseMsg } from "@/common/utils/index";
import { mapGetters, mapMutations } from "vuex";
import "@/common/css/sweetalert.css";
import "@/common/js/sweetalert.min.js";

export default {
  data() {
    return {
      email: "",
      password: "",
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
          },
          settings: {
            domOp: false
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
          },
          settings: {
            domOp: false
          }
        }
      }
    };
  },

  computed: {
    ...mapGetters(["USER_GETTER"])
  },

  methods: {
    ...mapMutations(["RECORD_USERINFO"]),

    async login() {
      // input filter
      if (Object.keys(this.errMsg).length > 0) {
        swal({
          text: "账号或密码错误",
          title: "错误",
          type: "info",
          confirmButtonText: "确认",
          confirmButtonColor: "red"
        });
        return false;
      }
      try {
        const res = await Apis.sendLogin({
          email: this.email,
          password: this.password
        });
        if (res.statusCode === 200) {
          this.RECORD_USERINFO(res);
          this.$router.push({
            path: `/index/${res.user.username}`
          }).catch(err => err);
        } else {
          swal({
            text: res.message,
            title: '错误',
            type: "info",
            confirmButtonText: "确认",
            confirmButtonColor: "red"
          });
        }
      } catch (error) {
        swal({
          text: '服务器异常',
          title: '错误',
          type: "info",
          confirmButtonText: "确认",
          confirmButtonColor: "red"
        });
      }
    }
  }
};
</script>