const express = require('express');
const router = express.Router();
const tiktokScraper = require('../services/tiktokScraper');
const instagramScraper = require('../services/instagramScraper');
const facebookScraper = require('../services/facebookScraper');

router.get('/', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'Missing required parameter: url' });
    }

    try {
        let videoInfo;
        const lowerUrl = url.toLowerCase();

        if (lowerUrl.includes('tiktok.com')) {
            videoInfo = await tiktokScraper.extract(url);
        } else if (lowerUrl.includes('instagram.com')) {
            videoInfo = await instagramScraper.extract(url);
        } else if (lowerUrl.includes('facebook.com') || lowerUrl.includes('fb.watch')) {
            videoInfo = await facebookScraper.extract(url);
        } else {
            return res.status(400).json({ error: 'Unsupported URL platform' });
        }

        return res.json(videoInfo);

    } catch (error) {
        console.error('Extraction Error:', error.message);
        return res.status(500).json({ error: 'Failed to extract video details', details: error.message });
    }
});

module.exports = router;
