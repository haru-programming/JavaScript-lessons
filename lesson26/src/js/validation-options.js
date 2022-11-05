const validationTerms = {
    name: {
        upperLimitOfText: 15
    },
    password: {
        pattern: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,}$/
    }
}

export const validationOptions = {
    name: {
        isValid: (target) => {
            return target.value.length < validationTerms.name.upperLimitOfText;
        },
        errorMessage: "ユーザー名は15文字以内で入力してください",
    },
    email: {
        isValid: (target) => {
            return target.validity.valid;
        },
        errorMessage: "メールアドレスの形式になっていません",
    },
    password: {
        isValid: (target) => {
            return validationTerms.password.pattern.test(target.value);
        },
        errorMessage: "8文字以上の大小の英数字を交ぜたものにしてください",
    }
};
