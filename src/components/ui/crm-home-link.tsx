import * as React from "react";

import { NOCTRA_CRM_HOME_URL } from "@/lib/crm";

type CrmHomeLinkProps = Omit<React.ComponentPropsWithoutRef<"a">, "href">;

export function CrmHomeLink(props: CrmHomeLinkProps) {
  return <a href={NOCTRA_CRM_HOME_URL} {...props} />;
}
