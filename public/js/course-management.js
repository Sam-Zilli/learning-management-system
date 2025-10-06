// Course Management System
console.log('📚 Course Management System Loading...');

// Global variables
let currentCourse = null;
let courses = [];
let courseData = {};

// Manual course loading function (bypasses CORS issues)
async function loadCoursesManually() {
  console.log('📚 Manually loading courses...');
  
  try {
    // Try to load courses with retry logic
    const coursesRef = window.collection(window.db, 'courses');
    const snapshot = await window.getDocs(coursesRef);
    
    courses = [];
    snapshot.forEach((doc) => {
      const course = doc.data();
      courses.push({
        id: doc.id,
        ...course
      });
    });
    
    console.log(`📚 Successfully loaded ${courses.length} courses:`, courses);
    
    // Display courses
    displayCourses();
    
    // Populate course selector dropdown
    populateCourseSelector();
    
    return courses;
    
  } catch (error) {
    console.error('❌ Error manually loading courses:', error);
    
    // If database fails, show a message to user
    const courseGrid = document.getElementById('course-grid');
    if (courseGrid) {
      courseGrid.innerHTML = `
        <div style="text-align: center; padding: 40px;">
          <h3>Database Connection Issue</h3>
          <p>Unable to load courses from database. This might be due to:</p>
          <ul style="text-align: left; max-width: 400px; margin: 0 auto;">
            <li>CORS (Cross-Origin) restrictions</li>
            <li>Firebase configuration issues</li>
            <li>Network connectivity problems</li>
          </ul>
          <p><strong>Solution:</strong> Try refreshing the page or check your Firebase configuration.</p>
          <button onclick="loadCoursesManually()" style="margin-top: 20px; padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
            Retry Loading Courses
          </button>
        </div>
      `;
    }
    
    return [];
  }
}

// Load courses from database
async function loadCourses() {
  console.log('📚 Loading courses from database...');
  
  // Wait for Firebase to be ready
  if (!window.doc || !window.db || !window.getDocs) {
    console.log('⏳ Waiting for Firebase to initialize...');
    await new Promise(resolve => {
      const checkFirebase = setInterval(() => {
        if (window.doc && window.db && window.getDocs) {
          clearInterval(checkFirebase);
          resolve();
        }
      }, 100);
    });
  }

  try {
    // Get all courses from the courses collection
    const coursesRef = window.collection(window.db, 'courses');
    const snapshot = await window.getDocs(coursesRef);
    
    courses = [];
    snapshot.forEach((doc) => {
      const course = doc.data();
      courses.push({
        id: doc.id,
        ...course
      });
    });
    
    console.log(`📚 Loaded ${courses.length} courses:`, courses);
    
    // Display courses
    displayCourses();
    
    // Populate course selector dropdown
    populateCourseSelector();
    
  } catch (error) {
    console.error('❌ Error loading courses:', error);
    showMessage('Error loading courses: ' + error.message, 'error');
  }
}

// Display courses in the course selection screen
function displayCourses() {
  const courseGrid = document.getElementById('course-grid');
  if (!courseGrid) {
    console.log('❌ Course grid element not found');
    return;
  }
  
  console.log(`📚 Displaying ${courses.length} courses`);
  
  courseGrid.innerHTML = '';
  
  if (courses.length === 0) {
    courseGrid.innerHTML = '<p>No courses available. Please contact your administrator.</p>';
    return;
  }
  
  courses.forEach(course => {
    const courseCard = document.createElement('div');
    courseCard.className = 'course-card';
    courseCard.innerHTML = `
      <h3>${course.title}</h3>
      <p>${course.description}</p>
      <div class="course-meta">
        <span class="course-duration">${course.estimatedDuration}</span>
        <span class="course-modules">${course.modules.length} modules</span>
      </div>
    `;
    
    courseCard.addEventListener('click', () => {
      console.log(`📚 Course clicked: ${course.title}`);
      selectCourse(course.id);
    });
    
    courseGrid.appendChild(courseCard);
  });
  
  // Load user progress and update course cards with progress bars
  if (window.loadUserProgressData && window.updateCourseCardsWithProgress) {
    window.loadUserProgressData().then(() => {
      window.updateCourseCardsWithProgress();
    });
  }
  
  // Show the course selection screen
  const courseSelectionScreen = document.getElementById('course-selection-screen');
  const courseContent = document.getElementById('course-content');
  
  if (courseSelectionScreen) {
    courseSelectionScreen.style.display = 'flex';
    console.log('📚 Showing course selection screen');
  }
  
  if (courseContent) {
    courseContent.classList.remove('active');
    console.log('📚 Hiding course content');
  }
}

