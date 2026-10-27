import './styles.css';

export const validators = {
  name: (value) => value.trim().length >= 2 ? '' : 'Napište prosím své jméno a příjmení.',
  contact: (value) => {
    const input = value.trim();
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phone = /^(?:\+?420\s?)?(?:\d[\s-]?){9}$/;
    return email.test(input) || phone.test(input) ? '' : 'Zadejte platný e-mail nebo české telefonní číslo.';
  },
  product: (value) => value ? '' : 'Vyberte prosím druh dřeva.',
  quantity: (value) => Number.isInteger(Number(value)) && Number(value) >= 1 && Number(value) <= 20 ? '' : 'Zadejte množství od 1 do 20 PRMS.',
  location: (value) => value.trim().length >= 2 ? '' : 'Napište prosím obec nebo PSČ doručení.',
};

export class DemonstrationOrderForm {
  constructor(form) {
    this.form = form;
    this.status = form.querySelector('#form-status');
    this.fields = Object.keys(validators);
    form.addEventListener('submit', (event) => this.submit(event));
    this.fields.forEach((name) => form.elements[name].addEventListener('blur', () => this.validateField(name)));
  }

  validateField(name) {
    const field = this.form.elements[name];
    const error = validators[name](field.value);
    const errorNode = this.form.querySelector(`#${name}-error`);
    errorNode.textContent = error;
    field.setAttribute('aria-invalid', String(Boolean(error)));
    return !error;
  }

  submit(event) {
    event.preventDefault();
    this.status.hidden = true;
    const valid = this.fields.map((name) => this.validateField(name)).every(Boolean);
    if (!valid) {
      const firstInvalid = this.form.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }
    this.form.reset();
    this.fields.forEach((name) => this.form.elements[name].setAttribute('aria-invalid', 'false'));
    this.status.innerHTML = '<strong>Hotovo – ukázka proběhla úspěšně.</strong><span>Vaše poptávka nebyla ve skutečnosti odeslána ani uložena. Děkujeme za vyzkoušení webu Prostě Dřevo.</span>';
    this.status.hidden = false;
    this.status.focus();
  }
}

export function initializePage(documentRef = document) {
  const form = documentRef.querySelector('#order-form');
  if (form) new DemonstrationOrderForm(form);
  documentRef.querySelectorAll('[data-product]').forEach((link) => link.addEventListener('click', () => {
    form.elements.product.value = link.dataset.product;
  }));
}

if (typeof document !== 'undefined') initializePage();
