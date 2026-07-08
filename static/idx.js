const qualInput = document.getElementById('Quality of Sleep');
const stressInput = document.getElementById('Stress Level');
const qualVal = document.getElementById('qual-val');
const stressVal = document.getElementById('stress-val');

function paintTrack(input){
const min = parseFloat(input.min), max = parseFloat(input.max), val = parseFloat(input.value);
const pct = ((val - min) / (max - min)) * 100;
input.style.background = `linear-gradient(to right, var(--blue) ${pct*0.6}%, var(--purple) ${pct}%, var(--field) ${pct}%)`;
}
[qualInput, stressInput].forEach(paintTrack);

qualInput.addEventListener('input', () => { qualVal.textContent = qualInput.value; paintTrack(qualInput); });
stressInput.addEventListener('input', () => { stressVal.textContent = stressInput.value; paintTrack(stressInput); });

const panel = document.getElementById('result-panel');
const ringFill = document.getElementById('ring-fill');
const ringIcon = document.getElementById('ring-icon');
const resultTag = document.getElementById('result-tag');
const title = document.getElementById('result-title');
const sub = document.getElementById('result-sub');
const statList = document.getElementById('stat-list');
const statQuality = document.getElementById('stat-quality');
const statStress = document.getElementById('stat-stress');
const submitBtn = document.getElementById('submit-btn');

const CIRCUMFERENCE = 2 * Math.PI * 63;

function setState(state){
panel.classList.remove('state-healthy', 'state-risk', 'state-error');
if (state) panel.classList.add('state-' + state);
}
function setRing(fraction){
ringFill.style.strokeDashoffset = CIRCUMFERENCE - (fraction * CIRCUMFERENCE);
}
function setIcon(pathSvg){
ringIcon.innerHTML = pathSvg;
}

const icons = {
pending: '<svg viewBox="0 0 24 24" fill="none" stroke="#a1a1a6" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
healthy: '<svg viewBox="0 0 24 24" fill="none" stroke="#34c759" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>',
risk: '<svg viewBox="0 0 24 24" fill="none" stroke="#ff9500" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4"/><circle cx="12" cy="16.5" r="0.6" fill="#ff9500"/><path d="M10.3 4.4L2.7 18a1.6 1.6 0 0 0 1.4 2.4h16a1.6 1.6 0 0 0 1.4-2.4L13.7 4.4a1.6 1.6 0 0 0-2.8 0z"/></svg>',
error: '<svg viewBox="0 0 24 24" fill="none" stroke="#ff3b30" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/></svg>'
};

const infoBadgeIcons = {
healthy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>',
risk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4"/><circle cx="12" cy="16.5" r="0.6" fill="currentColor"/><path d="M10.3 4.4L2.7 18a1.6 1.6 0 0 0 1.4 2.4h16a1.6 1.6 0 0 0 1.4-2.4L13.7 4.4a1.6 1.6 0 0 0-2.8 0z"/></svg>',
error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/></svg>'
};

// Condition-specific guidance shown in the info card, keyed by the model's prediction value.
const conditionContent = {
"None": {
    state: 'healthy',
    tag: 'Stay on track',
    title: 'Keep these habits up',
    desc: 'Your profile is consistent with healthy sleep. These habits are likely what\u2019s working for you \u2014 keep reinforcing them.',
    tips: [
    'Keep a consistent sleep and wake time, even on weekends',
    'Keep up your current activity level and daily steps',
    'Manage stress with regular wind-down time before bed',
    'Recheck in periodically, especially if your routine changes'
    ]
},
"Insomnia": {
    state: 'risk',
    tag: 'About Insomnia',
    title: 'Insomnia \u2014 what it means',
    desc: 'Insomnia involves ongoing trouble falling asleep, staying asleep, or waking too early, often tied to stress or irregular routines.',
    tips: [
    'Keep a fixed wake time every day, even after a bad night',
    'Avoid caffeine, alcohol, and screens in the evening',
    'Try relaxation techniques like breathing exercises before bed',
    'Talk to a doctor if it persists longer than a few weeks'
    ]
},
"Sleep Apnea": {
    state: 'risk',
    tag: 'About Sleep Apnea',
    title: 'Sleep Apnea \u2014 what it means',
    desc: 'Sleep apnea causes repeated breathing interruptions during sleep, often linked to loud snoring, high BMI, and daytime fatigue.',
    tips: [
    'Try sleeping on your side rather than your back',
    'Work toward a healthy weight if BMI is elevated',
    'Avoid alcohol and sedatives before bedtime',
    'Ask a doctor about a sleep study or CPAP evaluation'
    ]
},
"_fallback": {
    state: 'risk',
    tag: 'About this result',
    title: 'What to do next',
    desc: 'This profile shares patterns with diagnosed cases in the training data. A healthcare professional can help confirm a diagnosis.',
    tips: [
    'Track your sleep, stress, and habits for a couple of weeks',
    'Share these results with a doctor for a proper evaluation',
    'Avoid caffeine and alcohol close to bedtime in the meantime',
    'Keep a steady sleep and wake schedule'
    ]
},
"_error": {
    state: 'error',
    tag: 'Unavailable',
    title: 'Guidance unavailable',
    desc: 'We couldn\u2019t generate personalized guidance for this attempt.',
    tips: [
    'Double-check the values entered in the form',
    'Confirm the API server is running',
    'Retry the analysis in a moment'
    ]
}
};

