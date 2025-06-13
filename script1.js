    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
            contentSections.forEach(section => section.classList.remove('active'));
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
            const newProgress = Math.floor(Math.random() * 30) + 10;
            document.getElementById('progressFill').style.width = newProgress + '%';
            document.getElementById('progressText').textContent = newProgress + '%';
        });
    });