// Test YouTube video URLs
const workingVideos = [
  'https://www.youtube.com/watch?v=HKSRPmJquM', // FreeCodeCamp - Java
  'https://www.youtube.com/watch?v=8jLOx1hDqRo', // Programming with Mosh - Python
  'https://www.youtube.com/watch?v=kUMe1FH4CHE', // Traversy Media - HTML
  'https://www.youtube.com/watch?v=W6NZfCO5SIk', // Net Ninja - JavaScript
  'https://www.youtube.com/watch?v=0-S5a0e2ypw', // React Native
];

console.log('Testing YouTube video URLs...');
workingVideos.forEach((url, index) => {
  console.log(`Video ${index + 1}: ${url}`);
});

// Test one specific video
const testVideoUrl = 'https://www.youtube.com/watch?v=HKSRPmJquM';
console.log(`\nTesting single video: ${testVideoUrl}`);

// Test with curl to see if video is accessible
const https = require('https');

https.get(testVideoUrl, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log('Headers:', res.headers);
}).on('error', (err) => {
  console.error('Error:', err.message);
});
