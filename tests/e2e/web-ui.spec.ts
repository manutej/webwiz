import { test, expect, Page } from '@playwright/test';

/**
 * Page Object Model for WebWiz landing page
 */
class WebWizPage {
  constructor(private page: Page) {}

  // Locators
  get descriptionTextarea() {
    return this.page.locator('textarea[placeholder*="Example: A modern SaaS"]');
  }

  get generateButton() {
    return this.page.locator('button:has-text("Generate Landing Page")');
  }

  get generatingButton() {
    return this.page.locator('button:has-text("Generating...")');
  }

  get resultSection() {
    return this.page.locator('text=Your Landing Page is Ready!');
  }

  get businessNameField() {
    return this.page.locator('text=Business Name').locator('..').locator('p').first();
  }

  get taglineField() {
    return this.page.locator('text=Tagline').locator('..').locator('p').first();
  }

  get templateField() {
    return this.page.locator('text=Template').locator('..').locator('p').first();
  }

  get downloadButton() {
    return this.page.locator('button:has-text("Download Project Files")');
  }

  // Actions
  async goto() {
    await this.page.goto('/');
  }

  async fillDescription(text: string) {
    await this.descriptionTextarea.fill(text);
  }

  async clickGenerate() {
    await this.generateButton.click();
  }

  async waitForResult(timeout = 60000) {
    await this.resultSection.waitFor({ timeout });
  }
}

