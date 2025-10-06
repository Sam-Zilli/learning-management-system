// Progress calculation functions
let userVideoProgress = {};

// Load user progress data
async function loadUserProgressData() {
  if (!window.auth?.currentUser) return;
  
  try {
    const userDoc = await window.getDoc(window.doc(window.db, 'users', window.auth.currentUser.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      userVideoProgress = userData.videoProgress || {};
      console.log('📊 Loaded user progress data:', userVideoProgress);
    }
  } catch (error) {
    console.error('❌ Error loading user progress:', error);
  }
}

// Calculate module progress
function calculateModuleProgress(module) {
  if (!module.videos || module.videos.length === 0) return 0;
  
  let completedVideos = 0;
  let totalQuestions = 0;
  let answeredQuestions = 0;
  
  module.videos.forEach(video => {
    const videoProgress = userVideoProgress[video.id];
    if (videoProgress) {
      if (videoProgress.completed) {
        completedVideos++;
      }
      
      // Count questions (assuming each video has questions)
      const videoQuestions = video.questions || [];
      totalQuestions += videoQuestions.length;
      
      // Count answered questions
      if (videoProgress.answeredQuestions) {
        answeredQuestions += videoProgress.answeredQuestions.length;
      }
    }
  });
  
  // Progress is based on both video completion and question completion
  const videoProgress = (completedVideos / module.videos.length) * 50; // 50% weight
  const questionProgress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 50 : 0; // 50% weight
  
  return Math.round(videoProgress + questionProgress);
}

// Calculate course progress
function calculateCourseProgress(course) {
  if (!course.modules || Object.keys(course.modules).length === 0) return 0;
  
  let totalProgress = 0;
  let moduleCount = 0;
  
  Object.values(course.modules).forEach(module => {
    totalProgress += calculateModuleProgress(module);
    moduleCount++;
  });
  
  return moduleCount > 0 ? Math.round(totalProgress / moduleCount) : 0;
}

// Update course cards with progress
function updateCourseCardsWithProgress() {
  const courseCards = document.querySelectorAll('.course-card');
  
  courseCards.forEach(card => {
    const courseId = card.dataset.courseId;
    const course = window.getCourseData(courseId);
    
    if (course) {
      const courseProgress = calculateCourseProgress(course);
      
      // Create or update progress bar
      let progressContainer = card.querySelector('.course-progress-container');
      if (!progressContainer) {
        progressContainer = document.createElement('div');
        progressContainer.className = 'course-progress-container';
        card.appendChild(progressContainer);
      }
      
      progressContainer.innerHTML = `
        <div class="progress-header">
          <span class="progress-label">Course Progress</span>
          <span class="progress-percentage">${courseProgress}%</span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" style="width: ${courseProgress}%"></div>
        </div>
        <div class="module-progress">
          ${Object.entries(course.modules).map(([moduleKey, module]) => {
            const moduleProgress = calculateModuleProgress(module);
            return `
              <div class="module-progress-item">
                <span class="module-name">${module.title}</span>
                <div class="module-progress-bar">
                  <div class="module-progress-fill" style="width: ${moduleProgress}%"></div>
                </div>
                <span class="module-percentage">${moduleProgress}%</span>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }
  });
}

// Make functions globally available
window.loadUserProgressData = loadUserProgressData;
window.updateCourseCardsWithProgress = updateCourseCardsWithProgress;
window.calculateCourseProgress = calculateCourseProgress;
window.calculateModuleProgress = calculateModuleProgress;
