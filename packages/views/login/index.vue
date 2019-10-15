<template>
  <el-container class="tax-app-login-container">
    <el-header class="header" height="105px">
      <div class="logo">
        <img
          class="pic-404__child right"
          src="@tax/packages/assets/tax/images/logo/logo_gd.png"
          alt="404"
        />
      </div>
    </el-header>
    <el-main class="main">
      <el-carousel class="carousel-container">
        <el-carousel-item v-for="item in 4" :key="item">
          <div class="carousel-item">
            <img src="http://test.aierp.cn:8089//vendor/img/login/login-bg-1.png" />
          </div>
        </el-carousel-item>
      </el-carousel>
      <div class="form-border">
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="loginRules"
          class="login-form"
          autocomplete="on"
          label-position="left"
        >
          <div class="title-container">
            <h3 class="title">登 录</h3>
          </div>

          <el-form-item prop="loginName">
            <span class="svg-container">
              <!-- <svg-icon icon-class="user" /> -->
            </span>
            <el-input
              ref="loginName"
              v-model="loginForm.loginName"
              placeholder="Username"
              name="loginName"
              type="text"
              tabindex="1"
              autocomplete="on"
            />
          </el-form-item>

          <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
            <el-form-item prop="password">
              <span class="svg-container">
                <!-- <svg-icon icon-class="password" /> -->
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="Password"
                name="password"
                tabindex="2"
                autocomplete="on"
                @keyup.native="checkCapslock"
                @blur="capsTooltip = false"
                @keyup.enter.native="handleLogin"
              />
              <span class="show-pwd" @click="showPwd">
                <!-- <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" /> -->
              </span>
            </el-form-item>
          </el-tooltip>
          <el-button
            :loading="loading"
            type="primary"
            style="width:100%;margin-bottom:30px;"
            @click.native.prevent="handleLogin"
          >Login</el-button>
        </el-form>
      </div>
    </el-main>
    <el-footer class="footer">金财管家v1.0.45.3083 版权所有 © 2018 金财互联数据服务有限公司 粤ICP备14007298号</el-footer>
    <el-dialog title="Or connect with" :visible.sync="showDialog">
      Can not be simulated on local, so please combine you own business simulation! ! !
      <br />
      <br />
      <br />
      <social-sign />
    </el-dialog>
  </el-container>
</template>

<script>
import { validPhone } from "@tax/lib/utils/validate";
export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validPhone(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("The password can not be less than 6 digits"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        loginName: "13760749780",
        password: "Lq123456",
        remember: true
      },
      loginRules: {
        loginName: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  methods: {
    checkCapslock({ shiftKey, key } = {}) {
      if (key && key.length === 1) {
        if (
          (shiftKey && (key >= "a" && key <= "z")) ||
          (!shiftKey && (key >= "A" && key <= "Z"))
        ) {
          this.capsTooltip = true;
        } else {
          this.capsTooltip = false;
        }
      }
      if (key === "CapsLock" && this.capsTooltip === true) {
        this.capsTooltip = false;
      }
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("tax_user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
    register() {
      const parent = window.parent;
      if (!parent) return;
      parent.postMessage &&
        parent.postMessage(
          JSON.stringify({
            type: "new-tag",
            tabName: window.document.title, // 标签标题
            link: "http://www.baidu.com" // 目标页面
          }),
          // 父级域名
          "http://localhost:8003"
        );
    }
  }
};
</script>
