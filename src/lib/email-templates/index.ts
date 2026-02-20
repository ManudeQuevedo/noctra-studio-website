import { discoveryTemplate } from "./discovery-call";
import { webPresenceTemplate } from "./web-presence";
import { ecommerceTemplate } from "./ecommerce";
import { customSystemTemplate } from "./custom-system";
import { generalTemplate } from "./general";

export const templates = {
  discovery_call: discoveryTemplate,
  web_presence: webPresenceTemplate,
  ecommerce: ecommerceTemplate,
  custom_system: customSystemTemplate,
  general: generalTemplate,
};

export type TemplateKey = keyof typeof templates;
