Vue.component('resume', {
  props: ['mode', 'displayResume'],
  data () {
    return {}
  },
  methods: {
    addSkill () {
      this.resume.skills.push({name: '请填写技能名称', description: '请填写技能描述'})
    },
    removeSkill (index) {
      this.resume.skills.splice(index, 1)
    },
    addProject () {
      this.resume.projects.push({name: '请填写项目名称', link: 'http://...', keywords: '请填写关键词', description: '请填写项目描述'})
    },
    removeProject (index) {
      this.resume.projects.splice(index, 1)
    }
  },
  template: `
  <div class="resume">
            <section class="userProfile">
                <h3>
                    <editable-span :disabled="mode === 'preview'"
                                   :value="displayResume.name"
                                   @edit="onEdit('name',$event)"></editable-span>
                </h3>
                <p class="wantJob">应聘职位:
                    <editable-span :disabled="mode === 'preview'"
                                   :value="displayResume.wantedJob"
                                   @edit="onEdit('wantedJob',$event)">
                    </editable-span>
                </p>
                <p class="profile">
                    性别:
                    <editable-span :disabled="mode === 'preview'"
                                   :value="displayResume.gender"
                                   @edit="onEdit('gender',$event)">
                    </editable-span>
                    |
                    出生年月:
                    <editable-span :disabled="mode === 'preview'"
                                   :value="displayResume.birthday"
                                   @edit="onEdit('birthday',$event)">
                    </editable-span>
                    |
                    联系方式:
                    <editable-span :disabled="mode === 'preview'"
                                   :value="displayResume.content"
                                   @edit="onEdit('content',$event)">
                    </editable-span>
                </p>
            </section>
            <section class="skills">
                <h2>技能</h2>
                <ul>
                    <li v-for="(skill,index) in displayResume.skills">
                        <editable-span class="name"
                                       :disabled="mode === 'preview'"
                                       :value="skill.name"
                                       @edit="onEdit('skills['+index+'].name',$event)">
                            {{skill.name}}
                        </editable-span>
                        <div class="description">
                            <editable-span :disabled="mode === 'preview'"
                                           :value="skill.description"
                                           @edit="onEdit('skills['+index+'].description',$event)">
                                {{skill.description}}
                            </editable-span>
                        </div>
                        <span class="remove"
                              v-if="index>=4 && mode==='edit'"
                              @click="removeSkill(index)">x</span>
                    </li>
                    <li class="add"
                        v-if="mode === 'edit'">
                        <span @click="addSkill">添加</span>
                    </li>
                </ul>
            </section>
            <section class="projects">
                <h2>项目经历</h2>
                <ol>
                    <li v-for="(project,index) in displayResume.projects">
                        <header>
                            <div class="start">
                                <h3 class="name">
                                    <editable-span :disabled="mode === 'preview'"
                                                   :value="project.name"
                                                   @edit="onEdit('projects['+index+'].name',$event)">
                                        {{project.name}}
                                    </editable-span>
                                </h3>
                                <span class="link">
                                    <editable-span :disabled="mode === 'preview'"
                                                   :value="project.link"
                                                   @edit="onEdit('projects['+index+'].link',$event)">
                                        {{project.link}}
                                    </editable-span>
                                </span>
                            </div>
                            <div class="end">
                                <span class="keywords">
                                    <editable-span :disabled="mode === 'preview'"
                                                   :value="project.keywords"
                                                   @edit="onEdit('projects['+index+'].keywords',$event)">
                                        {{project.keywords}}
                                    </editable-span>
                                </span>
                            </div>
                        </header>
                        <p class="description">
                            <editable-span :disabled="mode === 'preview'"
                                           :value="project.description"
                                           @edit="onEdit('projects['+index+'].description',$event)">
                                {{project.description}}
                            </editable-span>
                        </p>
                        <span class="remove"
                              v-if="index>=2 && mode==='edit'"
                              @click="removeProject(index)">x</span>
                    </li>
                    <li class="add"
                        v-if="mode === 'edit'">
                        <span @click="addProject">
                            添加
                        </span>
                    </li>
                </ol>
            </section>
        </div>`
})