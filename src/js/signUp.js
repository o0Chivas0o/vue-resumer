Vue.component('signUp', {
  template: `
  <div class="signUp"
         v-cloak>
        <form class="form"
              @submit.prevent="onSignUp">
            <h2>注册</h2>
            <button type="button"
                    @click="signUpVisible = false">关闭
            </button>
            <div class="row">
                <label for="">邮箱
                    <input type="text"
                           v-model="signUp.email">
                </label>
            </div>
            <div class="row">
                <label for="">密码
                    <input type="text"
                           v-model="signUp.password">
                </label>
            </div>
            <div class="actions">
                <button type="submit">提交</button>
                <a href="#"
                   @click="onClickLogin">登录</a>
            </div>
        </form>
    </div>
  `,
  data () {
    return {
      signUp: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSignUp () {
      let user = new AV.User()
      user.setUsername(this.signUp.email)
      user.setPassword(this.signUp.password)
      user.setEmail(this.signUp.email)
      user.signUp().then(
        (user) => {
          alert('注册成功!')
          user = user.toJSON()
          this.$emit('signUp', user)
        }, (error) => {
          alert(error.rawMessage)
        })
    },
    onClickLogin () {
      this.$emit('goToLogin')
    }
  }
})