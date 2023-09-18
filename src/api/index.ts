import BaseAuthAPI from "./auth/auth.api";
import BaseClientAPI from "./client/client.api";
import { ENTITIES_ENDPOINTS } from "./constants";
import * as END_POINTS from "./endpoints";
import BaseLoanFormFieldAPI from "./loanFieldForm/loan_field_forms.api";
import BaseLoanFieldAPI from "./loanFields/loan_fields.api";
import BaseLoanFormAPI from "./loanForms/loan_forms.api";
import BaseProfilesAPI from "./profiles/profiles.api";
import BaseUserAPI from "./user/user.api";

const BASE_URL = import.meta.env.VITE_API_PATH;

export const UserAPI = new BaseUserAPI(
  `${BASE_URL}/${ENTITIES_ENDPOINTS.users}`
);
export const ProfileAPI = new BaseProfilesAPI(
  `${BASE_URL}/${ENTITIES_ENDPOINTS.profiles}`
);
export const ClientAPI = new BaseClientAPI(
  `${BASE_URL}/${ENTITIES_ENDPOINTS.clients}`
);
export const LoanFormAPI = new BaseLoanFormAPI(
  `${BASE_URL}/${ENTITIES_ENDPOINTS.loanForms}`
);
export const LoanFieldAPI = new BaseLoanFieldAPI(
  `${BASE_URL}/${ENTITIES_ENDPOINTS.loanFields}`
);
export const LoanFormFieldAPI = new BaseLoanFormFieldAPI(
  `${BASE_URL}/${ENTITIES_ENDPOINTS.loanFormFields}`
);

export const AuthAPI = new BaseAuthAPI({
  forgotPasswordUrl: `${BASE_URL}/`,
  loginUrl: `${END_POINTS.login}`,
  meUrl: `${END_POINTS.me}`,
  logoutUrl: `${BASE_URL}/`,
  resetPasswordUrl: `${BASE_URL}/`,
});
