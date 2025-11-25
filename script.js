function toggleSection(sectionId, headerElement) {
    const content = document.getElementById(sectionId);
    const toggleIcon = headerElement.querySelector('.toggle-icon');
    
    if (content.classList.contains('expanded')) {
        // Collapse
        content.classList.remove('expanded');
        toggleIcon.classList.remove('rotated');
        headerElement.classList.remove('expanded');
    } else {
        // Expand
        content.classList.add('expanded');
        toggleIcon.classList.add('rotated');
        headerElement.classList.add('expanded');
    }
    
    // Check if any section is expanded
    const hasExpandedSection = document.querySelector('.section-content.expanded') !== null;
    if (hasExpandedSection) {
        document.documentElement.classList.add('has-expanded-section');
        document.body.classList.add('has-expanded-section');
    } else {
        document.documentElement.classList.remove('has-expanded-section');
        document.body.classList.remove('has-expanded-section');
    }
}

document.querySelectorAll('.section-header').forEach(element => {
    element.setAttribute('role', 'button');
    element.setAttribute('tabindex', '0');
    element.setAttribute('aria-expanded', 'false');
    
    element.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
            
            // Update aria-expanded
            const content = this.nextElementSibling;
            const isExpanded = content.classList.contains('expanded');
            this.setAttribute('aria-expanded', isExpanded.toString());
        }
    });
});
