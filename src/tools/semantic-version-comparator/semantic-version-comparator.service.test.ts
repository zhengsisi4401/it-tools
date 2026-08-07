import { describe, expect, it } from 'vitest';
import { compareSemanticVersions, parseSemanticVersion } from './semantic-version-comparator.service';

describe('semantic version comparator', () => {
  it('parses valid semantic versions and an optional v prefix', () => {
    expect(parseSemanticVersion('v1.2.3-alpha.1+build.5')).toEqual({
      major: 1,
      minor: 2,
      patch: 3,
      prerelease: ['alpha', '1'],
      build: ['build', '5'],
    });
  });

  it.each(['1.2', '01.2.3', '1.2.3-01', '1.2.3+', 'hello'])('rejects invalid version %s', (version) => {
    expect(parseSemanticVersion(version)).toBeNull();
  });

  it.each([
    ['1.0.0', '2.0.0', -1],
    ['2.1.0', '2.0.9', 1],
    ['1.0.0-alpha', '1.0.0', -1],
    ['1.0.0-alpha', '1.0.0-alpha.1', -1],
    ['1.0.0-alpha.1', '1.0.0-alpha.beta', -1],
    ['1.0.0-beta.11', '1.0.0-rc.1', -1],
    ['1.0.0+build.1', '1.0.0+build.2', 0],
  ] as const)('compares %s with %s', (left, right, expected) => {
    expect(compareSemanticVersions(left, right)).toBe(expected);
  });

  it('returns null when either input is invalid', () => {
    expect(compareSemanticVersions('1.0', '1.0.0')).toBeNull();
  });
});