// Populate course selector dropdown
function populateCourseSelector() {
  const courseSelector = document.getElementById('course-selector');
  if (!courseSelector) return;
  
  courseSelector.innerHTML = '<option value="">Select Course...</option>';
  
  courses.forEach(course => {
    const option = document.createElement('option');
    option.value = course.id;
    option.textContent = course.title;
    courseSelector.appendChild(option);
  });
  
  console.log(`📚 Populated course selector with ${courses.length} courses`);
}

// Select a course and load its content
async function selectCourse(courseId) {
  console.log('📚 Selecting course:', courseId);
  
  const course = courses.find(c => c.id === courseId);
  if (!course) {
    console.error('❌ Course not found:', courseId);
    return;
  }
  
  currentCourse = course;
  
  // Update UI
  document.getElementById('course-title').textContent = course.title;
  document.getElementById('course-selection-screen').style.display = 'none';
  
  const courseContent = document.getElementById('course-content');
  console.log('📚 Course content element:', courseContent);
  courseContent.classList.add('active');
  courseContent.style.display = 'block';
  courseContent.style.visibility = 'visible';
  courseContent.style.opacity = '1';
  console.log('📚 Course content classes:', courseContent.className);
  console.log('📚 Course content display:', courseContent.style.display);
  
  // Update course selector in header
  const courseSelector = document.getElementById('course-selector');
  if (courseSelector) {
    courseSelector.innerHTML = '<option value="">Select Course...</option>';
    courses.forEach(c => {
      const option = document.createElement('option');
      option.value = c.id;
      option.textContent = c.title;
      option.selected = c.id === courseId;
      courseSelector.appendChild(option);
    });
  }
  
  // Load course data (modules and videos)
  await loadCourseData(courseId);
  
  console.log('✅ Course selected:', course.title);
}

// Load course data (modules and videos are already embedded in course)
async function loadCourseData(courseId) {
  console.log('📚 Loading course data for:', courseId);
  
  try {
    // Course data is already loaded with modules and videos embedded
    courseData[courseId] = {
      course: currentCourse,
      modules: {}
    };
    
    // Organize videos by module (videos are already in course.modules)
    currentCourse.modules.forEach(module => {
      courseData[courseId].modules[module.id] = module.videos || [];
    });
    
    console.log('📚 Course data organized:', courseData[courseId]);
    console.log(`📹 Course contains ${currentCourse.modules.length} modules`);
    
    // Create dynamic module tabs with dropdowns
    if (window.createModuleTabs) {
      // Convert modules array to object format for createModuleTabs
      const modulesObject = {};
      currentCourse.modules.forEach(module => {
        modulesObject[module.id] = {
          title: module.title,
          videos: module.videos
        };
      });
      window.createModuleTabs(modulesObject);
      console.log('🎯 Module tabs created with dropdowns');
    }
    
    // Count total videos and questions
    let totalVideos = 0;
    let totalQuestions = 0;
    
    currentCourse.modules.forEach(module => {
      totalVideos += module.videos.length;
      module.videos.forEach(video => {
        totalQuestions += video.questions.length;
      });
    });
    
    console.log(`📊 Total: ${totalVideos} videos and ${totalQuestions} questions`);
    
    // Update module navigation
    updateModuleNavigation(courseId);
    
  } catch (error) {
    console.error('❌ Error loading course data:', error);
  }
}

