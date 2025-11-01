import { test, expect } from '@playwright/test';

test('Flujo B - Gestión de cuenta en JPetStore', async ({ page }) => {
  test.setTimeout(120000); // 2 minutos

  // 1️⃣ Abrir la tienda
  await page.goto('https://jpetstore.aspectran.com/');
  await page.waitForLoadState('domcontentloaded');

  // 2️⃣ Ir a iniciar sesión
  await page.click('text=Sign In');
  await page.fill('input[name="username"]', 'j2ee');
  await page.fill('input[name="password"]', 'j2ee');
  await page.click('button:has-text("Login")');

  // 3️⃣ Validar login exitoso
  await expect(page.locator('body')).toContainText('My Account');

  // 4️⃣ Ir al perfil de cuenta (abrir menú antes)
  await page.click('#dropdownMenuButton');
  await page.click('text=My Account');

  // 5️⃣ Validar formulario correcto visible
  await expect(page.locator('form[action="/account/editAccount"]')).toBeVisible();

  // 6️⃣ Editar nombre y correo
  await page.fill('input[name="firstName"]', 'TestUser');
  await page.fill('input[name="email"]', 'test@gmail.com');

  // 7️⃣ Guardar cambios
  await page.click('button:has-text("Save Account Information")');

  // 8️⃣ Confirmar que vuelve al menú
  await expect(page.locator('body')).toContainText('My Account');

  // 9️⃣ Cerrar sesión
  await page.click('#dropdownMenuButton');
  await page.click('text=Sign Out');
  await expect(page.locator('body')).toContainText('Sign In');
});


