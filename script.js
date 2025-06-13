        document.querySelector('.cta-button').addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#courses').scrollIntoView({
                behavior: 'smooth'
            });
        });

        const courseCards = document.querySelectorAll('.course-card');
        courseCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const blurGradient = document.querySelector('.blur-gradient');
            blurGradient.style.transform = `translateX(-50%) translateY(${scrolled * 0.3}px)`;
        });