const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

// Об'єкт formData з початковими значеннями
let formData = {
  email: '',
  message: '',
};

// Відновлення даних із localStorage при завантаженні сторінки
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  try {
    const parsedData = JSON.parse(savedData);
    formData = { ...formData, ...parsedData };
    form.email.value = formData.email || '';
    form.message.value = formData.message || '';
  } catch (err) {
    console.error('Parsing error:', err);
  }
}

// Слухач на input (делегування)
form.addEventListener('input', event => {
  const { name, value } = event.target;
  formData[name] = value.trim(); // очищаємо пробіли
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// Submit
form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  formData = { email: '', message: '' };
  localStorage.removeItem(STORAGE_KEY);
  form.reset();
});