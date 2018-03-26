let app = new Vue({
  el: '#app',
  data: {
    loginVisible: false,
    signUpVisible: false,
    resume: {
      name: '李智颖',
      gender: '男',
      birthday: '1993.06',
      wantedJob: '前端',
      content: '13000000000'
    },
    login:{
      email:'',
      password:''
    },
    signUp:{
      email:'',
      password:''
    }
  },
  methods: {
    onEdit (key, value) {
      this.resume[key] = value
    },
    onLoginIn(){
      AV.User.logIn(this.login.password, this.login.email).then(function (user) {
        console.log(user);
      }, function (error) {
        if(error.code === 211){
          alert('邮箱不存在')
        }else if(error.code === 210){
          alert('邮箱和密码不匹配')
        }
      })
    },
    onSignUp(){
      console.log(this.signUp)
      const user = new AV.User()
      user.setUsername(this.signUp.email)
      user.setPassword(this.signUp.password)
      user.setEmail(this.signUp.email)
      user.signUp().then(function (user) {
        console.log(user);
      }, function (error) {
      });
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
      let {id} = AV.User.current()
      let user = AV.Object.createWithoutData('User', id)
      user.set('resume',this.resume)
      user.save()
    },
    onLogout(){
      AV.User.logOut()
      alert('注销成功')
      window.location.reload()
    }
  }
})