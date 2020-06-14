var vm = new Vue({
	el: '#test',
	data: {
		token: ''
	},
	mounted() {
		var that=this
		axios.post(url + 'admin/Login/login').then(function(res) {
			console.log(res)
			that.token=res.data.token
		})
	},
	methods: {
		getData() {
			var that=this
			// axios.defaults.headers.common["token"] = that.token;
			axios.post(url + 'admin/Index/test_index',{},{ headers: {  "token":that.token }})
			.then(function(res) {
				console.log(res)
			})
		}
	}
})
