<template>
  <div class="view-comment">
      <div class="view-comment-col" :class="{'hasDepth' : hasDepth}">
          <router-link :to="`/user/${info.user.id}`" class="view-comment-avatar">
              <img v-if="info.user.avatar !==null && info.user.avatar !== 'none'" :src="info.user.avatar" alt="avatar">
              <div v-else class="view-comment-avatar-holder">
                  {{info.user.name.slice(0,1)}}{{info.user.surname.slice(0,1)}}
              </div>
          </router-link>
      </div>
      <div class="view-comment-col">
          <div class="view-comment-header">
              <router-link :to="`/user/${info.user.id}`">{{info.user.name+ ' ' + info.user.surname}}</router-link>
             
              <span>{{info.created_at}}</span>
          </div>
          <div class="view-comment-content">
              {{info.text}}
          </div>
          <div class="view-comment-bottom" v-if="auth">
            <a href="#" class="view-comment-add" @click.prevent="viewReply = true" v-if="hasReplyBtn">Відповісти</a>
            <a href="#" class="view-comment-remove" @click.prevent="removeComment(info.id)" v-if="isAdmin">Видалити</a>

            <form action="#" v-if="viewReply">
                <span @click.prevent="viewReply = false">X</span>
                <textarea cols="20" rows="10" v-model="commentText"></textarea>
                <button class="button button--primary" @click.prevent="replyComment(info.id)">Надіслати</button>
            </form>
          </div>

          <comment v-for="(node, index) in replys" :key="index"
            :replys="node.replys"
            :info="node"
            :depth="depth+1"
            :auth="auth"
            :params="params"
            :isAdmin="isAdmin"
        ></comment>
      </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    name: 'comment',
    props: ['info', 'replys', 'depth', 'auth', 'params', 'isAdmin'],
    inject: ['token'],
    data() {
        return {
            viewReply: false,
            hasDepth: false,
            hasReplyBtn: true,
            commentText: ''
        }
    },
    methods: {
        ...mapActions(['sendComment', 'deleteComment']),
        showReply() {
            this.viewReply = !this.viewReply
        },
        removeComment(id) {
           if (this.token !== null) {
                this.viewReply = false
                this.deleteComment({id: id, token: this.token})
            } else {
                this.$router.push('/login')
            } 
        },
        replyComment(id){
           if(this.commentText.length > 2) {
                if (this.token !== null) {
                    
                    const params = {
                        post_type : this.params.type,
                        post_id : this.params.id,
                        text : this.commentText
                    }
            
                    this.sendComment({params: params, id: id, token: this.token})
                    this.viewReply = false
                    this.commentText = ''
                } else {
                    this.$router.push('/login')
                }
            }
        }
    },
    mounted() {
        if(this.replys !== undefined) {
            this.hasDepth = this.replys.length !== 0
        } else {
             this.hasDepth = false
        }
        this.depth < 2 ? this.hasReplyBtn = true : this.hasReplyBtn = false
    },
    updated() {
        if(this.replys !== undefined) {
            this.hasDepth = this.replys.length !== 0
        } else {
             this.hasDepth = false
        }
        this.depth < 2 ? this.hasReplyBtn = true : this.hasReplyBtn = false
    }
}
</script>