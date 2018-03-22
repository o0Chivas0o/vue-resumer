Vue.component(
  'editable-span',
  {
    props:['value'],
    template: `
         <span class="editableSpan">
            <span v-show="!editing">{{value}}</span>
            <input v-show="editing" type="text" v-bind:value="value" @input="triggerEdit">
            <button @click="editing = !editing">edit</button>
         </span>
        `,
    data () {
      return {
        editing: false
      }
    },
    methods:{
      triggerEdit(e){
        this.$emit('edit',e.target.value)
      }
    }
  }
)