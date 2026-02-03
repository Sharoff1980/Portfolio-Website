// Scroll Progress and Time Update
    window.addEventListener('scroll', function() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = (window.scrollY / documentHeight) * 100;
      
      document.getElementById('progressBar').style.width = scrolled + '%';
      document.getElementById('progressText').textContent = 
        "You've made it " + Math.round(scrolled) + "% through understanding why I'm your next hire! 🚀";

      // Update time based on scroll
      const timeElement = document.getElementById('currentTime');
      if (scrolled < 15) timeElement.textContent = '6:00 AM';
      else if (scrolled < 30) timeElement.textContent = '9:00 AM';
      else if (scrolled < 45) timeElement.textContent = '12:00 PM';
      else if (scrolled < 60) timeElement.textContent = '3:00 PM';
      else if (scrolled < 75) timeElement.textContent = '6:00 PM';
      else timeElement.textContent = '9:00 PM';
    });

    // Video Comparison Functionality
    document.querySelectorAll('.video-compare-container').forEach(container => {
      const videoBase = container.querySelector('.video-base');
      const videoClipped = container.querySelector('.video-clipped');
      const clipper = container.querySelector('.video-clipper');
      const dividerLine = container.querySelector('.divider-line');

      function handleMove(e) {
        const rect = container.getBoundingClientRect();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const position = ((clientX - rect.left) / rect.width) * 100;

        if (position >= 0 && position <= 100) {
          clipper.style.width = position + '%';
          videoClipped.style.width = ((100 / position) * 100) + '%';
          dividerLine.style.left = position + '%';

          // Audio control
          if (position > 50) {
            videoBase.muted = true;
            videoClipped.muted = false;
          } else if (position < 50) {
            videoBase.muted = false;
            videoClipped.muted = true;
          } else {
            videoBase.muted = false;
            videoClipped.muted = false;
          }
        }
      }

      function handleClick() {
        if (videoBase.paused) {
          videoBase.play();
          videoClipped.play();
        } else {
          videoBase.pause();
          videoClipped.pause();
        }
        videoBase.currentTime = videoClipped.currentTime;
      }

      container.addEventListener('mousemove', handleMove);
      container.addEventListener('touchmove', handleMove);
      container.addEventListener('click', handleClick);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });