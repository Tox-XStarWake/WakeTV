function xstarwake_chat() {
    var xstarwake_iframe = document.createElement('xstarwake-chat-embed');
    xstarwake_iframe.src = "https://www.twitch.tv/embed/xstarwake/chat?parent=www.xstarwake.org"
    document.body.appendChild(xstarwake_iframe);
    xstarwake_iframe.width = "340"
    xstarwake_iframe.height = "400"
    xstarwake_iframe.style.display = 'inline-block';
}
