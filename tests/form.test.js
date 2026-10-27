import { beforeEach, describe, expect, it, vi } from 'vitest';
import { initializePage } from '../src/main.js';

const formMarkup = `
  <form id="order-form"><input name="name"><p id="name-error"></p><input name="contact"><p id="contact-error"></p>
  <select name="product"><option value="">Vyberte</option><option>Buková polena</option></select><p id="product-error"></p>
  <input name="quantity"><p id="quantity-error"></p><input name="location"><p id="location-error"></p>
  <button type="submit">Odeslat</button><div id="form-status" role="status" tabindex="-1" hidden></div></form>`;

describe('demonstrační objednávkový formulář', () => {
  beforeEach(() => { document.body.innerHTML = formMarkup; initializePage(document); });

  it('zobrazí české chyby, označí pole a zaměří první chybu', () => {
    document.querySelector('form').requestSubmit();
    expect(document.querySelector('#name-error').textContent).toContain('Napište prosím');
    expect(document.querySelector('#contact-error').textContent).toContain('platný e-mail');
    expect(document.querySelector('#product-error').textContent).toContain('Vyberte prosím');
    expect(document.activeElement.name).toBe('name');
    expect(document.querySelector('#form-status').hidden).toBe(true);
  });

  it('přijme e-mail a ukáže potvrzení bez síťového požadavku', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const form = document.querySelector('form');
    form.elements.name.value = 'Jana Nováková'; form.elements.contact.value = 'jana@example.cz';
    form.elements.product.value = 'Buková polena'; form.elements.quantity.value = '3'; form.elements.location.value = 'Jihlava';
    form.requestSubmit();
    const status = document.querySelector('#form-status');
    expect(status.hidden).toBe(false);
    expect(status.textContent).toContain('nebyla ve skutečnosti odeslána ani uložena');
    expect(document.activeElement).toBe(status);
    expect(fetchSpy).not.toHaveBeenCalled();
    fetchSpy.mockRestore();
  });

  it('přijme české telefonní číslo a odmítne neplatné množství', () => {
    const form = document.querySelector('form');
    form.elements.name.value = 'Petr Svoboda'; form.elements.contact.value = '+420 777 123 456';
    form.elements.product.value = 'Buková polena'; form.elements.quantity.value = '21'; form.elements.location.value = '586 01';
    form.requestSubmit();
    expect(document.querySelector('#contact-error').textContent).toBe('');
    expect(document.querySelector('#quantity-error').textContent).toContain('od 1 do 20');
  });
});
