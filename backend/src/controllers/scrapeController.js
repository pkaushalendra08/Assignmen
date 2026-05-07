import Story from '../models/Story.js';
import { scrapeHackerNews } from '../services/scraperService.js';

export const syncStories = async () => {
  try {
    const scrapedData = await scrapeHackerNews();
    const savedStories = [];

    for (const story of scrapedData) {
      const updatedStory = await Story.findOneAndUpdate(
        { url: story.url },
        story,
        { upsert: true, new: true }
      );
      savedStories.push(updatedStory);
    }
    return savedStories;
  } catch (error) {
    console.error(`[Scraper] Sync failed: ${error.message}`);
    return [];
  }
};

export const triggerScrape = async (req, res) => {
  try {
    const savedStories = await syncStories();
    res.status(200).json({
      success: true,
      count: savedStories.length,
      stories: savedStories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
