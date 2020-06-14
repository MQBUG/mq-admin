var vm = new Vue({
	el: '#login',
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
					// axios.post("http://localhost:8888/login", this.ruleForm).then((res) => {
					// 	console.log(res.data)
					// 	if (res.data.code == 200) {
					// 		window.location.href = "../mdList.html"
					// 		sessionStorage.setItem("userId",res.data.data.id)
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
