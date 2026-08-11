// @ts-check

import { setupForm, formConfigs, setupInputMasks } from "./forms.mjs";
import { setupMenu } from "./menu.mjs";

setupMenu();
setupInputMasks();
setupForm(formConfigs.donor);
setupForm(formConfigs.beneficiary);
