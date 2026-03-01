// Test all current video URLs to identify working ones
const https = require('https');

// Test a single video URL
function testVideo(url) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    
    const req = https.get(url, (res) => {
      const endTime = Date.now();
      resolve({
        url: url,
        status: res.statusCode,
        responseTime: endTime - startTime,
        working: res.statusCode === 200
      });
    });
    
    req.on('error', (err) => {
      resolve({
        url: url,
        status: 'ERROR',
        responseTime: 0,
        working: false,
        error: err.message
      });
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({
        url: url,
        status: 'TIMEOUT',
        responseTime: 0,
        working: false
      });
    });
  });
}

// Get current courses from server
async function getCurrentCourses() {
  const http = require('http');
  
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:5000/api/courses', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const courses = JSON.parse(data);
          resolve(courses);
        } catch (err) {
          reject(err);
        }
      });
    });
    
    req.on('error', reject);
  });
}

async function testAllCourseVideos() {
  try {
    console.log('Getting current courses...\n');
    const courses = await getCurrentCourses();
    
    console.log(`Found ${courses.length} courses. Testing all video URLs...\n`);
    
    let allVideos = [];
    let workingVideos = [];
    let failedVideos = [];
    
    for (let course of courses) {
      console.log(`\n=== Testing Course: ${course.title} ===`);
      
      for (let section of course.sections) {
        const videoUrl = section.videoUrl;
        allVideos.push({ course: course.title, section: section.title, url: videoUrl });
        
        console.log(`Testing: ${section.title}`);
        
        const result = await testVideo(videoUrl);
        
        if (result.working) {
          console.log(`✅ WORKING - Status: ${result.status}, Time: ${result.responseTime}ms`);
          workingVideos.push({ course: course.title, section: section.title, url: videoUrl, result });
        } else {
          console.log(`❌ NOT WORKING - Status: ${result.status}, Error: ${result.error || 'Unknown'}`);
          failedVideos.push({ course: course.title, section: section.title, url: videoUrl, result });
        }
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }
    
    console.log('\n=== FINAL SUMMARY ===');
    console.log(`Total videos tested: ${allVideos.length}`);
    console.log(`✅ Working videos: ${workingVideos.length}`);
    console.log(`❌ Failed videos: ${failedVideos.length}`);
    
    if (failedVideos.length > 0) {
      console.log('\n❌ FAILED VIDEOS:');
      failedVideos.forEach(v => {
        console.log(`- ${v.course} -> ${v.section}: ${v.url} (${v.result.status})`);
      });
    }
    
    if (workingVideos.length > 0) {
      console.log('\n✅ WORKING VIDEOS:');
      workingVideos.forEach(v => {
        console.log(`- ${v.course} -> ${v.section}: ${v.url}`);
      });
    }
    
    return { workingVideos, failedVideos };
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAllCourseVideos().then(({ workingVideos, failedVideos }) => {
  console.log(`\nTest completed: ${workingVideos.length} working, ${failedVideos.length} failed`);
});
