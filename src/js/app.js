let app = new Vue({
  el: '#app',
  data: {
    resume: {
      name: '李智颖',
      gender: '男',
      birthday: '1993.06',
      wantedJob: '前端',
      content: '13000000000'
    }
  },
  methods: {
    onEdit(key,value){
      this.resume[key] = value
    }
  }
})