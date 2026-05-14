import { colors, radius, spacing, typography } from './tokens';

describe('theme tokens', () => {
  it('exposes base design tokens', () => {
    expect(colors.background).toBeTruthy();
    expect(spacing.md).toBeGreaterThan(spacing.sm);
    expect(radius.md).toBeGreaterThanOrEqual(radius.sm);
    expect(typography.body).toBeGreaterThan(0);
  });
});
