Vue.component('app-aside', {
  props:['logoutVisible'],
  template: `
<aside>
        <div class="upper">
            <ul class="actions">
                <li>
                    <button class="button"
                            @click="$emit('clickSave')">保存
                    </button>
                </li>
                <li>
                    <button class="button"
                            @click="$emit('clickShare')">分享
                    </button>
                </li>
                <li>
                    <button class="button"
                            @click="$emit('clickPrint')">打印
                    </button>
                </li>
                <li>
                    <button class="button"
                            @click="$emit('clickChange')">换肤
                    </button>
                </li>
            </ul>
        </div>
        <div class="down">
            <button class="button"
                    @click="$emit('clickLogout')"
                    v-show="logoutVisible">登出
            </button>
        </div>
    </aside>
`
})