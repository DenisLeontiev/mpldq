<template>
    <div>
        <section class="view-section view-section--background view-section--bottom-border">
            <div class="view-container">
                <div class="view-comments">
                    <h2 class="view-title--h2">Коментарі</h2>
                    <form v-if="isAuthorized">
                        <label for="field">Коментар</label>
                        <textarea name="field" cols="30" rows="10" v-model="commentText"></textarea>
                        <button class="button button--primary" @click.prevent="sendCommentActions()">Надіслати коментар</button>
                    </form>
                    <div v-else class="view-comments-not-auth">
                        Для можливості залишати власні кометарі, будь ласка, <router-link to="/login">авторизуйтесь</router-link> у системі.
                    </div>
                </div>
            </div>
        </section>
        <section class="view-section view-section--background" v-if="displayedComments !== undefined" >
            <div class="view-container">
                <Comment v-for="(node, index) in displayedComments" 
                    :key="index" :info="node" 
                    :replys="node.replys"
                    :depth="0"
                    :auth="isAuthorized"
                    :params="params"
                    :isAdmin="isAdmin"
                >
                </Comment>

                <div class="ta-center m-t-60" v-if="showMoreBtn">
                    <button class="button button--default" @click="showAllComments()">Всі коментарі</button>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Comment from '@/components/ViewComments/comment';

export default {
    props: {
        params: Object
    },
    provide(){
        return {
            token: this.token
        }
    },
    data() {
        return {
            isAuthorized: false,
            commentsToShow: 5,
            displayedComments: [],
            bufferedComments: [],
            showMoreBtn: true,
            commentText: '',
            textError: false
        }
    },
    components: {
        Comment
    },
    computed: {
        ...mapGetters(['commentsList', 'sendData', 'removeData', 'userStatus']),
        token(){
            let token = window.localStorage.getItem('access_token')
            if (token !== null) {
                return JSON.parse(token).token
            } else {
                return null
            }
        },
        isAdmin(){
            if(this.token !== null) {
                if(this.userStatus !== null) {
                    return this.userStatus.indexOf("admin") !== -1 || this.userStatus.indexOf("moderator") !== -1
                } else {
                    return false
                }
            } else {
                return false
            }
        }
    },
    methods: {
        ...mapActions(['fetchComments', 'sendComment', 'fetchUserStatus']),
        paginate (commentsList) {
			if(commentsList.length) {
                if(commentsList.length > this.commentsToShow) {
                    this.bufferedComments = commentsList.slice(this.commentsToShow, commentsList.length)
                    this.showMoreBtn = true
                    return  commentsList.slice(0, this.commentsToShow);
                } else {
                    this.showMoreBtn = false
                    return commentsList
                }
			}
        },
        showAllComments(){
            this.bufferedComments.forEach(comment => {
                this.displayedComments.push(comment)
            });
            this.bufferedComments = []
            this.showMoreBtn = false
        },
        async sendCommentActions(){
            if(this.commentText.length > 2) {
                if (this.token !== null) {
                    
                    const params = {
                        post_type : this.params.type,
                        post_id : this.params.id,
                        text : this.commentText
                    }
            
                    this.sendComment({params: params, id: "0", token: this.token})
                } else {
                    this.$router.push('/login')
                }
            }
        },
        async getComments(){
            await this.fetchComments({params: this.params});
            this.displayedComments = await this.paginate(this.commentsList)
        },
        
        async adminCheck(){
            if(this.token !== null) {
                await this.fetchUserStatus({category : 'news', token: this.token})
            }
        }
    },
    watch: {
        commentText:{
            immediate: true,
            handler(val) {
                if(val.length < 4) {
                    this.textError = true
                } else {
                    this.textError = false
                }
            }
        },
        token: {
            immediate: true,
            handler(val) {
                if(val !== null) {
                    this.isAuthorized = true
                } else {
                    this.isAuthorized = false
                }
            }
        },
        sendData: {
            immediate: true,
            handler(val) {
                if(val.id !== null || val.id !== undefined) {
                    this.getComments()
                    this.commentText = ''
                }
            }
        },
        removeData: {
            immediate: true,
            handler(val) {
                if(val.message == 'Deleted') {
                    this.getComments()
                    this.commentText = ''
                }
            }
        }
    },
    async mounted(){
        await this.getComments()
        this.displayedComments = await this.paginate(this.commentsList)
        await this.adminCheck()
        
    }
}
</script>