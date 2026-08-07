<script setup lang="ts">
import { compareSemanticVersions, parseSemanticVersion } from './semantic-version-comparator.service';

const leftVersion = ref('1.2.3');
const rightVersion = ref('2.0.0-beta.1');

const leftParsed = computed(() => parseSemanticVersion(leftVersion.value));
const rightParsed = computed(() => parseSemanticVersion(rightVersion.value));
const comparison = computed(() => compareSemanticVersions(leftVersion.value, rightVersion.value));
const symbol = computed(() => comparison.value === null ? '?' : comparison.value < 0 ? '<' : comparison.value > 0 ? '>' : '=');
const message = computed(() => {
  if (comparison.value === null) {
    return 'Enter two valid semantic versions';
  }
  if (comparison.value === 0) {
    return 'Both versions have equal precedence';
  }
  return comparison.value < 0 ? 'The left version is older' : 'The left version is newer';
});

function swapVersions() {
  [leftVersion.value, rightVersion.value] = [rightVersion.value, leftVersion.value];
}
</script>

<template>
  <div style="max-width: 760px; margin: 0 auto;">
    <c-card>
      <div class="version-grid">
        <n-form-item label="Left version" :validation-status="leftParsed ? undefined : 'error'">
          <n-input v-model:value="leftVersion" data-test-id="left-version" placeholder="1.2.3" />
        </n-form-item>

        <div class="comparison-symbol" data-test-id="comparison-symbol">
          {{ symbol }}
        </div>

        <n-form-item label="Right version" :validation-status="rightParsed ? undefined : 'error'">
          <n-input v-model:value="rightVersion" data-test-id="right-version" placeholder="2.0.0-beta.1" />
        </n-form-item>
      </div>

      <div flex justify-center>
        <c-button @click="swapVersions">
          Swap versions
        </c-button>
      </div>

      <n-divider />

      <n-result :status="comparison === null ? 'warning' : 'success'" :title="message">
        <template #footer>
          <div op-70>
            Build metadata (the part after +) is intentionally ignored when comparing precedence.
          </div>
        </template>
      </n-result>
    </c-card>
  </div>
</template>

<style lang="less" scoped>
.version-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 54px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.comparison-symbol {
  margin-top: 12px;
  text-align: center;
  font-size: 30px;
  font-weight: 600;
}

@media (max-width: 600px) {
  .version-grid {
    grid-template-columns: 1fr;
  }

  .comparison-symbol {
    margin: -8px 0;
  }
}
</style>
