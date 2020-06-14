var vm = new Vue({
	el: '#reg',
	data() {
		return {
			ruleForm: {
				name: '',
				pwd: ''
			},
			rules: {
				name: {
					required: true,
					message: '请输入用户名',
					trigger: 'blur'
				},
				pwd: {
					required: true,
					message: '请输入密码',
					trigger: 'blur'
				},
			},

		}
	},
	methods: {
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					// axios.post("http://localhost:8888/reg", this.ruleForm).then((res) => {
					// 	console.log(res.data)
					// 	if (res.data.code == 200) {
					// 		if (res.data.code == 200) {
					// 			layer.msg("注册成功")
					// 			window.location.href = "../login/login.html"
					// 		} else {
					// 			layer.msg("注册失败")
					// 		}
					// 	}
					// 	layer.msg(res.data.message)
					// })
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
	}
})
