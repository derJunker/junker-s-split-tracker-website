document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const faqQuestion = item.querySelector('.faq-question');
        faqQuestion.addEventListener('click', (e) => {
            e.preventDefault();
            item.classList.toggle('faq-open');
        })
    })
})