// Update module navigation based on course
function updateModuleNavigation(courseId) {
  const course = courseData[courseId];
  if (!course) return;
  
  // Update module tabs
  const moduleTabs = document.querySelector('.module-tabs');
  if (moduleTabs) {
    moduleTabs.innerHTML = '';
    
    course.course.modules.forEach((module, index) => {
      const tabButton = document.createElement('button');
      tabButton.className = `tab-btn ${index === 0 ? 'active' : ''}`;
      tabButton.setAttribute('data-module', module.id);
      tabButton.textContent = module.title.replace('🎬 ', '').replace('🚨 ', '').replace('⚖️ ', '');
      moduleTabs.appendChild(tabButton);
    });
  }
  
  // Update module content
  if (course.course.modules.length > 0) {
    updateModuleContent(course.course.modules[0].id);
  }
}

// Update module content (this will be called by module-navigation.js)
function updateModuleContent(moduleKey) {
  if (!currentCourse || !courseData[currentCourse.id]) return;
  
  const course = courseData[currentCourse.id];
  const module = course.course.modules.find(m => m.id === moduleKey);
  const videos = course.modules[moduleKey] || [];
  
  if (!module) return;
  
  // Update module title and description
  const moduleTitleEl = document.getElementById('module-title');
  const moduleDescEl = document.getElementById('module-description');
  
  if (moduleTitleEl) moduleTitleEl.textContent = module.title;
  if (moduleDescEl) moduleDescEl.textContent = module.description;
  
  // Update video navigation
  updateVideoNavigation(moduleKey, videos);
  
  console.log(`📚 Updated module content for ${module.title}`);
}

// Update video navigation
function updateVideoNavigation(moduleKey, videos) {
  // This will be handled by module-navigation.js
  // We just need to make sure the videos are available
  if (window.moduleData) {
    window.moduleData[moduleKey] = {
      title: courseData[currentCourse.id].course.modules.find(m => m.id === moduleKey).title,
      description: courseData[currentCourse.id].course.modules.find(m => m.id === moduleKey).description,
      videos: videos.map(video => ({
        id: video.id,
        title: video.title,
        url: video.url,
        description: video.description,
        length: video.length
      }))
    };
  }
}

// Show message to user
function showMessage(message, type = 'info') {
  console.log(`📢 ${type.toUpperCase()}: ${message}`);
  // You can add a toast notification here if needed
}

// Initialize course management
function initializeCourseManagement() {
  console.log('📚 Initializing Course Management...');
  
  // Load courses when user is authenticated
  if (window.auth && window.auth.currentUser) {
    loadCoursesManually();
  } else {
    // Wait for authentication
    if (window.onAuthStateChanged) {
      window.onAuthStateChanged(window.auth, (user) => {
        if (user) {
          console.log('✅ User authenticated, loading courses...');
          loadCoursesManually();
        }
      });
    }
  }
  
  // Course selector change handler
  const courseSelector = document.getElementById('course-selector');
  if (courseSelector) {
    courseSelector.addEventListener('change', (e) => {
      if (e.target.value) {
        selectCourse(e.target.value);
      }
    });
  }
}

// Show course selection screen manually
function showCourseSelection() {
  const courseSelectionScreen = document.getElementById('course-selection-screen');
  const courseContent = document.getElementById('course-content');
  
  if (courseSelectionScreen) {
    courseSelectionScreen.style.display = 'flex';
    console.log('📚 Manually showing course selection screen');
  }
  
  if (courseContent) {
    courseContent.classList.remove('active');
    console.log('📚 Manually hiding course content');
  }
  
  // Also populate the dropdown
  populateCourseSelector();
}

// Make functions globally available
window.loadCourses = loadCourses;
window.loadCoursesManually = loadCoursesManually;
window.selectCourse = selectCourse;
window.updateModuleContent = updateModuleContent;
window.getCurrentCourse = () => currentCourse;
window.getCourseData = (courseId) => courseData[courseId];
window.populateCourseSelector = populateCourseSelector;
window.showCourseSelection = showCourseSelection;
window.getCourses = () => courses; // Debug function to check loaded courses

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCourseManagement);

console.log('📚 Course Management System Loaded!');
