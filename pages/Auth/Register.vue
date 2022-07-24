<template>
    <div class="form_main_wrap">
        <div class="page_title">
            <h2>회원가입</h2>
        </div>
        <div class="form_white">
            <el-form @submit="checkValidator()" :model="registerForm" status-icon ref="registerForm" >
                <div class="form-group p-relative">
                    <label for="nickname">사용 닉네임</label>
                    <el-input type="text" class="auth-input" id="nickname"
                              v-model="registerForm.nickname" placeholder="닉네임을 작성해주세요" />
                    <div class="validation"></div>
                </div>
                <div class="form-group p-relative">
                    <label for="email">사용하실 이메일 (로그인 이메일) </label>
                    <el-input type="email" class="auth-input"
                              id="email" v-model="registerForm.email" placeholder="email@email.com"/>
                    <div class="validation"></div>
                </div>
                <div class="form-group">
                    <div class="p-relative">
                        <label for="password">비밀번호</label>
                        <el-input type="password" class="auth-input" id="password" loading
                                  v-model="registerForm.password"
                                  placeholder="비밀번호 입력"/>
                        <div class="validation"></div>
                    </div>
                    <div class="p-relative">
                        <label for="password_confirm">비밀번호 확인</label>
                        <el-input type="password" class="auth-input" id="password_confirm"
                                  v-model="registerForm.password_confirm"
                                  placeholder="비밀번호 확인" />
                        <div class="validation"></div>
                    </div>
                    <div class="form-group">
                        <div class="p-relative">
                            <label for="addr">지역</label>
                            <el-input type="text" class="auth-input" id="addr"
                                      v-model="registerForm.addr" placeholder="지역을 입력해주세요"/>
                            <div class="validation"></div>
                        </div>
                        <div class="p-relative">
                            <label for="addr1">지역2</label>
                            <el-input type="text" class="auth-input" id="addr1"
                                      v-model="registerForm.addr1" placeholder="지역을 입력해주세요"/>
                            <div class="validation"></div>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="p-relative">
                            <label for="addr">생일</label>
                            <el-select type="text" class="auth-input" id="birthday"
                                      v-model="registerForm.birthday" placeholder="생년월일을 입력해주세요"/>
                            <div class="validation"></div>
                        </div>
                    </div>
                </div>
                <el-button type="submit" class="btn btn-primary">회원가입</el-button>
                <el-button class="btn btn-primary" @click="$router.replace('/')">취소</el-button>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: "RegisterPage",
    transition: 'fade',
    data() {
        return {
            registerForm: {
                nickname: "",
                email: "",
                password: "",
                password_confirm: "",
                addr: "",
                addr1: "",
                birthday: "",
            },
        }
    },
    mounted() {
        this.$nuxt.$loading.start();
    },
    methods: {
        setData(key, value) {
            this[key] = value;
        },
        checkValidator() {
            console.log(">a")
        },
        async register() {
            let params = {
                'nickname': this.registerForm.nickname,
                'email': this.registerForm.email,
                'password': this.registerForm.password,
                'addr': this.registerForm.addr,
                'addr1': this.registerForm.addr1,
                'birthday': this.registerForm.birthday,
            }

            try {
               await this.$api.$auth.createMember(params).then(res => {
                    if (res.info.type === true) {
                        this.$alert.createAlert({
                            title: '축하드립니다!',
                            content: '캠핑친구24 회원이 되신걸 환영합니다.',
                            btnText: '확인',
                            hide: () => {
                                this.$router.replace('/auth/login');
                            },
                        });
                    } else {
                        this.failedAlert();
                    }
                });
            } catch (e) {
                this.failedAlert();
                console.log(e);
            }
        },
        failedAlert() {
            this.$alert.createAlert({
                title: '알림',
                content: '저런.. 회원가입 실패입니다. 다시 시도해주세요.',
                hide: () => {
                    this.$router.replace('/auth/register');
                },
            });
        },

    },
}
</script>

<style lang="scss" scoped>
.form_white {
    width: 800px;
    position: absolute;
    left: 50%;
    margin-left: -400px;
    top: 45%;
    z-index: 11;
    margin-top: -240px;
    text-align: center;
    background-color: #FFFFFF;
    border-radius: 4px;
    box-shadow: #191919 0px 0px 10px;
    padding: 30px
}

form label {
    font-size: 16px;
    color: #222222;
    font-weight: 500;
    margin-bottom: 5px;
    display: block;
    cursor: pointer;
}

.el-input {
    margin-bottom: 30px;
}
</style>
