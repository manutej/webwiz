import MinimalTemplate from './minimal';
import BoldTemplate from './bold';
import ElegantTemplate from './elegant';
import CreativeTemplate from './creative';
import { LandingPageSpec } from '@/types';

export const templates = {
  minimal: MinimalTemplate,
  bold: BoldTemplate,
  elegant: ElegantTemplate,
  creative: CreativeTemplate,
};

export type TemplateName = keyof typeof templates;

export function getTemplate(name: TemplateName) {
  return templates[name] || templates.minimal;
}

export function renderTemplate(spec: LandingPageSpec) {
  const Template = getTemplate(spec.template);
  return Template;
}
