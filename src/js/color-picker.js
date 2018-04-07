Vue.component('colorPicker',{
  template:`
  <div class="colorPicker">
        <button @click="setTheme('default')">默认</button>
        <button @click="setTheme('dark')">暗黑</button>
        <button @click="$emit('close')">退出</button>
    </div>
  `,
  methods:{
    setTheme(name){
      document.body.className = name // 渐进式框架
    }
  },
  props:['colorPickerVisible']
})