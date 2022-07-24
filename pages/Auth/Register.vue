<template>
    <div class="form_main_wrap">
        <div class="page_title">
            <h2>회원가입</h2>
        </div>
        <div class="form_white">
            <el-form @submit="checkValidator()" :model="registerForm" :rules="rules"
                     status-icon ref="registerForm" >
                <el-form-item label="닉네임" prop="nickname">
                    <el-input type="text" class="auth-input" id="nickname" autocomplete="off"
                              v-model="registerForm.nickname" placeholder="닉네임을 작성해주세요" />
                </el-form-item>
                <el-form-item label="사용하실 이메일 (로그인 이메일)" prop="email">
                    <el-input type="email" class="auth-input" autocomplete="off"
                              id="email" v-model="registerForm.email" placeholder="email@email.com"/>
                </el-form-item>
                <el-form-item label="비밀번호" prop="password">
                    <el-input type="password" class="auth-input" id="password" loading
                              v-model="registerForm.password"
                              placeholder="비밀번호 입력"/>
                </el-form-item>
                <el-form-item label="비밀번호 확인" prop="password_confirm">
                    <el-input type="password" class="auth-input" id="password_confirm" loading
                              v-model="registerForm.password_confirm"
                              placeholder="비밀번호 확인"/>
                </el-form-item>
                <el-form-item label="지역" prop="addr">
                    <el-input type="text" class="auth-input" id="addr"
                              v-model="registerForm.addr" placeholder="지역을 입력해주세요"/>
                </el-form-item>
                <el-form-item label="지역2" prop="addr1">
                    <el-input type="text" class="auth-input" id="addr1"
                              v-model="registerForm.addr1" placeholder="지역을 입력해주세요"/>
                </el-form-item>
                <el-form-item label="생일" prop="birthday">
                    <el-select class="auth-input" id="birthday"
                               v-model="registerForm.birthday" placeholder="생년월일을 입력해주세요"/>
                </el-form-item>
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
        let validateEmail = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('이메일을 입력해주세요'));
            } else {
                if (!/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/.test(value)) {
                    callback(new Error('올바른 이메일 형식이 아닙니다.'));
                } else {
                    callback();
                }
            }
        }
        let validateNickname = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('닉네임을 입력해주세요.'));
            } else {
                if (value.length < 2) {
                    callback(new Error('닉네임은 2자 이상이어야 합니다.'));
                }
                if (value.length > 20) {
                    callback(new Error('닉네임은 8자 이하로 적어주세요.'));
                }
                let reg = /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/`]/gim;
                value = value.trimStart();
                value = value.trimEnd();
                this.registerForm.username = value;
                if (reg.test(value)) {
                    callback(new Error('이름에는 특수문자를 사용할 수 없습니다.'));
                }

                callback();
            }
        };
        let validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('비밀번호를 입력해주세요.'));
            } else {
                if (value.length < 6) {
                    callback(new Error('비밀번호는 6자 이상이어야 합니다.'));
                }
                if (value.length > 20) {
                    callback(new Error('비밀번호는 20자 이하이어야 합니다.'));
                }
                if (value.search(/[0-9]/) < 0) {
                    callback(new Error('비밀번호는 숫자, 영어, 특수문자를 포함해야 합니다.'));
                }
                if (value.search(/[a-z]/) < 0) {
                    callback(new Error('비밀번호는 숫자, 영어, 특수문자를 포함해야 합니다.'));
                }
                if (value.search(/[~!@#$%^&*()_+|<>?:{}]/) < 0) {
                    callback(new Error('비밀번호는 숫자, 영어, 특수문자를 포함해야 합니다.'));
                }
                callback();
            }
        };
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
            rules: {
                nickname: [ { validator: validateNickname, trigger: 'blur' }, ],
                email: [ { validator: validateEmail, trigger: 'blur' }, ],
                password: [ { validator: validatePassword, trigger: 'blur' }, ],
            },

        }
    },
    mounted() {
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
</style>
