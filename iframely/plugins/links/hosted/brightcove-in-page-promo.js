/**
 * This plugin relies on whitelist to detect Brightcove's embed-in-page players
 * http://docs.brightcove.com/en/perform/brightcove-player/guides/embed-in-page.html
 */

export default {

    provides: '__promoUri',

    getData: function(cheerio, __allowBrightcoveInPage) {

        /**
         * We are looking for following video on the page, and check that embed is allowed
         * <video <!-- or <video-js> -->
         *     id="video-js-4306274716001"
         *      data-account="1125911414"
         *      data-player="VJ949r8Fg"
         *      data-embed="default"
         *      data-video-id="4306274716001"
         *      data-iframe-url="[ URL of Embed ]"
         *      class="main-media__video-player video-js"
         *      autoplay>
         *  </video>
         *  <script src="//players.brightcove.net/1125911414/VJ949r8Fg_default/index.min.js"></script>
        */

        var $video = cheerio('video.video-js, video-js');

        if ($video.length === 1) {

            var embed = $video.attr('data-embed');
            var account = $video.attr('data-account');
            var player = $video.attr('data-player');
            var video_id = $video.attr('data-video-id') || $video.attr('data-video-origin'); // For origin: https://www.eltiempo.es/videos/la-fuerza-de-la-naturaleza/en-directo-impresionante-erupcion-del-volcan-kilauea-en-hawai-tras-un-terremoto
            var iframeUrl = $video.attr('data-iframe-url');

            // Let's validate
            if (!embed || !account || !player || !video_id) {
                return;
            } 

            if (embed !== 'default' || !/^\d+$/.test(account)) {
                return;
            }

            var uri = 'https://players.brightcove.net/' + account + '/' + player + '_' + embed + '/index.html?videoId=' + video_id;
            uri += __allowBrightcoveInPage === 'autoplay' ? '&autoplay=true' : '';
            uri += iframeUrl ? '&iframe-url=' + Buffer.from(iframeUrl).toString('base64') : '';

            return {
                __promoUri: { url: uri }
            }
        }
    },

    tests: [
        "https://www.military.com/video/aircraft/military-aircraft/tr-3b-aurora-anti-gravity-spacecrafts/2860314511001"
    ]
};