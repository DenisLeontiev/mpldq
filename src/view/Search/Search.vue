<template>
    <main class="view-search">
        <section class="view-section view-section--background-light view-section--bottom-border p-b-50">
            <div class="view-container">
                <div class="view-search-main">
                    <form class="view-search-input" @submit.prevent="search()">
                        <input type="text" placeholder="Пошук..." v-model="searchInput">
                        <button @click.prevent="search()" class="button button--primary">Шукати</button>
                    </form>
                    <div class="view-search-sections">
                        <h5>Розділи:</h5>
                        <div class="view-search-sections-list">
                            <div 
                                class="view-search-sections__item"
                                @click="allSections()"
                            >Усі</div>
                            <div 
                                class="view-search-sections__item js-sections-item" 
                                v-for="(item, index) in sections" :key="index"
                                @click="toggleSection($event, item)"
                            >
                                {{item.name}}
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.8057 2.19444C9.87931 -0.731317 5.1202 -0.731317 2.19383 2.19444C-0.731278 5.1202 -0.731278 9.88053 2.19383 12.8063C3.65702 14.2689 5.57854 14.9998 7.50008 14.9998C9.42163 14.9998 11.3425 14.2688 12.8057 12.8063C15.7314 9.88056 15.7314 5.1202 12.8057 2.19444ZM10.5946 9.71109C10.8391 9.95557 10.8391 10.3508 10.5946 10.5952C10.4727 10.7172 10.3126 10.7785 10.1525 10.7785C9.99248 10.7785 9.83239 10.7172 9.71045 10.5952L7.50005 8.3842L5.29027 10.5946C5.16772 10.7165 5.00762 10.7778 4.84817 10.7778C4.68811 10.7778 4.52801 10.7165 4.40608 10.5946C4.1616 10.3501 4.1616 9.95431 4.40608 9.71044L6.61587 7.50004L4.40547 5.28964C4.16099 5.04516 4.16099 4.64935 4.40547 4.40549C4.64933 4.16101 5.04514 4.16101 5.28962 4.40549L7.50002 6.61589L9.71042 4.40549C9.9549 4.16101 10.3501 4.16101 10.5946 4.40549C10.8391 4.64935 10.8391 5.04516 10.5946 5.28964L8.38418 7.50004L10.5946 9.71109Z" fill="#C4C4C4"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="view-search-tags">
                        <h5>Теги:</h5>
                        <div class="view-search-selector js-view-search-selector">
                            <v-select 
                                :options="tagsList.short" 
                                :placeholder="'Оберіть теги'"
                               
                                :clearable="false" 
                                @open="openSelect"
                                @close="closeSelect"
                                @input="selectTag"
                            >
                                <template #no-options>Нічого не знайдено</template>
                            </v-select>
                        </div>
                        <div class="view-search-tags-list">
                            <div class="view-search-tags-item" 
                                v-for="(item, index) in activeTags" :key="index"
                                @click="removeTag(item)"
                            >
                                {{item}}
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.8057 2.19444C9.87931 -0.731317 5.1202 -0.731317 2.19383 2.19444C-0.731278 5.1202 -0.731278 9.88053 2.19383 12.8063C3.65702 14.2689 5.57854 14.9998 7.50008 14.9998C9.42163 14.9998 11.3425 14.2688 12.8057 12.8063C15.7314 9.88056 15.7314 5.1202 12.8057 2.19444ZM10.5946 9.71109C10.8391 9.95557 10.8391 10.3508 10.5946 10.5952C10.4727 10.7172 10.3126 10.7785 10.1525 10.7785C9.99248 10.7785 9.83239 10.7172 9.71045 10.5952L7.50005 8.3842L5.29027 10.5946C5.16772 10.7165 5.00762 10.7778 4.84817 10.7778C4.68811 10.7778 4.52801 10.7165 4.40608 10.5946C4.1616 10.3501 4.1616 9.95431 4.40608 9.71044L6.61587 7.50004L4.40547 5.28964C4.16099 5.04516 4.16099 4.64935 4.40547 4.40549C4.64933 4.16101 5.04514 4.16101 5.28962 4.40549L7.50002 6.61589L9.71042 4.40549C9.9549 4.16101 10.3501 4.16101 10.5946 4.40549C10.8391 4.64935 10.8391 5.04516 10.5946 5.28964L8.38418 7.50004L10.5946 9.71109Z" fill="#C4C4C4"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="view-search-tags-list view-search-tags-list--mob">
                            <div class="view-search-tags-item" 
                                v-for="(item, index) in activeTags" :key="index"
                                @click="removeTag(item)"
                            >
                                {{item}}
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12.8057 2.19444C9.87931 -0.731317 5.1202 -0.731317 2.19383 2.19444C-0.731278 5.1202 -0.731278 9.88053 2.19383 12.8063C3.65702 14.2689 5.57854 14.9998 7.50008 14.9998C9.42163 14.9998 11.3425 14.2688 12.8057 12.8063C15.7314 9.88056 15.7314 5.1202 12.8057 2.19444ZM10.5946 9.71109C10.8391 9.95557 10.8391 10.3508 10.5946 10.5952C10.4727 10.7172 10.3126 10.7785 10.1525 10.7785C9.99248 10.7785 9.83239 10.7172 9.71045 10.5952L7.50005 8.3842L5.29027 10.5946C5.16772 10.7165 5.00762 10.7778 4.84817 10.7778C4.68811 10.7778 4.52801 10.7165 4.40608 10.5946C4.1616 10.3501 4.1616 9.95431 4.40608 9.71044L6.61587 7.50004L4.40547 5.28964C4.16099 5.04516 4.16099 4.64935 4.40547 4.40549C4.64933 4.16101 5.04514 4.16101 5.28962 4.40549L7.50002 6.61589L9.71042 4.40549C9.9549 4.16101 10.3501 4.16101 10.5946 4.40549C10.8391 4.64935 10.8391 5.04516 10.5946 5.28964L8.38418 7.50004L10.5946 9.71109Z" fill="#C4C4C4"/>
                                </svg>
                            </div>
                        </div>
                </div>
            </div>
        </section>

        <section class="view-section view-section--background-light view-section--bottom-border p-t-50 p-b-60">
            <div class="view-container" v-if="!Array.isArray(searchResult) && mainResultCount == 0 && otherResultCount == 0">
                <div class="view-text">
                    <h3 class="view-title view-title--h3">Нічого не знайдено</h3>
                </div>
            </div>
            <div class="view-container" v-if="mainResultCount > 0 || otherResultCount > 0">
                <div class="view-grid">
                    <div class="view-grid-column view-grid-column--12">
                        <h3 class="view-title view-title--h3">{{mainResult.name}}</h3>
                        <span class="view-search-subtitle">{{mainResultCount}} результатів пошуку</span>
                    </div>
                </div>

                <div class="view-search-result" v-if="mainResult.key =='participants'">
                    <Candidate v-for="(item, index) in searchResult.participants" :key="index" :data="{instance: item.user, instance_category: 'users', instance_id: item.user.id}"></Candidate>
                </div>
                <div class="view-search-result" v-if="mainResult.key =='clinics'">
                    <Organization v-for="(item, index) in searchResult.clinics" :key="index" :data="{instance: item, instance_category: 'clinics', instance_id: item.id}"></Organization>
                </div>
                <div class="view-search-result" v-if="mainResult.key =='organizations'">
                    <Authorities v-for="(item, index) in searchResult.organizations" :key="index" :data="{instance: item, instance_category: 'organizations', instance_id: item.id}"></Authorities>
                </div>
                <div class="view-search-result" v-if="mainResult.key =='news'">
                    <News 
                        v-for="(item, index) in searchResult.news"
                        :key="index"
                        :item="item"
                    ></News>
                </div>
            </div>
        </section>

        <section class="view-section view-section--background-light p-t-50" v-if="otherResultCount > 0">
            <div class="view-container">
                <div class="view-grid">
                    <div class="view-grid-column view-grid-column--12">
                        <h3 class="view-title view-title--h3">Інший результат пошуку</h3>
                        <span class="view-search-subtitle">{{otherResultCount}} результатів пошуку</span>
                    </div>
                </div>

                <div class="view-search-other">
                    <div class="view-search-other__item view-search-other__item--news" v-if="searchResult.news && searchResult.news.length > 0 && mainResult.key !== 'news'">
                        <h4>Новини:</h4>
                        <div class="view-news-list">
                            <News 
                                v-for="(item, index) in searchResult.news"
                                :key="index"
                                :item="item"
                            ></News>
                        </div>
                    </div>

                    <div class="view-search-other__item" v-if="searchResult.clinics && searchResult.clinics.length > 0 && mainResult.key !== 'clinics'">
                        <h4>ЗАКЛАДИ ОХОРОНИ ЗДОРОВ’Я:</h4>
                        <div class="view-search-other-list">
                            <Organization v-for="(item, index) in searchResult.clinics" :key="index" :data="{instance: item, instance_category: 'clinics', instance_id: item.id}"></Organization>
                        </div>
                    </div>

                    <div class="view-search-other__item" v-if="searchResult.organizations && searchResult.organizations.length > 0 && mainResult.key !== 'organizations'">
                        <h4>ОРГАНИ ВЛАДИ:</h4>
                        <div class="view-search-other-list">
                            <Authorities v-for="(item, index) in searchResult.organizations" :key="index" :data="{instance: item, instance_category: 'organizations', instance_id: item.id}"></Authorities>
                        </div>
                    </div>

                    <div class="view-search-other__item" v-if="searchResult.participants && searchResult.participants.length > 0 && mainResult.key !== 'participants'">
                        <h4>Кандидати:</h4>
                        <div class="view-search-other-list">
                            <Candidate v-for="(item, index) in searchResult.participants" :key="index" :data="{instance: item.user, instance: item, instance_category: 'users', instance_id: item.user.id}"></Candidate>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import Authorities from '@/components/Common/ViewAuthoritiesItem'
