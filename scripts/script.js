function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = langData[key];
    });
}

function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
}

async function fetchLanguageData(lang) {
    const response = await fetch(`languages/${lang}.json`);
    return response.json();
}

async function changeLanguage(lang) {
    setLanguagePreference(lang);
    toggleLanguageOverlay();

    const langData = await fetchLanguageData(lang);
    updateContent(langData);
    updateLanguageSelectorFlag(lang);
}

function toggleLanguageOverlay() {
    var overlay = document.getElementById("languageOverlay");
    overlay.style.width = (overlay.style.width === "100%") ? "0" : "100%";
}

function updateLanguageSelectorFlag(lang) {
    const flagImageUrlMap = {
        'en': './assets/images/us_flag.png',
        'pt': './assets/images/br_flag.png'
    };

    const flagElement = document.querySelector('.selected-flag');

    flagElement.src = flagImageUrlMap[lang];
    flagElement.alt = lang === 'en' ? 'English' : 'Portuguese';
}

window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
});

window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
    
    // Update the flag in the language selector
    updateLanguageSelectorFlag(userPreferredLanguage);
});