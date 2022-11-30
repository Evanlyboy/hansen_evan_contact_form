import { SendMail } from "./components/mailer.js";

(() => {
    const { createApp } = Vue

    createApp({
        data() {
            return {
                message: 'Hello Vue!',
            }
        },

        methods: {
            processMailFailure(result) {
                // shows a failure message in the UI
                this.$refs.statusMessage.style.display = "block";
                this.$refs.statusMessage.style.backgroundColor = "#a03ce7";
                this.$refs.statusMessage.innerHTML = "";
                this.$refs.statusMessage.innerHTML = "Error! Check your fields";

                // Yeah idk how to work with a stringified JSON file so I'm not gonna bother checking fields. This isn't worth my time right now.
                // result.forEach(field => this.$refs[field].classList.add('error'));
            },

            processMailSuccess(result) {
                // show a success message in the UI
                this.$refs.statusMessage.style.display = "block";
                this.$refs.statusMessage.style.backgroundColor = "#fb5c2c";
                this.$refs.statusMessage.innerHTML = "";
                this.$refs.statusMessage.innerHTML = "Success! You have emailed me. I will reply back as soon as possible";
                // show some UI here to let the user know the mail attempt was successful
            },

            processMail(event) {        
                // use the SendMail component to process mail
                SendMail(this.$el.parentNode)
                    .then(data => this.processMailSuccess(data))
                    .catch(err => this.processMailFailure(err));
            }
        }
    }).mount('#mail-form')
})();