let app = new Vue({
  el: '#app',
  data: {
    loginVisible: false,
    signUpVisible: false,
    shareVisible: false,
      colorPickerVisible: false,
    previewUser: {
      objectId: undefined,
    },
    previewResume: {},
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
    shareLink: '',
    mode: 'edit', // 'preview'
  },
  computed: {
    displayResume () {
      return this.mode === 'preview' ? this.previewResume : this.resume
    }
  },
  watch: {
    // 监听单个属性的变化
    'currentUser.objectId': function (newValue, oldValue) {
      console.log(newValue)
      if (newValue) {
        this.getResume(this.currentUser).then((resume) => this.resume = resume)
      }
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
    onLogin (user) {
      this.currentUser.objectId = user.objectId
      this.currentUser.email = user.email
      this.loginVisible = false
      location.reload()
    },
    onLogout () {
      AV.User.logOut()
      alert('注销成功')
      window.location.reload()
    },
    getResume (user) {
      let query = new AV.Query('User')
      return query.get(user.objectId).then(
        (user) => {
          let resume = user.toJSON().resume
          return resume
        },
        (error) => {
          // 异常处理
        })
    },
    print () {
      window.print()
    },
    onShare () {
      if (this.hasLogin()) {
        this.shareVisible = true
      } else {
        alert('请先登录')
      }
    },
    hasLogin () {
      return !!this.currentUser.objectId
    }
  }
})

// 获取当前用户
let currentUser = AV.User.current()
if (currentUser) {
  app.currentUser = currentUser.toJSON()
  app.shareLink = location.origin + location.pathname + '?user_id=' + app.currentUser.objectId
  app.getResume(app.currentUser).then(resume => {
    app.resume = resume
  })
}

// 获取预览用户的 id
let search = location.search
let regex = /user_id=([^&]+)/
let matches = search.match(regex)
let userId
if (matches) {
  userId = matches[1]
  app.mode = 'preview'
  app.getResume({objectId: userId}).then(resume => {
    app.previewResume = resume
  })
}