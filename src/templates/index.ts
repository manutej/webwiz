import MinimalTemplate from './minimal';
import BoldTemplate from './bold';
import { LandingPageSpec } from '@/types';

export const templates = {
  minimal: MinimalTemplate,
  bold: BoldTemplate,
  elegant: MinimalTemplate, // Can be replaced with a dedicated elegant template
  creative: BoldTemplate,   // Can be replaced with a dedicated creative template
};

export type TemplateName = keyof typeof templates;

export function getTemplate(name: TemplateName) {
  return templates[name] || templates.minimal;
}

export function renderTemplate(spec: LandingPageSpec) {
  const Template = getTemplate(spec.template);
  return Template;
}
