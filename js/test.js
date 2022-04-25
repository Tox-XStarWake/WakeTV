function testPOP(StreamName) {
    alert( StreamName );
}

import('https://embed.twitch.tv/embed/v1.js')

function ViewerStream(ChnlName) {

    var aoptions = {
        channel: StreamName,
        width: 340,
        height: 400,
        layout: "video-with-chat",
        theme: "dark",
        parent: [
            "glitch.com",
            "xstarwake.org",
            "www.xstarwake.org",
            "www-xstarwake-org.glitch.me",
            "localhost",
            ],
      };
      
      var aplayer = new Twitch.Player(ChnlName + "-player", aoptions);
      var aembed = new Twitch.Embed(ChnlName + "-embed", aoptions);
      aplayer.addEventListener(Twitch.Player.READY, initiate)
      aembed.addEventListener(Twitch.Embed.VIDEO_READY, initiate)
    
      function initiate() {
        aplayer.addEventListener(Twitch.Player.ONLINE, handleOnline);
        aplayer.addEventListener(Twitch.Player.OFFLINE, handleOffline);
        aplayer.removeEventListener(Twitch.Player.READY, initiate);
      }
    
      function handleOnline() {
        document.getElementById(ChnlName + "-embed").classList.remove('hide');
        aplayer.removeEventListener(Twitch.Player.ONLINE, handleOnline);
        aplayer.addEventListener(Twitch.Player.OFFLINE, handleOffline);
        aplayer.setMuted(false);
      }
    
      function handleOffline() {
        document.getElementById(ChnlName + "-embed").classList.add('hide');
        aplayer.removeEventListener(Twitch.Player.OFFLINE, handleOffline);
        aplayer.addEventListener(Twitch.Player.ONLINE, handleOnline);
        aplayer.setMuted(true);
      }








  }