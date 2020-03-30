<template>
  <b-container class="login-container">
    <div class="logo-brand ml-auto">
      <router-link to="/">
        <img src="../../assets/logo.png" style="width:96px; height:96px; border-radius:50%">
      </router-link>
    </div>
    <div class="fm-header">
      <h1>Sign in to homiepub</h1>
    </div>
    <b-form class="fm-body">
      <b-form-group label="Email" label-for="user">
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
        v-validTrigger="throttleLogin"
        v-hotkey="{'enter': throttleLogin}"
      >Login</b-button>
    </b-form>
    <div class="create-div">
      New to homiepub?
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
import { mapGetters, mapMutations } from "vuex";
import {throttle} from "@/config/utils"

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

  created(){
    this.throttleLogin = throttle(this.login)
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