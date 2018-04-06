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
      ],
      projects: [
        {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'},
        {name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'}
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
      let regex = /\[(\d+)\]/g
      key = key.replace(regex, (match, number) => `.${number}`)
      let keys = key.split('.')
      let result = this.resume
      for (let i = 0; i < keys.length; i++) {
        if (i === keys.length - 1) {
          result[keys[i]] = value
        } else {
          result = result[keys[i]]
        }
        // keys = ['skills','0','name']
        // i = 0 result = result['skills'] = this.resume.skills
        // i = 1 result = result['0'] = this.resume.skills.0
        // i = 2 result = result['name'] = this.resume.skills.0.name
        // result = this.resume['skills']['0']['name']
      }
      // this.resume['skills']['0']['name'] = value
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
    getResume () {
      let query = new AV.Query('User')
      query.get(this.currentUser.objectId).then(
        (user) => {
          let resume = user.toJSON().resume
          object.assign(this.resume, resume)
        },
        (error) => {
          // 异常处理
        })
    },
    addSkill () {
      this.resume.skills.push({name: '请填写技能名称', description: '请填写技能描述'})
    },
    removeSkill (index) {
      this.resume.skills.splice(index, 1)
    },
    addProject(){
      this.resume.projects.push({name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'})
    },
    removeProject(index){
      this.resume.projects.splice(index,1)
    }
  }
})

let currentUser = AV.User.current()
if (currentUser) {
  app.currentUser = currentUser.toJSON()
  app.getResume()
}