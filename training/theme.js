// Theme toggle — shared across all plan pages
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
    htmlElement.style.colorScheme = 'light';
    themeToggle.textContent = '\u{1F319}';
} else {
    htmlElement.style.colorScheme = 'dark';
    themeToggle.textContent = '\u{2600}\u{FE0F}';
}

themeToggle.addEventListener('click', () => {
    const currentScheme = htmlElement.style.colorScheme || (isDark ? 'dark' : 'light');

    if (currentScheme === 'dark') {
        htmlElement.style.colorScheme = 'light';
        themeToggle.textContent = '\u{1F319}';
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.style.colorScheme = 'dark';
        themeToggle.textContent = '\u{2600}\u{FE0F}';
        localStorage.setItem('theme', 'dark');
    }
});
