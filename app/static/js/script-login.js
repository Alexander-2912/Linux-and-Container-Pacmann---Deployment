const formLogin = document.getElementById("form-login")
const API_HOST = 'http://127.0.0.1:5000/api'

window.onload = function() {
    formLogin.addEventListener('submit', (e) =>{
        e.preventDefault();
        const xhr = new XMLHttpRequest()
        const url = API_HOST + "/auth/login"

        const email = document.getElementById("email").value
        const password = document.getElementById("password").value

        //call login api
        const toastTrigger = document.getElementById("liveToast");
        const toastMsg = document.getElementById("toast-body");
        toastMsg.innerHTML = "email atau password salah"
        const toast = new bootstrap.Toast(toastTrigger)

        if (email == '' || password == ''){
            return toast.show()
        }
        const data = JSON.stringify({
            email: email,
            password: password,
        })

        xhr.open("POST", url, true)
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8')
        xhr.onreadystatechange = function(){
            if(this.status == 200){
                const response = JSON.parse(this.response)
                localStorage.setItem('access_token', response.access_token)
                window.location.href = "http://127.0.0.1:5000/"
            }
            else{
                toastMsg.innerHTML = this.response
                toast.show()
            }
        }
        xhr.send(data)
    })
}