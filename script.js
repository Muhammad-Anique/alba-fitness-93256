'use strict';

/**
 * ALBA FITNESS - Interactive Features
 * 1. Countdown Timer
 * 2. Email Waitlist Submission (Mock Supabase integration)
 * 3. Smooth Scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initWaitlistForm();
    initSmoothScroll();
});

/**
 * 1. Countdown Timer Logic
 * Target: 30 days from the current date for demonstration
 */
function initCountdown() {
    // Set launch date to 30 days from now
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 30);

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = launchDate - now;

        if (distance < 0) {
            document.getElementById('countdown').innerHTML = "LAUNCHING NOW";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');
    };

    setInterval(updateTimer, 1000);
    updateTimer();
}

/**
 * 2. Waitlist Form Handling
 * Simple validation and mock submission to Supabase
 */
function initWaitlistForm() {
    const form = document.getElementById('waitlist-form');
    const feedback = document.getElementById('form-feedback');
    const emailInput = document.getElementById('subscriber-email');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        // Basic Client-side Validation
        if (!validateEmail(email)) {
            showFeedback('Please enter a valid email address.', 'error');
            return;
        }

        // UI State - Loading
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Joining...';
        submitBtn.disabled = true;

        try {
            /* 
               Implementation Note: 
               In a Next.js/Supabase environment, this would call a Server Action or API route.
               Example: await supabase.from('subscribers').insert([{ email }]);
            */
            
            // Mocking API delay
            await new Promise(resolve => setTimeout(resolve, 1200));

            // Success State
            showFeedback('Thank you! You\'re on the list.', 'success');
            form.reset();
            submitBtn.innerText = 'Confirmed';
        } catch (err) {
            showFeedback('Something went wrong. Please try again.', 'error');
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function showFeedback(message, type) {
        feedback.innerText = message;
        feedback.className = `form-message ${type}`;
        
        if (type === 'success') {
            emailInput.style.borderColor = 'var(--success)';
        } else {
            emailInput.style.borderColor = '#ff4d4d';
        }
    }
}

/**
 * 3. Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.