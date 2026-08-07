import { Versions } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Semantic version comparator',
  path: '/semantic-version-comparator',
  description: 'Compare two SemVer versions and inspect their precedence.',
  keywords: ['semantic', 'version', 'semver', 'compare', 'release', 'prerelease'],
  component: () => import('./semantic-version-comparator.vue'),
  icon: Versions,
  createdAt: new Date('2026-08-07'),
});
