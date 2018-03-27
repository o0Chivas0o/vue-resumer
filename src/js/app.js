let app = new Vue({
  el: '#app',
  data: {
    loginVisible: false,
    signUpVisible: false,
    currentUser: {
      id: undefined,
      email: ''
    },
    resume: {
      name: '李智颖',
      gender: '男',
      birthday: '1993.06',
      wantedJob: '前端',
      content: '13000000000',
      skills: [
        {name: '请填写技能名称', description: '请填写技能描述'},
        {name: '请填写技能名称', description: '请填写技能描述'},
        {name: '请填写技能名称', description: '请填写技能描述'},
        {name: '请填写技能名称', description: '请填写技能描述'}
      ]
    },
    login: {
      email: '',
      password: ''
    },
    signUp: {
      email: '',
      password: ''
    }
  },
  methods: {
    onEdit (key, value) {
      this.resume[key] = value
    },
    onLogin () {
      AV.User.logIn(this.login.email, this.login.password).then(
        (user) => {
          user = user.toJSON()
          this.currentUser.objectId = user.objectId
          this.currentUser.email = user.email
          this.loginVisible = false
        }, (error) => {
          if (error.code === 211) {
            alert('邮箱不存在')
          } else if (error.code === 210) {
            alert('邮箱和密码不匹配')
          }
        })
    },
    onSignUp () {
      let user = new AV.User()
      user.setUsername(this.signUp.email)
      user.setPassword(this.signUp.password)
      user.setEmail(this.signUp.email)
      user.signUp().then(
        (user) => {
          alert('注册成功!')
          user = user.toJSON()
          this.currentUser.objectId = user.objectId
          this.currentUser.email = user.email
          this.signUpVisible = false
        }, (error) => {
          alert(error.rawMessage)
        })
    },
    onClickSave () {
      let currentUser = AV.User.current()
      if (!currentUser) {
        this.loginVisible = true
      } else {
        this.saveResume()
      }
    },
    saveResume () {
      let {objectId} = AV.User.current().toJSON()
      let user = AV.Object.createWithoutData('User', objectId)
      user.set('resume', this.resume)
      user.save().then(
        () => {
          alert('保存成功')
        },
        () => {
          alert('保存失败')
        })
    },
    onLogout () {
      AV.User.logOut()
      alert('注销成功')
      window.location.reload()
    },
    getResume() {
      let query = new AV.Query('User')
      query.get(this.currentUser.objectId).then(
        (user) => {
          let resume = user.toJSON().resume
          object.assign(this.resume,resume)
        },
        (error) => {
          // 异常处理
        })
    }
  }
})

let currentUser = AV.User.current()
if (currentUser) {
  app.currentUser = currentUser.toJSON()
  app.getResume()
}