const infoCard = document.getElementById('info-card');
const infoBadge = document.getElementById('info-badge');
const infoTag = document.getElementById('info-tag');
const infoTitle = document.getElementById('info-title');
const infoDesc = document.getElementById('info-desc');
const tipList = document.getElementById('tip-list');

function renderInfoCard(content){
infoCard.classList.remove('state-risk', 'state-error');
if (content.state) infoCard.classList.add('state-' + content.state);
infoBadge.innerHTML = infoBadgeIcons[content.state] || infoBadgeIcons.healthy;
infoTag.textContent = content.tag;
infoTitle.textContent = content.title;
infoDesc.textContent = content.desc;
tipList.innerHTML = content.tips.map(t =>
    `<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>${t}</li>`
).join('');
}

document.getElementById('prediction-form').addEventListener('submit', async (e) => {
e.preventDefault();

const patientData = {
    "Gender": document.getElementById('Gender').value,
    "Age": parseInt(document.getElementById('Age').value),
    "Occupation": document.getElementById('Occupation').value,
    "Sleep Duration": parseFloat(document.getElementById('Sleep Duration').value),
    "Quality of Sleep": parseInt(qualInput.value),
    "Physical Activity Level": parseInt(document.getElementById('Physical Activity Level').value),
    "Stress Level": parseInt(stressInput.value),
    "BMI Category": document.getElementById('BMI Category').value,
    "Heart Rate": parseInt(document.getElementById('Heart Rate').value),
    "Daily Steps": parseInt(document.getElementById('Daily Steps').value),
    "Systolic BP": parseInt(document.getElementById('Systolic').value),
    "Diastolic BP": parseInt(document.getElementById('Diastolic').value)
};

submitBtn.disabled = true;
submitBtn.textContent = 'Analyzing…';
setState(null);
setIcon(icons.pending);
setRing(0.18);
resultTag.textContent = 'Analyzing';
title.textContent = 'Reviewing your profile';
sub.textContent = 'Comparing your inputs against the trained model.';

try {
    const response = await fetch('/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patientData)
    });

    const data = await response.json();
    console.log("API Response:", data);

    if (data.status === "error") {
    setState('error');
    setIcon(icons.error);
    setRing(1);
    resultTag.textContent = 'Error';
    title.textContent = 'Something went wrong';
    sub.textContent = data.message;
    renderInfoCard(conditionContent._error);
    } else if (data.prediction === 'None') {
    setState('healthy');
    setIcon(icons.healthy);
    setRing(0.92);
    resultTag.textContent = 'Low risk';
    title.textContent = 'Healthy sleep profile';
    sub.textContent = 'No disorder pattern detected — keep up the good habits.';
    renderInfoCard(conditionContent["None"]);
    } else {
    setState('risk');
    setIcon(icons.risk);
    setRing(0.7);
    resultTag.textContent = 'Prediction';
    title.textContent = 'Predicted condition: ' + data.prediction;
    sub.textContent = 'Your profile shares patterns with diagnosed ' + data.prediction + ' cases. Consider talking to a doctor.';
    const conditionMatch = conditionContent[data.prediction] || {
        ...conditionContent._fallback,
        tag: 'About ' + data.prediction,
        title: data.prediction + ' \u2014 what to do next'
    };
    renderInfoCard(conditionMatch);
    }

    statList.style.display = 'block';
    statQuality.textContent = qualInput.value + ' / 10';
    statStress.textContent = stressInput.value + ' / 10';

} catch (error) {
    setState('error');
    setIcon(icons.error);
    setRing(1);
    resultTag.textContent = 'Offline';
    title.textContent = "Couldn't reach the model";
    sub.textContent = 'Check that the API server is running and try again.';
    renderInfoCard(conditionContent._error);
} finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Analyze my sleep profile';
}
});
