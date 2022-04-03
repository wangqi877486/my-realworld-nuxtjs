<template>
    <div class="settings-page">
        <div class="container page">
            <div class="row">

                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">Your Settings</h1>

                    <form @submit.prevent="onSubmit">
                        <fieldset>
                            <fieldset class="form-group">
                                <input v-model="user.image" class="form-control" type="text" placeholder="URL of profile picture">
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name" disabled="disabled">
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea v-model="user.bio" class="form-control form-control-lg" rows="8"
                                        placeholder="Short bio about you"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email" disabled="disabled">
                            </fieldset>
                            <fieldset class="form-group">
                                <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" minlength="8">
                            </fieldset>
                            <button class="btn btn-lg btn-primary pull-xs-right is-disabled">
                                Update Settings
                            </button>
                        </fieldset>
                    </form>
                    <hr>
                    <button class="btn btn-outline-danger" @click="logout">  
                        Or click here to logout.
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import { getCurentUser, updateUser } from '@/api/user'
// import { mapState } from 'vuex'

const Cookie = process.client ? require('js-cookie') : undefined

export default {
    name: 'SettingsIndex',
    data () {
        return {
            user: {
                username: '',
                email: '',
                bio: '',
                image: '',
                password: ''
            }
        }
    },
    mounted () {
        this.getCurentUser()
    },
    // async asyncData ({}) {
    //     const { data } = await getCurentUser()
    //     const user = data.user
    //     console.log(user)
    //     return {
    //         ...user
    //     }
    // },
    methods: {
        async getCurentUser () {
            const { data } = await getCurentUser()
            const user = data.user
            console.log(user)
            this.user = data.user
        },
        async onSubmit () {
            try {
                const { data } = await updateUser({
                    user: this.user
                })
                this.$message
            } catch (err) {

            }
        },
        logout () {
            Cookie.remove('user')
            this.$store.commit('setUser', null)
            this.$router.push('login')
        }
    }
}
</script>

<style>

</style>