import { describe, it, expect } from 'vitest';
import { translations } from './i18n.jsx';

// Helper to get all keys for a language
const getKeys = (lang) => Object.keys(translations[lang]);

const languages = Object.keys(translations);

describe('i18n translations', () => {
  it('all languages have the same set of keys', () => {
    const baseLang = languages[0];
    const baseKeys = getKeys(baseLang).sort();
    for (const lang of languages) {
      const keys = getKeys(lang).sort();
      expect(keys).toEqual(baseKeys);
    }
  });

  it('all prompts are non-empty strings', () => {
    for (const lang of languages) {
      for (const [key, value] of Object.entries(translations[lang])) {
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      }
    }
  });
});
