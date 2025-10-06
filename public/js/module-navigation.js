// Module Navigation JavaScript
// Global video data (will be loaded from database)
let videoData = {};

// Module data (now just contains module structure, videos loaded from DB)
const moduleData = {
    intro: {
      title: '🎬 Intro',
      description: 'Welcome to your benefits training journey. This module provides an introduction to all available benefits and how to navigate the system.',
      videos: [
        { 
          id: 'intro-video-1',
          title: 'Introduction to Benefits', 
          url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1',
          questions: [
            {
              id: 'intro-q1',
              timestamp: 5,
              text: 'What is the main purpose of this benefits training?',
              options: [
                'To learn about health insurance',
                'To understand all available benefits',
                'To complete required training',
                'To access online resources'
              ],
              correctAnswer: 1
            },
            {
              id: 'intro-q2',
              timestamp: 8,
              text: 'How many main benefit categories are covered?',
              options: [
                '3 categories',
                '4 categories', 
                '5 categories',
                '6 categories'
              ],
              correctAnswer: 2
            }
          ]
        },
        { 
          id: 'intro-video-2',
          title: 'Benefits Overview', 
          url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1',
          questions: [
            {
              id: 'overview-q1',
              timestamp: 3,
              text: 'Which benefit covers medical expenses?',
              options: [
                'Dental insurance',
                'Health insurance',
                'Vision insurance',
                'Life insurance'
              ],
              correctAnswer: 1
            }
          ]
        },
        { 
          id: 'intro-video-3',
          title: 'Getting Started', 
          url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1',
          questions: []
        },
        { 
          id: 'intro-video-4',
          title: 'Navigation Guide', 
          url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1',
          questions: []
        },
        { 
          id: 'intro-video-5',
          title: 'Summary', 
          url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1',
          questions: []
        }
      ]
    },
    uhh: {
      title: '🎬 UHH',
      description: 'Learn about UHH benefits and how to access and use them effectively.',
      videos: [
        { 
          id: 'uhh-video-1',
          title: 'UHH Basics', 
          url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1',
          questions: [
            {
              id: 'uhh-q1',
              timestamp: 4,
              text: 'What does UHH stand for?',
              options: [
                'United Health Hospital',
                'Union Health Hospital',
                'Universal Health Hub',
                'Urban Health Hospital'
              ],
              correctAnswer: 1
            }
          ]
        },
        { 
          id: 'uhh-video-2',
          title: 'UHH Features', 
          url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1',
          questions: []
        },
        { 
          id: 'uhh-video-3',
          title: 'UHH Benefits', 
          url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1',
          questions: []
        },
        { 
          id: 'uhh-video-4',
          title: 'UHH Summary', 
          url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1',
          questions: []
        }
      ]
    },
    'harvard-pilgrim': {
      title: '🎬 Harvard Pilgrim',
      description: 'Explore Harvard Pilgrim health benefits and how to maximize your coverage.',
      videos: [
        { title: 'Harvard Pilgrim Overview', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' },
        { title: 'Harvard Pilgrim Benefits', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' },
        { title: 'Harvard Pilgrim Summary', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' }
      ]
    },
    'dental-vision': {
      title: '🎬 Dental and Vision',
      description: 'Learn about your dental and vision benefits and how to access care.',
      videos: [
        { title: 'Dental Benefits', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' },
        { title: 'Vision Benefits', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' },
        { title: 'How to Use', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' },
        { title: 'Summary', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' }
      ]
    },
    gbhe: {
      title: '🎬 GBHE',
      description: 'Discover GBHE benefits and how to access them for your health and wellness.',
      videos: [
        { title: 'GBHE Introduction', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' },
        { title: 'GBHE Features', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' },
        { title: 'GBHE Benefits', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' },
        { title: 'GBHE Usage', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' },
        { title: 'GBHE Summary', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' }
      ]
    },
    'education-legal': {
      title: '🎬 Education and Legal',
      description: 'Access education benefits and legal resources available to you.',
      videos: [
        { title: 'Education Benefits', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' },
        { title: 'Legal Resources', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' },
        { title: 'How to Access', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' },
        { title: 'Important Information', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' },
        { title: 'Summary', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' }
      ]
    },
    more: {
      title: '🎬 More',
      description: 'Additional resources, support services, and important information.',
      videos: [
        { title: 'Additional Resources', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' },
        { title: 'Support Services', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' },
        { title: 'Contact Information', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' },
        { title: 'FAQs', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' },
        { title: 'Conclusion', url: 'https://www.dropbox.com/scl/fi/mmersbm603wsg4iu51rh0/HP-Signup-STEP-2.m4v?rlkey=hm52n8tkw6eqwwx4l3o3axm2h&st=ilg67ayd&raw=1' }
      ]
    }
};

// Load videos from database (now using hierarchical course structure)
async function loadVideosFromDatabase() {
  console.log('📹 Loading videos from database...');
  
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
    // Get all courses from the courses collection (hierarchical structure)
    const coursesRef = window.collection(window.db, 'courses');
    const snapshot = await window.getDocs(coursesRef);
    
    videoData = {};
    snapshot.forEach((doc) => {
      const course = doc.data();
      // Extract videos from course modules
      course.modules.forEach(module => {
        module.videos.forEach(video => {
          videoData[video.id] = {
            ...video,
            courseId: course.id,
            moduleId: module.id
          };
        });
      });
    });
    
    console.log(`📹 Loaded ${Object.keys(videoData).length} videos from hierarchical courses`);
    
    // Update module data with videos from database
    updateModuleDataWithVideos();
    
  } catch (error) {
    console.error('❌ Error loading videos from database:', error);
    // Fall back to hardcoded videos if database fails
    console.log('🔄 Falling back to hardcoded video data');
  }
}

// Update module data with videos from database
function updateModuleDataWithVideos() {
  Object.keys(videoData).forEach(videoId => {
    const video = videoData[videoId];
    const moduleKey = video.moduleId || video.module; // Use moduleId from hierarchical structure
    
    if (moduleData[moduleKey]) {
      // Find or create video entry in module
      let videoIndex = moduleData[moduleKey].videos.findIndex(v => v.id === videoId);
      
      if (videoIndex === -1) {
        // Add new video to module
        moduleData[moduleKey].videos.push({
          id: videoId,
          title: video.title,
          url: video.url,
          description: video.description,
          length: video.length
        });
      } else {
        // Update existing video
        moduleData[moduleKey].videos[videoIndex] = {
          id: videoId,
          title: video.title,
          url: video.url,
          description: video.description,
          length: video.length
        };
      }
    }
  });
  
  console.log('📹 Updated module data with videos from hierarchical database');
}

// Function to update module content
function updateModuleContent(moduleKey) {
  const module = moduleData[moduleKey];
  if (!module) return;


  // Update content
  const moduleTitleEl = document.getElementById('module-title');
  const moduleDescEl = document.getElementById('module-description');
  
  if (moduleTitleEl) moduleTitleEl.textContent = module.title;
  if (moduleDescEl) moduleDescEl.textContent = module.description;

  // Load first video by default
  selectVideo(moduleKey, 0);

  // Update active tab
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.classList.remove('active');
    if (button.getAttribute('data-module') === moduleKey) {
      button.classList.add('active');
    }
  });

  console.log(`Switched to ${module.title}`);
}

// Function to create dynamic module tabs with dropdowns
function createModuleTabs(modules) {
  console.log('🎯 Creating module tabs for:', Object.keys(modules));
  
  const moduleTabsContainer = document.querySelector('.module-tabs');
  if (!moduleTabsContainer) {
    console.error('❌ Module tabs container not found');
    return;
  }
  
  // Clear existing tabs
  moduleTabsContainer.innerHTML = '';
  
  // Create tabs for each module
  Object.keys(modules).forEach((moduleKey, index) => {
    const module = modules[moduleKey];
    console.log(`📚 Creating tab for module: ${module.title} (${moduleKey})`);
    
    // Create dropdown container
    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'tab-dropdown';
    
    // Create main module button
    const moduleButton = document.createElement('button');
    moduleButton.className = `tab-btn ${index === 0 ? 'active' : ''}`;
    moduleButton.setAttribute('data-module', moduleKey);
    moduleButton.textContent = module.title;
    
    // Create dropdown content
    const dropdownContent = document.createElement('div');
    dropdownContent.className = 'dropdown-content';
    // Don't set display: none here - let CSS handle it
    
    console.log(`🔍 Created dropdown for ${module.title} with ${module.videos.length} videos`);
    
    // Add video links to dropdown
    module.videos.forEach((video, videoIndex) => {
      const videoLink = document.createElement('a');
      videoLink.href = '#';
      videoLink.setAttribute('data-module', moduleKey);
      videoLink.setAttribute('data-video', videoIndex.toString());
      videoLink.textContent = video.title;
      videoLink.className = 'video-link';
      
      console.log(`  📹 Added video link: ${video.title}`);
      
      // Add click event listener
      videoLink.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(`🎬 Video clicked: ${moduleKey} - ${videoIndex}`);
        selectVideo(moduleKey, videoIndex);
      });
      
      dropdownContent.appendChild(videoLink);
    });
    
    // Add click event listener to module button
    moduleButton.addEventListener('click', () => {
      console.log(`📚 Module clicked: ${moduleKey}`);
      switchToModule(moduleKey);
    });
    
    // Add hover event listeners for debugging
    dropdownContainer.addEventListener('mouseenter', () => {
      console.log(`🖱️ Mouse entered ${module.title} dropdown`);
      const dropdown = dropdownContainer.querySelector('.dropdown-content');
      console.log('🔍 Dropdown element:', dropdown);
      console.log('🔍 Dropdown display:', dropdown.style.display);
      console.log('🔍 Dropdown computed style:', window.getComputedStyle(dropdown).display);
    });
    
    dropdownContainer.addEventListener('mouseleave', () => {
      console.log(`🖱️ Mouse left ${module.title} dropdown`);
    });
    
    // Assemble the dropdown
    dropdownContainer.appendChild(moduleButton);
    dropdownContainer.appendChild(dropdownContent);
    moduleTabsContainer.appendChild(dropdownContainer);
    
    console.log(`✅ Added dropdown container to DOM for ${module.title}`);
  });
  
  console.log('✅ Module tabs created successfully');
  
  // Set up simple click-based dropdowns
  const allDropdowns = document.querySelectorAll('.dropdown-content');
  console.log(`🔍 Found ${allDropdowns.length} dropdown elements in DOM`);
  
  allDropdowns.forEach((dropdown, index) => {
    // Move dropdown to body to avoid container clipping
    document.body.appendChild(dropdown);
    console.log(`  📦 Moved dropdown ${index} to body`);
    
    // Set up dropdown styling
    dropdown.style.display = 'none'; // Start hidden
    dropdown.style.position = 'fixed';
    dropdown.style.backgroundColor = 'white';
    dropdown.style.border = '2px solid #ea9d37';
    dropdown.style.borderRadius = '8px';
    dropdown.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.2)';
    dropdown.style.zIndex = '99999';
    dropdown.style.minWidth = '250px';
    dropdown.style.padding = '15px';
    dropdown.style.fontSize = '16px';
    
    // Find the corresponding module button
    const moduleButtons = document.querySelectorAll('.tab-btn');
    const moduleButton = moduleButtons[index];
    
    if (moduleButton) {
      // Position dropdown below the module button
      const buttonRect = moduleButton.getBoundingClientRect();
      dropdown.style.top = `${buttonRect.bottom + 10}px`;
      dropdown.style.left = `${buttonRect.left}px`;
      
      // Add click event to module button to toggle dropdown
      moduleButton.addEventListener('click', (e) => {
        console.log(`🖱️ CLICKED module button ${index + 1}:`, moduleButton.textContent);
        console.log(`🔍 Dropdown element:`, dropdown);
        console.log(`🔍 Current dropdown display:`, dropdown.style.display);
        
        e.preventDefault();
        e.stopPropagation();
        
        // Close all other dropdowns
        allDropdowns.forEach((otherDropdown, otherIndex) => {
          if (otherIndex !== index) {
            otherDropdown.style.display = 'none';
            console.log(`🔒 Closed dropdown ${otherIndex + 1}`);
          }
        });
        
        // Show this dropdown
        dropdown.style.display = 'block';
      });
    }
    
    console.log(`  ✅ Set up click toggle for dropdown ${index + 1}`);
  });
  
  // PROPER DROPDOWN SYSTEM - Real dropdowns that appear below buttons
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-btn')) {
      console.log('🎯 TAB BUTTON CLICKED:', e.target.textContent);
      
      // Remove any existing dropdowns
      const existingDropdowns = document.querySelectorAll('.proper-dropdown');
      existingDropdowns.forEach(el => el.remove());
      
      // Find the module data for this button
      const moduleKey = e.target.getAttribute('data-module');
      const module = moduleData[moduleKey];
      
      if (module) {
        // Get button position
        const buttonRect = e.target.getBoundingClientRect();
        
        // Create proper dropdown
        const dropdown = document.createElement('div');
        dropdown.className = 'proper-dropdown';
        dropdown.style.position = 'fixed';
        dropdown.style.top = `${buttonRect.bottom + 5}px`;
        dropdown.style.left = `${buttonRect.left}px`;
        dropdown.style.minWidth = '200px';
        dropdown.style.backgroundColor = 'white';
        dropdown.style.border = '1px solid #e9ecef';
        dropdown.style.borderRadius = '6px';
        dropdown.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.2)';
        dropdown.style.zIndex = '9999999';
        dropdown.style.padding = '8px 0';
        dropdown.style.fontSize = '14px';
        
        // Add video links as proper dropdown items
        module.videos.forEach((video, videoIndex) => {
          const videoLink = document.createElement('a');
          videoLink.href = '#';
          videoLink.style.display = 'block';
          videoLink.style.padding = '12px 16px';
          videoLink.style.color = '#495057';
          videoLink.style.textDecoration = 'none';
          videoLink.style.borderBottom = '1px solid #f8f9fa';
          videoLink.style.fontSize = '14px';
          videoLink.textContent = video.title;
          
          // Hover effect
          videoLink.addEventListener('mouseenter', () => {
            videoLink.style.backgroundColor = '#f8f9fa';
            videoLink.style.color = '#ea9d37';
          });
          
          videoLink.addEventListener('mouseleave', () => {
            videoLink.style.backgroundColor = 'transparent';
            videoLink.style.color = '#495057';
          });
          
          videoLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log(`🎬 Video clicked: ${moduleKey} - ${videoIndex}`);
            selectVideo(moduleKey, videoIndex);
            dropdown.remove(); // Close dropdown after selection
          });
          
          dropdown.appendChild(videoLink);
        });
        
        // Remove border from last item
        const lastItem = dropdown.lastElementChild;
        if (lastItem) {
          lastItem.style.borderBottom = 'none';
        }
        
        document.body.appendChild(dropdown);
        console.log(`✅ Created proper dropdown for ${module.title} with ${module.videos.length} videos`);
      }
    }
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.tab-btn') && !e.target.closest('.proper-dropdown')) {
      const existingDropdowns = document.querySelectorAll('.proper-dropdown');
      existingDropdowns.forEach(el => el.remove());
    }
  });
  
  // Test: Add a simple click handler to all module buttons
  const allModuleButtons = document.querySelectorAll('.tab-btn');
  console.log(`🔍 Found ${allModuleButtons.length} module buttons`);
  allModuleButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      console.log(`🧪 SIMPLE CLICK TEST - Button ${index + 1} clicked:`, button.textContent);
    });
  });
  
  // Close dropdowns when clicking anywhere else
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.tab-btn') && !e.target.closest('.dropdown-content')) {
      allDropdowns.forEach(dropdown => {
        dropdown.style.display = 'none';
      });
    }
  });
}

// Function to switch to a specific module
function switchToModule(moduleKey) {
  console.log('📚 Switching to module:', moduleKey);
  
  const module = moduleData[moduleKey];
  if (!module) {
    console.error('❌ Module not found:', moduleKey);
    return;
  }
  
  // Update module content
  updateModuleContent(moduleKey);
  
  // Load first video of the module
  selectVideo(moduleKey, 0);
  
  // Update active tab
  const tabButtons = document.querySelectorAll('.tab-btn');
  tabButtons.forEach(button => {
    button.classList.remove('active');
    if (button.getAttribute('data-module') === moduleKey) {
      button.classList.add('active');
    }
  });
  
  console.log(`✅ Switched to module: ${module.title}`);
}

// Function to update current video display
function updateCurrentVideo(moduleKey, videoIndex = 0) {
  const module = moduleData[moduleKey];
  if (!module || !module.videos[videoIndex]) return;


  const video = module.videos[videoIndex];
  const videoCounter = document.getElementById('video-counter');
  const nextVideoBtn = document.getElementById('next-video-btn');
  const prevVideoBtn = document.getElementById('prev-video-btn');

  // Update video counter only (video card elements removed)
  videoCounter.textContent = `Video ${videoIndex + 1} of ${module.videos.length}`;

  // Show/hide Previous button
  if (videoIndex > 0) {
    prevVideoBtn.style.display = 'block';
    prevVideoBtn.disabled = false;
  } else {
    prevVideoBtn.style.display = 'none';
  }

  // Show/hide Next button
  if (videoIndex < module.videos.length - 1) {
    nextVideoBtn.style.display = 'block';
    nextVideoBtn.disabled = false;
  } else {
    nextVideoBtn.style.display = 'none';
  }

  console.log(`Updated video display for ${video.title}`);
}

// Function to get current video index for a module
function getCurrentVideoIndex(moduleKey) {
  const videoCounter = document.getElementById('video-counter');
  if (videoCounter) {
    const counterText = videoCounter.textContent;
    const match = counterText.match(/Video (\d+) of/);
    if (match) {
      return parseInt(match[1]) - 1; // Convert to 0-based index
    }
  }
  return 0; // Default to first video
}

// Global variables for video player and quiz system
let currentVideoPlayer = null;
let currentVideoData = null;
let quizQuestions = [];
let answeredQuestions = new Set();
let videoProgress = 0;

// Function to select a specific video and initialize Video.js player
function selectVideo(moduleKey, videoIndex) {
  console.log('🎬 Selecting video:', moduleKey, videoIndex);

  const module = moduleData[moduleKey];
  if (!module || !module.videos[videoIndex]) {
    console.error('❌ Module or video not found:', moduleKey, videoIndex);
    return;
  }

  const video = module.videos[videoIndex];
  currentVideoData = video;
  
  
  // Make sure course content is visible
  const courseContent = document.getElementById('course-content');
  if (courseContent) {
    courseContent.style.display = 'block';
    courseContent.style.visibility = 'visible';
    courseContent.style.opacity = '1';
    courseContent.classList.add('active');
  }
  
  // Update video title
  const videoTitleEl = document.getElementById('video-title');
  if (videoTitleEl) videoTitleEl.textContent = video.title;

  // Initialize Video.js player
  initializeVideoPlayer(video);
  
  // Load quiz questions for this video
  loadQuizQuestions(video);
  
  // Load user progress
  loadUserProgress(video);
  
  console.log('🎬 Video selection complete. Quiz questions loaded:', quizQuestions.length);
  
  console.log(`🎬 Video loaded: ${video.title}`);
  
}

// Initialize Video.js player with anti-skip functionality
function initializeVideoPlayer(video) {
  // Dispose our tracked player if any
  if (currentVideoPlayer) {
    console.log('🎥 Disposing existing Video.js player');
    currentVideoPlayer.dispose();
    currentVideoPlayer = null;
  }

  // Get or create video element
  let videoElement = document.getElementById('course-video');
  if (!videoElement) {
    console.log('🎥 Creating new video element');
    const videoContainer = document.querySelector('.video-container');
    if (!videoContainer) {
      console.error('❌ Video container not found');
      return;
    }
    
    // Create new video element
    videoElement = document.createElement('video');
    videoElement.id = 'course-video';
    videoElement.className = 'video-js vjs-default-skin';
    videoElement.controls = true;
    videoElement.preload = 'auto';
    videoElement.setAttribute('data-setup', '{}');
    videoElement.style.width = '100%';
    videoElement.style.height = '400px';
    
    // Add to container
    videoContainer.innerHTML = '';
    videoContainer.appendChild(videoElement);
  }

  // Initialize Video.js player
  currentVideoPlayer = videojs(videoElement, {
    controls: true,
    preload: 'auto',
    fluid: true,
    responsive: true,
    playbackRates: [0.5, 1, 1.25, 1.5, 2]
  });

  // Prevent skipping forward
  currentVideoPlayer.ready(() => {
    console.log('🎥 Video.js player ready');
    
    // Disable seeking forward beyond current progress (optimized)
    let lastSeekTime = 0;
    currentVideoPlayer.on('seeking', function() {
      const currentTime = this.currentTime();
      const timeDiff = Math.abs(currentTime - videoProgress);
      
      // Only block if seeking significantly forward AND not too frequent
      if (currentTime > videoProgress + 3 && Date.now() - lastSeekTime > 1000) {
        console.log('🚫 Skipping forward prevented');
        this.currentTime(videoProgress);
        lastSeekTime = Date.now();
      }
    });

    // Track progress for anti-skip
    currentVideoPlayer.on('timeupdate', function() {
      videoProgress = this.currentTime();
      
      // Check for quiz questions at current timestamp
      checkForQuizQuestions(this.currentTime());
      
      // Debug: Log every 10 seconds to reduce spam
      if (Math.floor(this.currentTime()) % 10 === 0 && Math.floor(this.currentTime()) !== Math.floor(videoProgress)) {
        console.log(`⏰ Video timeupdate: ${this.currentTime().toFixed(1)}s, Quiz questions: ${quizQuestions.length}`);
      }
    });

    // Handle video end
    currentVideoPlayer.on('ended', function() {
      console.log('🎬 Video ended');
      markVideoCompleted();
    });

    // Load video source
    currentVideoPlayer.src({
      src: video.url,
      type: 'video/mp4'
    });
  });
}

// Load quiz questions for the current video
function loadQuizQuestions(video) {
  quizQuestions = [];
  answeredQuestions.clear();
  
  console.log('🧹 Cleared answered questions for new video');
  
  console.log('🔍 Video data for quiz loading:', video);
  console.log('🔍 Video questions property:', video.questions);
  console.log('🔍 Video keys:', Object.keys(video));
  console.log('🔍 Video title:', video.title);
  console.log('🔍 Video ID:', video.id);
  
  // First check if video has questions embedded
  if (video.questions && video.questions.length > 0) {
    quizQuestions = video.questions.map(q => ({
      ...q,
      timestamp: parseFloat(q.timestamp) // Ensure timestamp is a number
    }));
    console.log(`📚 Loaded ${quizQuestions.length} quiz questions from video data:`, quizQuestions);
  } else {
    // Fallback: Look for questions in hardcoded moduleData
    console.log('🔍 No questions in video data, checking hardcoded moduleData...');
    console.log('🔍 Looking for video with title:', video.title);
    console.log('🔍 Looking for video with ID:', video.id);
    
    // Find the video in moduleData by matching title or ID
    for (const moduleKey in moduleData) {
      const module = moduleData[moduleKey];
      console.log(`🔍 Checking module ${moduleKey} with ${module.videos.length} videos`);
      
      const foundVideo = module.videos.find(v => {
        console.log(`  Comparing: "${v.title}" === "${video.title}" or "${v.id}" === "${video.id}"`);
        return v.title === video.title || v.id === video.id;
      });
      
      if (foundVideo) {
        console.log('✅ Found matching video:', foundVideo);
        if (foundVideo.questions && foundVideo.questions.length > 0) {
          quizQuestions = foundVideo.questions.map(q => ({
            ...q,
            timestamp: parseFloat(q.timestamp)
          }));
          console.log(`📚 Loaded ${quizQuestions.length} quiz questions from hardcoded data:`, quizQuestions);
          break;
        } else {
          console.log('❌ Found video but no questions:', foundVideo);
        }
      }
    }
    
    if (quizQuestions.length === 0) {
      console.log('❌ No quiz questions found for video:', video.title);
      
      // TEST: Add hardcoded questions for "Introduction to Benefits" to test the system
      if (video.title === 'Introduction to Benefits') {
        console.log('🧪 TEST: Adding hardcoded questions for testing');
        quizQuestions = [
          {
            id: `${video.id}-test-q1`,
            timestamp: 3,
            text: 'What is the main purpose of this benefits training?',
            options: [
              'To learn about health insurance',
              'To understand all available benefits',
              'To complete required training',
              'To access online resources'
            ],
            correctAnswer: 1
          },
          {
            id: `${video.id}-test-q2`,
            timestamp: 6,
            text: 'How many main benefit categories are covered?',
            options: [
              '3 categories',
              '4 categories', 
              '5 categories',
              '6 categories'
            ],
            correctAnswer: 2
          }
        ];
        console.log('🧪 TEST: Added', quizQuestions.length, 'test questions');
      }
    }
  }
}

// Check for quiz questions at current timestamp
function checkForQuizQuestions(currentTime) {
  // Debug logging (reduced frequency)
  if (Math.floor(currentTime) % 15 === 0) { // Log every 15 seconds
    console.log(`🔍 Checking quiz at ${currentTime.toFixed(1)}s. Questions: ${quizQuestions.length}, Answered: ${answeredQuestions.size}`);
    if (quizQuestions.length > 0) {
      quizQuestions.forEach((q, i) => {
        const timeDiff = Math.abs(currentTime - q.timestamp);
        console.log(`  Question ${i}: ${q.id} at ${q.timestamp}s (diff: ${timeDiff.toFixed(1)}s, answered: ${answeredQuestions.has(q.id)})`);
      });
    }
  }
  
  const question = quizQuestions.find(q => 
    !answeredQuestions.has(q.id) && 
    Math.abs(currentTime - q.timestamp) < 1 // Within 1 second of timestamp
  );
  
  if (question) {
    console.log('❓ Quiz question triggered at', currentTime);
    pauseVideo();
    showQuizModal(question);
  }
  
  // TEST: Force trigger first question at 3 seconds for testing
  if (currentTime >= 3 && currentTime < 3.1 && quizQuestions.length > 0 && answeredQuestions.size === 0) {
    console.log('🧪 TEST: Forcing quiz question trigger');
    console.log('🧪 Quiz questions available:', quizQuestions);
    console.log('🧪 First question:', quizQuestions[0]);
    pauseVideo();
    showQuizModal(quizQuestions[0]);
  }
}

// Pause video
function pauseVideo() {
  if (currentVideoPlayer && !currentVideoPlayer.paused()) {
    currentVideoPlayer.pause();
  }
}

// Resume video
function resumeVideo() {
  if (currentVideoPlayer && currentVideoPlayer.paused()) {
    currentVideoPlayer.play();
  }
}

// Create quiz modal if it doesn't exist
function createQuizModal() {
  console.log('🔧 Creating quiz modal elements...');
  
  // Create the modal container
  const modal = document.createElement('div');
  modal.id = 'quiz-modal';
  modal.style.cssText = 'display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 1000; justify-content: center; align-items: center;';
  
  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.style.cssText = 'background: white; padding: 30px; border-radius: 10px; max-width: 500px; width: 90%; text-align: center;';
  
  // Create question element
  const questionEl = document.createElement('h3');
  questionEl.id = 'quiz-question';
  questionEl.style.cssText = 'margin-bottom: 20px; color: #333;';
  
  // Create options container
  const optionsEl = document.createElement('div');
  optionsEl.id = 'quiz-options';
  optionsEl.style.cssText = 'margin-bottom: 20px; text-align: left;';
  
  // Create feedback element
  const feedbackEl = document.createElement('div');
  feedbackEl.id = 'quiz-feedback';
  feedbackEl.style.cssText = 'margin-bottom: 20px; font-weight: bold;';
  
  // Create submit button
  const submitBtn = document.createElement('button');
  submitBtn.id = 'quiz-submit';
  submitBtn.textContent = 'Submit Answer';
  submitBtn.style.cssText = 'width: 100%; padding: 12px; background: #ea9d37; color: white; border: none; border-radius: 4px; cursor: pointer;';
  
  // Assemble the modal
  modalContent.appendChild(questionEl);
  modalContent.appendChild(optionsEl);
  modalContent.appendChild(feedbackEl);
  modalContent.appendChild(submitBtn);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  
  console.log('✅ Quiz modal created successfully');
}

// Show quiz modal
function showQuizModal(question) {
  console.log('🎯 showQuizModal called with question:', question);
  const modal = document.getElementById('quiz-modal');
  console.log('🔍 Looking for quiz modal:', modal);
  console.log('🔍 Available elements with "quiz" in ID:', 
    Array.from(document.querySelectorAll('[id*="quiz"]')).map(el => el.id));
  
  const questionEl = document.getElementById('quiz-question');
  const optionsEl = document.getElementById('quiz-options');
  const feedbackEl = document.getElementById('quiz-feedback');
  const submitBtn = document.getElementById('quiz-submit');
  
  if (!modal) {
    console.error('❌ Quiz modal not found');
    console.log('🔍 Creating quiz modal dynamically...');
    createQuizModal();
    return;
  }

  // Set question text
  questionEl.textContent = question.text;
  
  // Clear previous options
  optionsEl.innerHTML = '';
  
  // Create radio buttons for options
  question.options.forEach((option, index) => {
    const label = document.createElement('label');
    label.style.display = 'block';
    label.style.marginBottom = '10px';
    label.style.cursor = 'pointer';
    
    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz-answer';
    radio.value = index;
    radio.style.marginRight = '8px';
    
    const text = document.createElement('span');
    text.textContent = option;
    
    label.appendChild(radio);
    label.appendChild(text);
    optionsEl.appendChild(label);
  });
  
  // Clear feedback
  feedbackEl.textContent = '';
  feedbackEl.style.color = '';
  
  // Reset submit button
  submitBtn.textContent = 'Submit Answer';
  submitBtn.disabled = false;
  submitBtn.onclick = () => handleQuizSubmit(question);
  
  // Show modal
  modal.style.display = 'flex';
}

// Handle quiz submission
function handleQuizSubmit(question) {
  const selectedAnswer = document.querySelector('input[name="quiz-answer"]:checked');
  const feedbackEl = document.getElementById('quiz-feedback');
  const submitBtn = document.getElementById('quiz-submit');
  
  if (!selectedAnswer) {
    feedbackEl.textContent = 'Please select an answer.';
    feedbackEl.style.color = '#f44336';
    return;
  }
  
  const selectedIndex = parseInt(selectedAnswer.value);
  const isCorrect = selectedIndex === question.correctAnswer;
  
  if (isCorrect) {
    feedbackEl.textContent = '✅ Correct!';
    feedbackEl.style.color = '#4caf50';
    submitBtn.textContent = 'Continue';
    submitBtn.onclick = () => closeQuizModal(question, true);
    
  // Mark question as answered
  answeredQuestions.add(question.id);
  console.log('✅ Marked question as answered:', question.id, 'Total answered:', answeredQuestions.size);
    
    // Update progress in database
    updateQuizProgress(question, true);
  } else {
    feedbackEl.textContent = '❌ Incorrect. Try Again.';
    feedbackEl.style.color = '#f44336';
    // Keep modal open for retry
  }
}

// Close quiz modal
function closeQuizModal(question, answeredCorrectly) {
  const modal = document.getElementById('quiz-modal');
  modal.style.display = 'none';
  
  // Resume video
  resumeVideo();
  
  console.log(`✅ Quiz question ${question.id} ${answeredCorrectly ? 'answered correctly' : 'skipped'}`);
}

// Load user progress from database
async function loadUserProgress(video) {
  if (!video.id || !window.auth?.currentUser) return;
  
  try {
    const userDoc = await window.getDoc(window.doc(window.db, 'users', window.auth.currentUser.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      const savedProgress = userData.videoProgress?.[video.id];
      
      if (savedProgress) {
        videoProgress = savedProgress.currentTime || 0;
        // Don't load answered questions for test videos - let them be answered fresh each time
        if (!video.id.includes('test') && !video.title.includes('Introduction to Benefits')) {
          answeredQuestions = new Set(savedProgress.answeredQuestions || []);
          console.log(`📊 Loaded progress for video ${video.id}: ${videoProgress}s, answered questions: ${answeredQuestions.size}`);
        } else {
          console.log(`📊 Loaded progress for video ${video.id}: ${videoProgress}s (test video - not loading answered questions)`);
        }
      }
    }
  } catch (error) {
    console.error('❌ Error loading user progress:', error);
  }
}

// Update quiz progress in database
async function updateQuizProgress(question, isCorrect) {
  if (!currentVideoData?.id || !window.auth?.currentUser) return;
  
  try {
    const userRef = window.doc(window.db, 'users', window.auth.currentUser.uid);
    const userDoc = await window.getDoc(userRef);
    
    const userData = userDoc.exists() ? userDoc.data() : {};
    if (!userData.videoProgress) userData.videoProgress = {};
    if (!userData.videoProgress[currentVideoData.id]) {
      userData.videoProgress[currentVideoData.id] = {
        currentTime: 0,
        answeredQuestions: [],
        completed: false
      };
    }
    
    // Update quiz progress
    const videoProgress = userData.videoProgress[currentVideoData.id];
    if (!videoProgress.answeredQuestions.includes(question.id)) {
      videoProgress.answeredQuestions.push(question.id);
    }
    
    await window.setDoc(userRef, userData);
    console.log(`📊 Updated quiz progress for question ${question.id}`);
  } catch (error) {
    console.error('❌ Error updating quiz progress:', error);
  }
}

// Mark video as completed
async function markVideoCompleted() {
  if (!currentVideoData?.id || !window.auth?.currentUser) return;
  
  try {
    const userRef = window.doc(window.db, 'users', window.auth.currentUser.uid);
    const userDoc = await window.getDoc(userRef);
    
    const userData = userDoc.exists() ? userDoc.data() : {};
    if (!userData.videoProgress) userData.videoProgress = {};
    if (!userData.videoProgress[currentVideoData.id]) {
      userData.videoProgress[currentVideoData.id] = {
        currentTime: 0,
        answeredQuestions: [],
        completed: false
      };
    }
    
    userData.videoProgress[currentVideoData.id].completed = true;
    userData.videoProgress[currentVideoData.id].currentTime = currentVideoPlayer.duration();
    
    await window.setDoc(userRef, userData);
    console.log(`✅ Marked video ${currentVideoData.id} as completed`);
  } catch (error) {
    console.error('❌ Error marking video completed:', error);
  }
}

// Add navigation event listeners
document.addEventListener('DOMContentLoaded', function() {

  // Load videos from database first
  loadVideosFromDatabase().then(() => {
    console.log('📹 Videos loaded, initializing navigation...');
    initializeNavigation();
  });
});

// Initialize navigation after videos are loaded
function initializeNavigation() {
  // Remove the click handlers that interfere with CSS hover
  // The CSS hover rule will handle showing/hiding dropdowns
  
  console.log('🎯 Navigation initialized - using CSS hover for dropdowns');
}


// Make functions available globally
window.createModuleTabs = createModuleTabs;
window.switchToModule = switchToModule;
window.selectVideo = selectVideo;
window.currentVideoData = currentVideoData;
