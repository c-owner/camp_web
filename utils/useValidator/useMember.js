import { ref, reactive } from 'vue';

const useMember = () => {

    const validateEmail = (rule, value, callback) => {
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
    const validateNickname = (rule, value, callback) => {
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

            if (reg.test(value)) {
                callback(new Error('이름에는 특수문자를 사용할 수 없습니다.'));
            }

            callback();
        }
    };
    const validatePassword = (rule, value, callback) => {
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

    const member = reactive({
        registerForm: {

        },
        data: {
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
    });

    return {
        member,
    }
};

export default useMember;

