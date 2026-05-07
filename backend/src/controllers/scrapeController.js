import Story from '../models/Story.js';
import { scrapeHackerNews } from '../services/scraperService.js';

export const triggerScrape = async (req, res) => {
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

    res.status(200).json({
      success: true,
      count: savedStories.length,
      stories: savedStories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
