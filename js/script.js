const local_dev_cors_message = `<br><br><strong>Possible Fixes:</strong><br>This might be a problem with <i>CORS</i> policy, to fix please host the website on any hosting software like <a href="https://vercel.com/" target="_blank">Vercel</a>, Github Pages, <a href="https://cloudflare.com/" target="_blank">Cloudflare Pages</a> etc.`

// markdown it on top (real)
function loadMessage(md) {
    const message = document.querySelector("#message");

    fetch("message.txt")
        .then(response => response.text())
        .then(data => {
            message.innerHTML = md.render(data);
        })
        .catch(error => {
            if (document.location.hostname === "localhost" || document.location.href.startsWith("file://")) {
                message.innerHTML = `An error occurred while fetching the message. <code>${error}</code>${local_dev_cors_message}`;
                return;
            }
            
            message.innerHTML = `An error occurred while fetching the message. <code>${error}</code>`;
        });
}

document.addEventListener('DOMContentLoaded', function() {
    let tempdata = {
        "did_open": false
    }

    const heart = document.querySelector("#solid-heart");
    
    const msg_container = document.querySelector("#message-container");
    
    const backgroundImage = document.querySelector(".background-image");
    
    const md = window.markdownit({html: true});

    loadMessage(md);

    heart.addEventListener("click", function() {
        if (tempdata.did_open) {
            return;
        }
        tempdata.did_open = true;

        backgroundImage.classList.add("show");
        
        const audioPlayer = document.querySelector("#audio-player");
        audioPlayer.volume = 0.1;
        audioPlayer.play();

        msg_container.classList.remove("hidden");
        msg_container.classList.add("flex");
        
        let auto_css_height = msg_container.scrollHeight + 20; // 20 extra padding
        msg_container.classList.remove("h-0");
        msg_container.classList.add(`h-[${auto_css_height}px]`);
        
    });

});
