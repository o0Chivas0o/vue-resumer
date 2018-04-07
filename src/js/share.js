Vue.component('share',{
  template:`
  <div class="share"
         v-cloak>
        <h2>请将下面链接发送给面试官</h2>
        <label>
            <textarea readonly>{{shareLink}}</textarea>
        </label>
        <button class="closeShare"
                @click="$emit('close')">退出
        </button>
    </div>
  `,
  props:['shareLink','shareVisible']
})