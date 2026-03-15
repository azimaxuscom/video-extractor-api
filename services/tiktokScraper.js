const axios = require('axios');

async function extract(url) {
    try {
        // We will use the free TikWM API which provides a reliable, open endpoint 
        // for extracting TikTok videos without watermarks, no API key required.
        // Documentation: https://www.tikwm.com/

        const response = await axios.get('https://www.tikwm.com/api/', {
            params: {
                url: url,
                hd: 1
            }
        });

        const data = response.data;

        if (data && data.code === 0 && data.data) {
            const videoData = data.data;
            
            return {
                title: videoData.title || "TikTok Video",
                thumbnailUrl: videoData.cover || "https://placehold.co/400x600?text=TikTok+Thumb",
                downloadUrl: videoData.hdplay || videoData.play, // Get unwatermarked HD url if available
                originalUrl: url,
                platform: "TikTok"
            };
        } else {
            throw new Error(data.msg || "Failed to parse TikTok video from TikWM");
        }
    } catch (error) {
        console.error('TikTok Scraper Error:', error.message);
        throw new Error("TikTok Extraction Failed: " + error.message);
    }
}

module.exports = {
    extract
};
