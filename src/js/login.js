Vue.component('login', {
  template: `
  <div class="login"
         v-cloak>
        <form class="form"
              @submit.prevent="onLogin">
            <h2>登录</h2>
            <button type="button"
                    @click="$emit('close')">关闭
            </button>
            <div class="row">
                <label for="">邮箱
                    <input type="text"
                           v-model="login.email">
                </label>
            </div>
            <div class="row">
                <label for="">密码
                    <input type="text"
                           v-model="login.password">
                </label>
            </div>
            <div class="actions">
                <button type="submit">登录</button>
                <a href="#"
                   @click="onClickSignUp">
                    注册
                </a>
            </div>
        </form>
    </div>
  `,
  data () {
    return {
      login: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onLogin () {
      AV.User.logIn(this.login.email, this.login.password).then(
        (user) => {
          user = user.toJSON()
          this.$emit('login', user)
        }, (error) => {
          if (error.code === 211) {
            alert('邮箱不存在')
          } else if (error.code === 210) {
            alert('邮箱和密码不匹配')
          }
        })
    },
    onClickSignUp () {
      this.$emit('goToSignUp')
    }
  }
})