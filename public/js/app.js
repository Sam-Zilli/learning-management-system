// Main Application JavaScript
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 DOM Content Loaded');
  
  // JavaScript is running - no need for test styles
  console.log('🎨 JavaScript loaded successfully');
  
  const loadEl = document.querySelector('#load');
  const loginContainer = document.querySelector('#login-container');
  const mainContent = document.querySelector('main.main-content');
  const loginForm = document.querySelector('#login-form');
  const authError = document.querySelector('#auth-error');
  const userEmail = document.querySelector('#user-email');
  const courseVideo = document.querySelector('#course-video');
  const quizModal = document.querySelector('#quiz-modal');
  const quizQuestion = document.querySelector('#quiz-question');
  const quizOptions = document.querySelector('#quiz-options');
  const quizFeedback = document.querySelector('#quiz-feedback');
  const quizSubmit = document.querySelector('#quiz-submit');
  const playButtonOverlay = document.querySelector('#play-button-overlay');
  const headerActions = document.querySelector('.header-actions');

  // DOM elements loaded successfully

  // Wait for Firebase to load
  const checkFirebase = setInterval(() => {
    if (window.auth) {
      clearInterval(checkFirebase);
      loadEl.style.display = 'none';
      initializeAuth();
    }
  }, 100);

  function initializeAuth() {
    // Listen for authentication state changes
    window.onAuthStateChanged(window.auth, (user) => {
      if (user) {
        // User is signed in
        showMainContent(user);
      } else {
        // User is signed out
        showLoginForm();
      }
    });

    // Handle login form submission
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.querySelector('#email').value;
      const password = document.querySelector('#password').value;
      
      try {
        await window.signInWithEmailAndPassword(window.auth, email, password);
        hideError();
      } catch (error) {
        showError(error.message);
      }
    });

    // Handle Google sign-in
    const googleSignInBtn = document.querySelector('#google-signin-btn');
    googleSignInBtn.addEventListener('click', async () => {
      try {
        const provider = new window.GoogleAuthProvider();
        const result = await window.signInWithPopup(window.auth, provider);
        
        // Check if user exists in Firestore, if not create profile
        const userRef = window.doc(window.db, 'users', result.user.uid);
        const userDoc = await window.getDoc(userRef);
        
        if (!userDoc.exists()) {
          // Create user profile for new Google users
          await window.setDoc(userRef, {
            name: result.user.displayName,
            email: result.user.email,
            photoURL: result.user.photoURL,
            createdAt: window.serverTimestamp()
          });
        }
        
        hideError();
      } catch (error) {
        showError('Google sign-in failed: ' + error.message);
      }
    });

    // Handle logout - header button only
    const headerLogoutBtn = document.querySelector('.main-header #logout-btn');
    if (headerLogoutBtn) {
      headerLogoutBtn.addEventListener('click', async () => {
        try {
          console.log('🚪 Logging out user...');
          await window.signOut(window.auth);
          console.log('✅ User logged out successfully');
          // Redirect to login page
          window.location.href = 'index.html';
        } catch (error) {
          console.error('❌ Logout error:', error);
          showError('Logout failed: ' + error.message);
        }
      });
    }


  }

  function showLoginForm() {
    // Create a clean login form
    const newLoginForm = document.createElement('div');
    newLoginForm.innerHTML = `
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); z-index: 99999; min-width: 400px;">
        <h1 style="color: #ea9d37; font-size: 24px; margin-bottom: 16px; text-align: center;">Welcome</h1>
        <p style="margin-bottom: 24px; text-align: center;">Please sign in to access the platform.</p>
        
        <form id="new-login-form">
          <div style="margin-bottom: 16px;">
            <input type="email" id="new-email" placeholder="Email" required style="width: 100%; padding: 12px; margin-bottom: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
          </div>
          <div style="margin-bottom: 16px;">
            <input type="password" id="new-password" placeholder="Password" required style="width: 100%; padding: 12px; margin-bottom: 8px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box;">
          </div>
          <button type="submit" style="width: 100%; padding: 12px; background: #039be5; color: white; border: none; border-radius: 4px; cursor: pointer;">Sign In</button>
        </form>
        
        <div style="margin: 20px 0; text-align: center; color: #666;">
          <span style="background: white; padding: 0 10px;">or</span>
          <hr style="margin: -10px 0; border: none; border-top: 1px solid #ddd;">
        </div>
        
        <button id="new-google-signin-btn" style="width: 100%; padding: 12px; background: white; color: #333; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px;">
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
      </div>
    `;
    document.body.appendChild(newLoginForm);
    
    // Add event listeners to the new login form
    const newLoginFormElement = document.getElementById('new-login-form');
    const newGoogleSigninBtn = document.getElementById('new-google-signin-btn');
    
    if (newLoginFormElement) {
      newLoginFormElement.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('new-email').value;
        const password = document.getElementById('new-password').value;
        
        try {
          await window.signInWithEmailAndPassword(window.auth, email, password);
          console.log('✅ Login successful');
          
          // Immediately remove the login overlay after successful login
          const loginOverlay = document.querySelector('div[style*="position: fixed"]');
          if (loginOverlay) {
            loginOverlay.remove();
            console.log('🔐 Login overlay removed after email/password login');
          }
        } catch (error) {
          console.error('❌ Login failed:', error);
          alert('Login failed: ' + error.message);
        }
      });
    }
    
    if (newGoogleSigninBtn) {
      newGoogleSigninBtn.addEventListener('click', async () => {
        try {
          const provider = new window.GoogleAuthProvider();
          await window.signInWithPopup(window.auth, provider);
          console.log('✅ Google sign-in successful');
          
          // Immediately remove the login overlay after successful Google sign-in
          const loginOverlay = document.querySelector('div[style*="position: fixed"]');
          if (loginOverlay) {
            loginOverlay.remove();
            console.log('🔐 Login overlay removed after Google sign-in');
          }
        } catch (error) {
          console.error('❌ Google sign-in failed:', error);
          alert('Google sign-in failed: ' + error.message);
        }
      });
    }
    
    // Don't hide mainContent since login container is inside it
    
    // Hide course selection screen
    const courseSelectionScreen = document.getElementById('course-selection-screen');
    if (courseSelectionScreen) {
      courseSelectionScreen.style.display = 'none';
    }
    
    // Hide header actions
    if (headerActions) {
      headerActions.style.display = 'none';
    }
  }

  function showMainContent(user) {
    console.log('👤 Showing main content for user:', user.email);
    
    // Hide the login form overlay
    const loginOverlay = document.querySelector('div[style*="position: fixed"]');
    if (loginOverlay) {
      loginOverlay.remove();
      console.log('🔐 Login overlay removed');
    }
    
    loginContainer.style.display = 'none';
    mainContent.style.display = 'block';
    userEmail.textContent = user.email;
    
    // Show header actions
    if (headerActions) {
      headerActions.style.display = 'flex';
    }
    
    // Show course selection screen instead of main content
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
    
    // Initialize video tracking for the logged-in user
    console.log('🎬 Starting video initialization...');
    initializeVideoTracking();
  }

  function showError(message) {
    authError.textContent = message;
    authError.style.display = 'block';
  }

  function hideError() {
    authError.style.display = 'none';
  }

  // Initialize video tracking
  let videoTrackingInitialized = false;
  
  function initializeVideoTracking() {
    console.log('🎥 Initializing video tracking...');
    console.log('🎥 Video tracking already initialized?', videoTrackingInitialized);
    
    if (videoTrackingInitialized) {
      console.log('⚠️ Video tracking already initialized, skipping...');
      return;
    }
    
    videoTrackingInitialized = true;
    console.log('Video element:', courseVideo);
    
    if (!courseVideo) {
      console.error('❌ Video element not found!');
      return;
    }

    // Initialize Video.js player (only if not already initialized)
    let player;
    console.log('🔍 Checking for existing Video.js player...');
    console.log('🔍 videojs.getPlayer result:', videojs.getPlayer('course-video'));
    
    if (videojs.getPlayer('course-video')) {
      player = videojs.getPlayer('course-video');
      console.log('📹 Using existing Video.js player');
      console.log('📹 Existing player ID:', player.id());
    } else {
      console.log('📹 No existing player found, creating new one...');
      player = videojs('course-video', {
        fluid: true,
        responsive: true,
        controls: true,
        preload: 'auto',
        playbackRates: [0.5, 1, 1.25, 1.5, 2],
        width: '100%',
        height: '100%',
        aspectRatio: '16:9',
        // Disable seeking
        seekButtons: false,
        // Disable picture-in-picture
        pictureInPicture: false,
        // Prevent mobile auto-fullscreen
        playsinline: true,
        // Customize controls to remove seek bar
        controlBar: {
          playToggle: true,
          volumePanel: true,
          currentTimeDisplay: true,
          timeDivider: true,
          durationDisplay: true,
          progressControl: false, // This removes the seek bar
          remainingTimeDisplay: false,
          customControlSpacer: true,
          playbackRateMenuButton: true,
          fullscreenToggle: false, // Disable fullscreen
          pictureInPictureToggle: false // Disable picture-in-picture button
        }
      });
      console.log('📹 Created new Video.js player with ID:', player.id());
    }

    // Wait for player to be ready
    player.ready(() => {
      console.log('✅ Video.js player ready');
      
      // Set up event listeners using Video.js API
      player.on('loadstart', () => console.log('📹 Video load started'));
      player.on('loadedmetadata', () => {
        console.log('📹 Video metadata loaded');
        console.log('📹 Video duration:', player.duration());
      });
      player.on('loadeddata', () => {
        console.log('📹 Video data loaded');
        console.log('📹 Video current source:', player.currentSrc());
      });
      player.on('canplay', () => {
        console.log('📹 Video can play');
        console.log('📹 Video dimensions:', player.videoWidth() + 'x' + player.videoHeight());
      });
      player.on('canplaythrough', () => console.log('📹 Video can play through'));
      player.on('error', (e) => {
        console.error('❌ Video error:', e);
        console.error('Video error details:', player.error());
      });
      player.on('play', () => {
        console.log('📹 Video playing');
        console.log('🎬 Video started playing');
        
        // Only reset session tracking if we're not resuming from a quiz
        if (!isResumingFromQuiz) {
          // Reset session quiz tracking when video starts playing
          // This ensures quizzes appear every time the video is watched
          sessionQuizShown = {};
          lastQuizTriggerTime = {};
          console.log('🔄 Reset quiz session tracking - quizzes will appear again');
        } else {
          console.log('🔄 Resuming from quiz - keeping session tracking');
          isResumingFromQuiz = false; // Reset the flag
        }
      });
      player.on('pause', () => console.log('📹 Video paused'));
      player.on('ended', () => {
        console.log('📹 Video ended');
        markVideoCompleted('intro-video-1'); // Pass explicit videoId
      });
      player.on('timeupdate', () => {
        // Quiz triggers are now handled in module-navigation.js
        // checkQuizTriggers();
      });
      player.on('suspend', () => console.log('📹 Video suspended'));
      
      // Prevent seeking entirely (reduced logging)
      let lastSeekLog = 0;
      player.on('seeking', (e) => {
        if (Date.now() - lastSeekLog > 2000) { // Log max once every 2 seconds
          console.log('🚫 Seeking attempt blocked');
          lastSeekLog = Date.now();
        }
        e.preventDefault();
        // Reset to previous time
        const currentTime = player.currentTime();
        player.currentTime(currentTime);
      });
      
      player.on('seeked', (e) => {
        // Reduced logging for seeked events
        e.preventDefault();
      });

      // Prevent fullscreen via any method
      player.on('fullscreenchange', (e) => {
        console.log('🚫 Fullscreen change blocked');
        e.preventDefault();
        e.stopPropagation();
        if (player.isFullscreen()) {
          player.exitFullscreen();
        }
      });

      // Block fullscreen keyboard shortcuts
      document.addEventListener('keydown', (e) => {
        // Block F11 and other fullscreen shortcuts
        if (e.key === 'F11' || (e.key === 'f' && e.ctrlKey && e.shiftKey)) {
          e.preventDefault();
          e.stopPropagation();
          console.log('🚫 Fullscreen keyboard shortcut blocked');
        }
      });

      // Block double-click fullscreen
      player.on('dblclick', (e) => {
        console.log('🚫 Double-click fullscreen blocked');
        e.preventDefault();
        e.stopPropagation();
      });

      // Prevent picture-in-picture (mini player) functionality
      player.on('enterpictureinpicture', (e) => {
        console.log('🚫 Picture-in-picture enter blocked');
        e.preventDefault();
        e.stopPropagation();
        if (document.pictureInPictureElement) {
          document.exitPictureInPicture();
        }
      });

      player.on('leavepictureinpicture', (e) => {
        console.log('🚫 Picture-in-picture leave blocked');
        e.preventDefault();
        e.stopPropagation();
      });

      // Block picture-in-picture via browser API
      if (document.pictureInPictureEnabled) {
        document.addEventListener('enterpictureinpicture', (e) => {
          console.log('🚫 Browser picture-in-picture blocked');
          e.preventDefault();
          e.stopPropagation();
          if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
          }
        });
      }

      // Disable picture-in-picture on the video element itself
      const videoElement = player.el().querySelector('video');
      if (videoElement) {
        videoElement.disablePictureInPicture = true;
        videoElement.addEventListener('enterpictureinpicture', (e) => {
          console.log('🚫 Video element picture-in-picture blocked');
          e.preventDefault();
          e.stopPropagation();
          if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
          }
        });
        
        // Set playsinline attributes directly on video element for mobile
        videoElement.setAttribute('playsinline', 'true');
        videoElement.setAttribute('webkit-playsinline', 'true');
        videoElement.playsInline = true;
        videoElement.webkitPlaysInline = true;
        
        console.log('📱 Set playsinline attributes on video element');
      }

      // Mobile-specific fullscreen prevention
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      if (isMobile) {
        console.log('📱 Mobile device detected - applying mobile fullscreen prevention');
        
        // Prevent mobile auto-fullscreen on play
        player.on('play', () => {
          console.log('🚫 Mobile play fullscreen blocked');
          setTimeout(() => {
            if (player.isFullscreen()) {
              console.log('🚫 Forcing exit from mobile play fullscreen');
              player.exitFullscreen();
            }
          }, 50);
        });
        
        // Prevent mobile fullscreen via orientation change
        window.addEventListener('orientationchange', () => {
          console.log('🚫 Mobile orientation change fullscreen blocked');
          setTimeout(() => {
            if (player.isFullscreen()) {
              player.exitFullscreen();
            }
          }, 100);
        });
        
        // Prevent mobile fullscreen via touch gestures
        videoElement.addEventListener('touchstart', (e) => {
          e.preventDefault();
          e.stopPropagation();
        }, { passive: false });
        
        videoElement.addEventListener('touchend', (e) => {
          e.preventDefault();
          e.stopPropagation();
        }, { passive: false });
        
        // Prevent mobile fullscreen via double-tap
        let lastTouchEnd = 0;
        videoElement.addEventListener('touchend', (e) => {
          const now = (new Date()).getTime();
          if (now - lastTouchEnd <= 300) {
            console.log('🚫 Mobile double-tap fullscreen blocked');
            e.preventDefault();
            e.stopPropagation();
          }
          lastTouchEnd = now;
        }, { passive: false });
        
        // Prevent mobile fullscreen via long press
        videoElement.addEventListener('contextmenu', (e) => {
          console.log('🚫 Mobile context menu fullscreen blocked');
          e.preventDefault();
          e.stopPropagation();
        });
        
        // Prevent mobile fullscreen via swipe gestures
        videoElement.addEventListener('gesturestart', (e) => {
          console.log('🚫 Mobile gesture fullscreen blocked');
          e.preventDefault();
          e.stopPropagation();
        });
        
        videoElement.addEventListener('gesturechange', (e) => {
          console.log('🚫 Mobile gesture change fullscreen blocked');
          e.preventDefault();
          e.stopPropagation();
        });
        
        videoElement.addEventListener('gestureend', (e) => {
          console.log('🚫 Mobile gesture end fullscreen blocked');
          e.preventDefault();
          e.stopPropagation();
        });
        
        // Continuous fullscreen check for mobile
        setInterval(() => {
          if (player.isFullscreen()) {
            console.log('🚫 Mobile fullscreen detected - forcing exit');
            player.exitFullscreen();
          }
        }, 1000);
      }
      
      // Store player reference globally
      window.videoPlayer = player;
    });

    // Add video event listeners for debugging
    courseVideo.addEventListener('loadstart', () => console.log('📹 Video load started'));
    courseVideo.addEventListener('loadedmetadata', () => console.log('📹 Video metadata loaded'));
    courseVideo.addEventListener('loadeddata', () => {
      console.log('📹 Video data loaded');
      console.log('📹 Video current source:', courseVideo.currentSrc);
      console.log('📹 Video duration:', courseVideo.duration);
    });
    courseVideo.addEventListener('canplay', () => {
      console.log('📹 Video can play');
      console.log('📹 Video dimensions:', courseVideo.videoWidth + 'x' + courseVideo.videoHeight);
    });
    courseVideo.addEventListener('canplaythrough', () => console.log('📹 Video can play through'));
    courseVideo.addEventListener('error', (e) => {
      console.error('❌ Video error:', e);
      console.error('Video error details:', courseVideo.error);
      console.error('Video error code:', courseVideo.error?.code);
      console.error('Video error message:', courseVideo.error?.message);
      console.error('Video source:', courseVideo.src);
      console.error('Video current source:', courseVideo.currentSrc);
      console.error('Video network state:', courseVideo.networkState);
      console.error('Video ready state:', courseVideo.readyState);
    });
    courseVideo.addEventListener('load', () => console.log('📹 Video loaded successfully'));
    courseVideo.addEventListener('stalled', () => {
      console.log('📹 Video stalled - trying to resume...');
      // Try to resume playback after a short delay
      setTimeout(() => {
        if (courseVideo.paused) {
          console.log('📹 Attempting to resume stalled video...');
          courseVideo.play().catch(e => console.log('📹 Could not resume video:', e));
        }
      }, 1000);
    });
    courseVideo.addEventListener('suspend', () => console.log('📹 Video suspended'));
    courseVideo.addEventListener('waiting', () => console.log('📹 Video waiting for data'));
    courseVideo.addEventListener('playing', () => {
      console.log('📹 Video playing');
      playButtonOverlay.style.display = 'none';
    });
    courseVideo.addEventListener('pause', () => console.log('📹 Video paused'));
    
    // Log video source for debugging
    console.log('🎥 Video source URL:', courseVideo.src);
    console.log('🎥 Video current source:', courseVideo.currentSrc);

    // Load existing completion status
    loadVideoCompletion();
    
    // Track video completion
    courseVideo.addEventListener('ended', () => markVideoCompleted('intro-video-1'));

    // Initialize quiz system
    initializeQuizSystem();
    
    console.log('✅ Video tracking initialized successfully');
  }

  // Quiz data will be loaded from Firebase
  let quizData = [];
  let currentQuizIndex = 0;
  let selectedAnswer = null;
  let quizProgress = {};
  let sessionQuizShown = {}; // Track quizzes shown in current session
  let lastQuizTriggerTime = {}; // Track when each quiz was last triggered
  let isResumingFromQuiz = false; // Track if we're resuming from a quiz

  // Get current video ID from the active video
  function getCurrentVideoId() {
    const activeTab = document.querySelector('.tab-btn.active');
    if (!activeTab) return 'intro-video-1'; // fallback
    
    const moduleKey = activeTab.getAttribute('data-module');
    const currentVideoIndex = getCurrentVideoIndex(moduleKey);
    
    // Find the video ID from current course data
    const currentCourse = window.getCurrentCourse();
    if (currentCourse) {
      const module = currentCourse.modules.find(m => m.id === moduleKey);
      if (module && module.videos[currentVideoIndex]) {
        return module.videos[currentVideoIndex].id;
      }
    }
    
    // Fallback to module data if available
    if (window.moduleData && window.moduleData[moduleKey] && window.moduleData[moduleKey].videos[currentVideoIndex]) {
      return window.moduleData[moduleKey].videos[currentVideoIndex].id || 'intro-video-1';
    }
    
    return 'intro-video-1'; // fallback
  }

  async function loadQuizData(videoId = 'intro-video-1') {
    try {
      console.log('📚 Loading quiz data for video:', videoId);
      
      // Get current course and find the video with questions
      const currentCourse = window.getCurrentCourse();
      if (!currentCourse) {
        console.log('❌ No current course selected');
        quizData = [];
        return;
      }
      
      // Find the video in the course hierarchy
      let videoData = null;
      for (const module of currentCourse.modules) {
        const video = module.videos.find(v => v.id === videoId);
        if (video) {
          videoData = video;
          break;
        }
      }
      
      if (videoData) {
        quizData = videoData.questions || [];
        console.log('✅ Quiz data loaded from video:', videoData.title);
        console.log('📊 Number of questions loaded:', quizData.length);
        
        if (quizData.length > 0) {
          console.log('📋 First question:', quizData[0]);
          console.log('📋 All question timestamps:', quizData.map(q => q.timestamp));
        }
        
        // Sort questions by timestamp to ensure proper order
        quizData.sort((a, b) => a.timestamp - b.timestamp);
        console.log('📚 Quiz questions sorted by timestamp');
        
      } else {
        console.log('⚠️ No quiz config found in Firebase');
        quizData = []; // No fallback questions - empty array
      }
      
    } catch (error) {
      console.error('❌ Error loading quiz data:', error);
      quizData = []; // No fallback questions - empty array
    }
  }

  async function initializeQuizSystem() {
    // Load quiz data from Firebase first
    await loadQuizData();
    
    // Load existing quiz progress
    loadQuizProgress();

    // Set up quiz modal event listeners
    console.log('🔘 Setting up quiz submit button listener');
    console.log('Quiz submit button element:', quizSubmit);
    
    if (quizSubmit) {
      quizSubmit.addEventListener('click', handleQuizSubmit);
      console.log('✅ Quiz submit button listener added');
    } else {
      console.error('❌ Quiz submit button not found!');
    }
  }

  function checkQuizTriggers() {
    const player = window.videoPlayer;
    if (!player) return;
    
    const currentTime = player.currentTime();
    
    // Enhanced logging for debugging
    console.log(`🔍 checkQuizTriggers called at ${currentTime.toFixed(1)}s`);
    console.log(`📊 quizData length:`, quizData.length);
    console.log(`📊 quizData:`, quizData);
    console.log(`📊 sessionQuizShown:`, sessionQuizShown);
    console.log(`📊 lastQuizTriggerTime:`, lastQuizTriggerTime);
    console.log(`📊 quizModal display:`, quizModal.style.display);
    
    // Check if we've reached a quiz point
    for (let i = 0; i < quizData.length; i++) {
      const quiz = quizData[i];
      const timeDiff = Math.abs(currentTime - quiz.timestamp);
      
      // Log when we're close to quiz points
      if (timeDiff <= 3) {
        console.log(`🎯 Near quiz ${i} at ${currentTime.toFixed(1)}s (target: ${quiz.timestamp}s, diff: ${timeDiff.toFixed(1)}s)`);
      }
      
      // If we're within 1 second of the quiz timestamp and haven't shown this quiz in current session
      // Also check if quiz modal is not already visible to prevent duplicates
      // And ensure we haven't triggered this quiz recently (within 5 seconds)
      const quizKey = `quiz_${i}`;
      const timeSinceLastTrigger = lastQuizTriggerTime[quizKey] ? currentTime - lastQuizTriggerTime[quizKey] : 999;
      
      if (timeDiff <= 1 && !sessionQuizShown[quizKey] && quizModal.style.display !== 'flex' && timeSinceLastTrigger > 5) {
        console.log(`🚨 Triggering quiz ${i} at ${currentTime.toFixed(1)}s`);
        lastQuizTriggerTime[quizKey] = currentTime;
        showQuiz(i);
        break; // Only show one quiz at a time
      }
    }
  }

  function showQuiz(quizIndex) {
    console.log('🎯 showQuiz called for quiz:', quizIndex);
    console.log('🎯 Current time:', window.videoPlayer?.currentTime());
    console.log('🎯 Quiz modal already visible?', quizModal.style.display === 'flex');
    console.log('🎯 Session quiz shown?', sessionQuizShown[`quiz_${quizIndex}`]);
    
    const quiz = quizData[quizIndex];
    currentQuizIndex = quizIndex;
    
    // Mark this quiz as shown in current session
    sessionQuizShown[`quiz_${quizIndex}`] = true;
    console.log('🎯 Marked quiz as shown:', sessionQuizShown);
    
    // Pause the video
    if (window.videoPlayer) {
      window.videoPlayer.pause();
    }
    
    // Set up the quiz modal
    quizQuestion.textContent = quiz.text;
    quizOptions.innerHTML = '';
    quizFeedback.style.display = 'none';
    
    console.log('Quiz question:', quiz.text);
    console.log('Quiz options:', quiz.options);
    console.log('Quiz object:', quiz);
    selectedAnswer = null;
    
    // Create option buttons
    if (quiz.options && Array.isArray(quiz.options)) {
    quiz.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.textContent = option;
      button.style.cssText = 'display: block; width: 100%; padding: 12px; margin: 8px 0; background: #f0f0f0; border: 2px solid #ddd; border-radius: 4px; cursor: pointer; font-size: 14px;';
      button.addEventListener('click', () => selectAnswer(index, button));
      quizOptions.appendChild(button);
    });
    } else {
      console.error('❌ Quiz options is not an array:', quiz.options);
      quizOptions.innerHTML = '<p>Error: Quiz options not found</p>';
    }
    
    // Show the modal
    quizModal.style.display = 'flex';
  }

  function selectAnswer(answerIndex, buttonElement) {
    console.log('🎯 Answer selected:', answerIndex);
    
    // Remove previous selection
    quizOptions.querySelectorAll('button').forEach(btn => {
      btn.style.background = '#f0f0f0';
      btn.style.borderColor = '#ddd';
    });
    
    // Highlight selected answer
    selectedAnswer = answerIndex;
    buttonElement.style.background = '#e3f2fd';
    buttonElement.style.borderColor = '#2196f3';
    
    console.log('Selected answer set to:', selectedAnswer);
  }

  function handleQuizSubmit() {
    console.log('🔘 Quiz submit button clicked!');
    console.log('Selected answer:', selectedAnswer);
    
    if (selectedAnswer === null) {
      alert('Please select an answer!');
      return;
    }

    const quiz = quizData[currentQuizIndex];
    const isCorrect = selectedAnswer === quiz.correctAnswer;
    
    // Show feedback
    quizFeedback.style.display = 'block';
    if (isCorrect) {
      quizFeedback.textContent = `✅ Correct!`;
      quizFeedback.style.color = '#4CAF50';
      
      // Mark quiz as completed
      const currentVideoId = getCurrentVideoId();
      if (!quizProgress[currentVideoId]) {
        quizProgress[currentVideoId] = {
          videoId: currentVideoId,
          totalQuestions: quizData.length,
          completedQuestions: 0,
          correctAnswers: 0,
          questionResults: {}
        };
      }
      
      quizProgress[currentVideoId].questionResults[`q${currentQuizIndex}`] = {
        questionIndex: currentQuizIndex,
        answered: true,
        correct: true,
        answer: selectedAnswer,
        timestamp: new Date()
      };
      
      quizProgress[currentVideoId].completedQuestions++;
      quizProgress[currentVideoId].correctAnswers++;
      
      // Save progress to database
      saveQuizProgress();
      
      // Close modal and resume video
      setTimeout(() => {
        quizModal.style.display = 'none';
        isResumingFromQuiz = true; // Set flag before resuming
        if (window.videoPlayer) {
          window.videoPlayer.play();
        }
      }, 2000);
      
    } else {
      quizFeedback.textContent = `❌ Incorrect. Try Again.`;
      quizFeedback.style.color = '#f44336';
      
      // Track incorrect answer
      const currentVideoId = getCurrentVideoId();
      if (!quizProgress[currentVideoId]) {
        quizProgress[currentVideoId] = {
          videoId: currentVideoId,
          totalQuestions: quizData.length,
          completedQuestions: 0,
          correctAnswers: 0,
          questionResults: {}
        };
      }
      
      const questionKey = `q${currentQuizIndex}`;
      if (!quizProgress[currentVideoId].questionResults[questionKey]) {
        quizProgress[currentVideoId].questionResults[questionKey] = {
          questionIndex: currentQuizIndex,
          answered: true,
          correct: false,
          attempts: 0,
          timestamp: new Date()
        };
      }
      
      quizProgress[currentVideoId].questionResults[questionKey].attempts++;
      quizProgress[currentVideoId].questionResults[questionKey].lastAnswer = selectedAnswer;
      
      // Save progress to database
      saveQuizProgress();
      
      // Don't close modal - let them try again
      setTimeout(() => {
        quizFeedback.style.display = 'none';
      }, 3000);
    }
  }

  async function loadVideoCompletion(videoId = 'intro-video-1') {
    if (!window.auth.currentUser) {
      console.log('⚠️ No authenticated user for video completion check');
      return;
    }

    try {
      console.log('📊 Loading video completion for:', videoId);
      const userId = window.auth.currentUser.uid;
      const userRef = window.doc(window.db, 'users', userId);
      const userDoc = await window.getDoc(userRef);
      
      console.log('📊 User doc exists:', userDoc.exists());

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const videoCompletions = userData.videoCompletions || {};
        console.log('📊 Video completions:', videoCompletions);
        // Completion status display removed - no popup shown
      }
    } catch (error) {
      console.error('❌ Error loading video completion:', error);
      console.error('Error details:', error.message);
      console.error('Error code:', error.code);
    }
  }

  async function loadQuizProgress(videoId = 'intro-video-1') {
    if (!window.auth.currentUser) return;

    try {
      const userId = window.auth.currentUser.uid;
      const userRef = window.doc(window.db, 'users', userId);
      const userDoc = await window.getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        quizProgress = userData.quizProgress || {};
        console.log('📊 Loaded quiz progress from user document:', quizProgress);
      } else {
        console.log('📊 No user document found, initializing empty progress');
        quizProgress = {};
      }
    } catch (error) {
      console.error('Error loading quiz progress:', error);
      quizProgress = {};
    }
  }

  async function saveQuizProgress(videoId = 'intro-video-1') {
    if (!window.auth.currentUser) return;

    try {
      const userId = window.auth.currentUser.uid;
      const userRef = window.doc(window.db, 'users', userId);
      
      // Get current user document to merge with existing data
      const userDoc = await window.getDoc(userRef);
      const existingData = userDoc.exists() ? userDoc.data() : {};
      
      await window.setDoc(userRef, {
        ...existingData,
        email: window.auth.currentUser.email,
        displayName: window.auth.currentUser.displayName || window.auth.currentUser.email,
        quizProgress: quizProgress,
        lastUpdated: window.serverTimestamp(),
        updatedAt: window.serverTimestamp()
      }, { merge: true });

      console.log('📊 Quiz progress saved to user document');
    } catch (error) {
      console.error('Error saving quiz progress:', error);
    }
  }

  async function markVideoCompleted(videoId = null) {
    if (!window.auth.currentUser) return;

    // Get current video ID from module-navigation.js if not provided
    if (!videoId && window.currentVideoData && window.currentVideoData.id) {
      videoId = window.currentVideoData.id;
    }
    
    // Fallback to default if still no videoId
    if (!videoId) {
      videoId = 'intro-video-1';
    }

    console.log('📊 Marking video completed:', videoId);

    try {
      const userId = window.auth.currentUser.uid;
      const userRef = window.doc(window.db, 'users', userId);
      
      // Get current user document to merge with existing data
      const userDoc = await window.getDoc(userRef);
      const existingData = userDoc.exists() ? userDoc.data() : {};
      
      // Update video completions
      const videoCompletions = existingData.videoCompletions || {};
      videoCompletions[videoId] = {
        completed: true,
        completedAt: window.serverTimestamp(),
        userId: userId,
        videoId: videoId
      };
      
      await window.setDoc(userRef, {
        ...existingData,
        email: window.auth.currentUser.email,
        displayName: window.auth.currentUser.displayName || window.auth.currentUser.email,
        videoCompletions: videoCompletions,
        lastUpdated: window.serverTimestamp(),
        updatedAt: window.serverTimestamp()
      }, { merge: true });
      
      console.log('📊 Video completion saved to user document');
    } catch (error) {
      console.error('Error saving video completion:', error);
      showError('Error saving progress. Please try again.');
    }
  }
});