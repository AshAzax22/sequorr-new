import { useEffect } from 'react';

// Singleton Observers to prevent redundant overhead
let revealObserver = null;
let headerObserver = null;
let mutationObserver = null;

const createObservers = () => {
    if (typeof window === 'undefined') return;

    // 1. Reveal Observer (from bottom)
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px' 
    };

    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealVisible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // 2. Header Exit Observer (fade out near top)
    const headerOptions = {
        threshold: 0,
        rootMargin: '-100px 0px 0px 0px' 
    };

    headerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting && entry.boundingClientRect.top < 100) {
                entry.target.classList.add('headerFadeOut');
            } else {
                entry.target.classList.remove('headerFadeOut');
            }
        });
    }, headerOptions);

    // 3. Mutation Observer for dynamic content
    mutationObserver = new MutationObserver(() => {
        observeElements();
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
};

const observeElements = () => {
    if (!revealObserver || !headerObserver) return;
    
    const revealElements = document.querySelectorAll('.reveal:not(.revealVisible)');
    revealElements.forEach((el) => revealObserver.observe(el));

    const headers = document.querySelectorAll('.sectionHeader');
    headers.forEach((h) => headerObserver.observe(h));
};

const useScrollAnimation = () => {
    useEffect(() => {
        if (!revealObserver) {
            createObservers();
        }

        // Initial observation for the calling component
        observeElements();

        // No individual disconnect here as it's a shared observer
        // The individual elements are unobserved when they reveal
    }, []);
};

export default useScrollAnimation;