import Candidate from '@/components/Common/ViewCandidateItem'
import Organization from '@/components/Common/ViewOrganizationItem'
import News from '@/components/Common/ViewNewsItem'

export default {
    data() {
        return {
            searchInput: '',
            selected: '',
            activeSections: [],
            activeTags: [],
            showAll: false,
            sections: [
                        { 
                            name: 'Кандидати', 
                            key: 'participants'
                        },
                        {
                            name: 'Органи влади',
                            key: 'organizations'
                        },
                        {
                            name: 'Лікувальні заклади',
                            key: 'clinics'
                        },
                        {
                            name: 'Новини',
                            key: 'news'
                        }
                    ],
            mainResult: 'participants',
            mainResultCount: 0,
            otherResultCount: 0
        }
    },
    components: {
        Candidate,
        Organization,
        Authorities,
        News,
        vSelect
    },
    computed: {
        ...mapGetters(['searchResult']),
        news() {
			return this.$store.getters.newsList
        },
        tagsList() {
            let tagsList = this.$store.getters.tagsList
            let arr = []
            let fullArr = []
            if (tagsList !== undefined) {
                tagsList.forEach((tag)=>{
                    if(tag.tags.length > 0) {
                        tag.tags.forEach((item)=>{
                            fullArr.push(item)
                            arr.push(`#${item.tag_ua}`)
                        })
                    }
                })
            }
            if(arr.length > 0) {
                return {short: arr, full: fullArr}
            } else {
                return {short: [], full: []}
            }
		},
    },
    methods: {
        ...mapActions(['fetchSearchResult']),
        selectTag(e){
            if(this.activeTags.indexOf(e) === -1) {
                this.activeTags.push(e)
            }
        },
        allSections(){
            if(this.showAll == false) {
                this.activeSections = [...this.sections]
                document.querySelectorAll('.js-sections-item').forEach((elem)=>{
                    elem.classList.add('active')
                })
                if(!Array.isArray(this.searchResult)) {
                    this.search()
                }
            } else {
                this.activeSections = []
                document.querySelectorAll('.js-sections-item').forEach((elem)=>{
                    elem.classList.remove('active')
                })
                if(!Array.isArray(this.searchResult)) {
                    this.search()
                }
            }
            this.showAll = !this.showAll
        },
        toggleSection(event, item){
            if(!event.target.classList.contains('active')) {
                event.target.classList.add('active')
                if(this.activeSections.indexOf(item) === -1) {
                    this.activeSections.push(item)
                    if(!Array.isArray(this.searchResult)) {
                        this.search()
                    }
                }
            } else {
                this.activeSections.splice(this.activeSections.indexOf(item), 1)
                event.target.classList.remove('active')
                 if(!Array.isArray(this.searchResult)) {
                    this.search()
                }
            }
        },
        removeTag(item) {
            this.activeTags.splice(this.activeTags.indexOf(item), 1)
        },
        openSelect(){
            const select = document.querySelector('.js-view-search-selector')
            select.classList.add('view-search-selector--open')
        },
        closeSelect(){
            const select = document.querySelector('.js-view-search-selector')
            select.classList.remove('view-search-selector--open')
        },
        search(){
            this.mainResultCount = 0
            this.otherResultCount = 0
            let activeTagsWithId = []
            if (this.activeTags.length > 0) {
                this.activeTags.forEach((el)=>{
                   const newEl = el.replace(/#/g, '')
                   this.tagsList.full.forEach((tag)=>{
                       if(newEl == tag.tag_ua) {
                           activeTagsWithId.push(tag.id)
                       }
                   })
                })
            }
            const query = {
              category: this.activeSections,
              words: this.searchInput,
              tag_id: activeTagsWithId  
            }
            this.fetchSearchResult({query: query})
        }
    },
    watch: {
        activeSections: {
            immediate: true,
            handler(val) {
                if(val.length > 0){
                    let name = ''
                    this.sections.forEach(el=>{
                     
                        if(el.key == val[0].key) {
                            name = el.name
                             
                        }
                    })
                   
                    this.mainResult = {name: name, key: val[0].key}
                } else {
                    this.mainResult = {name: 'Кандидати', key: 'participants'}
                }
            }
        },
        searchResult: {
            immediate: false,
            handler(val) {
                const section = this.mainResult.key
                this.mainResultCount = val[section].length

                Object.keys(val).forEach(item=>{
                    if(item !== section) {
                        if(val[item]) {
                            this.otherResultCount += val[item].length
                        }
                    }
                })
            }
        }
    },
    async mounted() {
        this.$store.dispatch('fetchNewsList');
       await this.$store.dispatch('fetchTagsList');
        if(this.$route.query.s) {
            this.searchInput = this.$route.query.s
        }
        if(this.$route.query.tags) {
            let elements = JSON.parse(this.$route.query.tags)
            this.tagsList.full.forEach(tag=>{
                if(tag.id == elements) {
                    this.selectTag(`#${tag.tag_ua}`)
                }
            })
            this.search()
        }
	},
}
</script>