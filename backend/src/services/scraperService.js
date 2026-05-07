import axios from 'axios';
import * as cheerio from 'cheerio';

export const scrapeHackerNews = async () => {
  try {
    const { data } = await axios.get('https://news.ycombinator.com/');
    const $ = cheerio.load(data);
    const stories = [];

    $('.athing').slice(0, 10).each((i, element) => {
      const titleLine = $(element).find('.titleline > a');
      const title = titleLine.text();
      const url = titleLine.attr('href');

      const subtext = $(element).next();
      const points = subtext.find('.score').text().split(' ')[0] || '0';
      const author = subtext.find('.hnuser').text() || 'Unknown';
      const postedAt = subtext.find('.age').attr('title') || subtext.find('.age').text();

      stories.push({
        title,
        url,
        points: parseInt(points, 10),
        author,
        postedAt,
      });
    });

    return stories;
  } catch (error) {
    throw new Error(`Scraping failed: ${error.message}`);
  }
};