test.describe('WebWiz Web UI', () => {
  test('Web UI loads successfully', async ({ page }) => {
    // Navigate to the home page
    await page.goto('/');

    // Check that the page title is correct
    await expect(page).toHaveTitle(/WebWiz/i);

    // Check for key UI elements
    await expect(page.locator('h1:has-text("WebWiz")')).toBeVisible();
    await expect(page.locator('text=AI-Powered Landing Page Generator')).toBeVisible();
    await expect(page.locator('h2:has-text("Describe Your Business")')).toBeVisible();

    // Check that the textarea is present and has placeholder
    const textarea = page.locator('textarea[placeholder*="Example: A modern SaaS"]');
    await expect(textarea).toBeVisible();
    await expect(textarea).toHaveAttribute('placeholder', /SaaS platform/);

    // Check that the generate button is present but disabled
    const generateButton = page.locator('button:has-text("Generate Landing Page")');
    await expect(generateButton).toBeVisible();
    await expect(generateButton).toBeDisabled();

    // Check that the features section is visible
    await expect(page.locator('text=Why WebWiz?')).toBeVisible();
    await expect(page.locator('text=AI-Powered')).toBeVisible();
    await expect(page.locator('text=Lightning Fast')).toBeVisible();
    await expect(page.locator('text=Modern Design')).toBeVisible();

    // Check that the footer is visible
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('text=Built with Next.js')).toBeVisible();
  });

  test('Generate button enables when description is entered', async ({ page }) => {
    const webwiz = new WebWizPage(page);
    await webwiz.goto();

    // Initially button should be disabled
    await expect(webwiz.generateButton).toBeDisabled();

    // Enter a description
    await webwiz.fillDescription('A modern e-commerce platform for artisan products');

    // Button should now be enabled
    await expect(webwiz.generateButton).toBeEnabled();

    // Clear the description
    await webwiz.fillDescription('');

    // Button should be disabled again
    await expect(webwiz.generateButton).toBeDisabled();
  });

  test('User can generate landing page from description', async ({ page }) => {
    // Skip this test if no API key is available
    test.skip(!process.env.ANTHROPIC_API_KEY, 'ANTHROPIC_API_KEY not set');

    const webwiz = new WebWizPage(page);
    await webwiz.goto();

    // Fill in a description
    const description = 'A modern SaaS platform that helps developers build and deploy web applications faster with AI-powered tools and templates.';
    await webwiz.fillDescription(description);

    // Click the generate button
    await webwiz.clickGenerate();

    // Check that loading state is shown
    await expect(webwiz.generatingButton).toBeVisible();
    await expect(webwiz.generateButton).toBeDisabled();

    // Wait for the result to appear (this may take a while due to AI processing)
    await webwiz.waitForResult();

    // Verify that the result section is visible
    await expect(webwiz.resultSection).toBeVisible();
    await expect(webwiz.businessNameField).toBeVisible();
    await expect(webwiz.taglineField).toBeVisible();
    await expect(webwiz.templateField).toBeVisible();
    await expect(webwiz.downloadButton).toBeVisible();

    // Verify that the fields have content
    const businessName = await webwiz.businessNameField.textContent();
    const tagline = await webwiz.taglineField.textContent();
    const template = await webwiz.templateField.textContent();

    expect(businessName).toBeTruthy();
    expect(businessName!.length).toBeGreaterThan(0);
    expect(tagline).toBeTruthy();
    expect(tagline!.length).toBeGreaterThan(0);
    expect(template).toBeTruthy();
    expect(['minimal', 'bold', 'elegant', 'creative']).toContain(template!.toLowerCase());
  });

  test('Generated spec is displayed with all required fields', async ({ page }) => {
    // Skip this test if no API key is available
    test.skip(!process.env.ANTHROPIC_API_KEY, 'ANTHROPIC_API_KEY not set');

    const webwiz = new WebWizPage(page);
    await webwiz.goto();

    // Fill in a description
    await webwiz.fillDescription('An online marketplace for handmade crafts and artisan goods.');

    // Generate
    await webwiz.clickGenerate();
    await webwiz.waitForResult();

    // Check that all spec fields are displayed
    await expect(page.locator('text=Business Name')).toBeVisible();
    await expect(page.locator('text=Tagline')).toBeVisible();
    await expect(page.locator('text=Template')).toBeVisible();
    await expect(page.locator('text=Next Steps:')).toBeVisible();

    // Check that next steps are shown
    await expect(page.locator('text=Download the generated files')).toBeVisible();
    await expect(page.locator('text=npm install')).toBeVisible();
    await expect(page.locator('text=npm run dev')).toBeVisible();
    await expect(page.locator('text=Deploy to Vercel or Netlify')).toBeVisible();
  });

  test('Template selection works (validates template in result)', async ({ page }) => {
    // Skip this test if no API key is available
    test.skip(!process.env.ANTHROPIC_API_KEY, 'ANTHROPIC_API_KEY not set');

    const webwiz = new WebWizPage(page);
    await webwiz.goto();

    // Test with a description that might influence template selection
    const descriptions = [
      'A minimalist portfolio for a freelance designer',
      'A bold marketing agency with high-impact visuals',
      'An elegant luxury watch brand',
    ];

    for (const description of descriptions) {
      // Fill description
      await webwiz.fillDescription(description);

      // Generate
      await webwiz.clickGenerate();

      // Wait for result
      await webwiz.waitForResult();

      // Get the template
      const template = await webwiz.templateField.textContent();

      // Verify it's a valid template
      expect(template).toBeTruthy();
      expect(['minimal', 'bold', 'elegant', 'creative']).toContain(template!.toLowerCase());

      // Reload page for next iteration
      await page.reload();
      await page.waitForLoadState('networkidle');
    }
  });

  test('Responsive design on mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Check that key elements are still visible on mobile
    await expect(page.locator('h1:has-text("WebWiz")')).toBeVisible();
    await expect(page.locator('textarea')).toBeVisible();
    await expect(page.locator('button:has-text("Generate Landing Page")')).toBeVisible();

    // Check that the layout is appropriate for mobile
    const textarea = page.locator('textarea');
    const box = await textarea.boundingBox();

    // Textarea should not exceed viewport width
    expect(box!.width).toBeLessThanOrEqual(375);
  });

  test('Error handling when API fails', async ({ page }) => {
    // Mock the API to return an error
    await page.route('**/api/generate', (route) => {
      route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal server error' }),
      });
    });

    await page.goto('/');

    // Fill description and generate
    await page.locator('textarea').fill('Test description');
    await page.locator('button:has-text("Generate Landing Page")').click();

    // Wait for error alert
    page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain('Failed to generate');
      await dialog.accept();
    });
  });
});

test.describe('WebWiz Accessibility', () => {
  test('Page has proper heading hierarchy', async ({ page }) => {
    await page.goto('/');

    // Check for proper heading structure
    const h1 = await page.locator('h1').count();
    expect(h1).toBeGreaterThan(0);

    // Check that headings are in logical order
    await expect(page.locator('h1:has-text("WebWiz")')).toBeVisible();
    await expect(page.locator('h2:has-text("Describe Your Business")')).toBeVisible();
    await expect(page.locator('h3:has-text("Why WebWiz")')).toBeVisible();
  });

  test('Form controls have proper labels', async ({ page }) => {
    await page.goto('/');

    // Check that textarea has placeholder (serves as label)
    const textarea = page.locator('textarea');
    await expect(textarea).toHaveAttribute('placeholder');

    // Check that button has descriptive text
    const button = page.locator('button:has-text("Generate Landing Page")');
    await expect(button).toBeVisible();
  });

  test('Keyboard navigation works', async ({ page }) => {
    await page.goto('/');

    // Tab to textarea
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Type in textarea using keyboard
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);

    // The active element should be focusable
    expect(['TEXTAREA', 'BUTTON', 'A']).toContain(focusedElement || '');
  });
});
