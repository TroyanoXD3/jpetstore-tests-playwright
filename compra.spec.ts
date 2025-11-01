import { test, expect } from '@playwright/test';

test('Flujo completo de compra en JPetStore', async ({ page }) => {
  // 1️⃣ Abrir el sitio principal
  await page.goto('https://jpetstore.aspectran.com/');

  // 2️⃣ Ingresar a la cuenta
  await page.click('text=Sign In');
  await page.fill('#username', 'j2ee'); // usuario por defecto
  await page.fill('#password', 'j2ee'); // contraseña por defecto
  await page.click('button:has-text("Login")');

  // 3️⃣ Seleccionar categoría “Fish”
  await page.click('text=Fish');

  // 4️⃣ Seleccionar producto FI-SW-01 y agregar al carrito
  await page.click('text=FI-SW-01');
  await page.click('text=Add to Cart');

  // 5️⃣ Proceder al checkout
  await page.click('text=Proceed to Checkout');

  // 6️⃣ Llenar el código postal (si se requiere)
  await page.fill('input[name="billZip"]', '12345');

  // 7️⃣ Continuar y confirmar la compra
  await page.click('button:has-text("Continue")');
  await page.click('button:has-text("Confirm")');

  // 8️⃣ Verificar que la orden fue enviada
  await expect(page.locator('body')).toContainText('Thank you, your order has been submitted.');
});

