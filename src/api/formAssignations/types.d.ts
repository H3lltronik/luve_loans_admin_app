interface FormAssignation {
  isDraft: boolean;
  isPublished: boolean;
  clientId: string;
  loanFormId: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  id: string;
  seqId: number;
  client: Client;
  loanForm: LoanForm;
}

type MeResponse = FormAssignation;

type GetFormAssignationsResponse = {
  data: FormAssignation[];
  pagination: Pagination;
};

type GetFormAssignationResponse = FormAssignation;
type UpdatedFormAssignationResponse = FormAssignation;
type DeleteFormAssignationResponse = FormAssignation;

type FormAssignationCreatedResponse = FormAssignation;

type CreateFormAssignationRequest = Omit<FormAssignation, "id">;

// parsed
type FormAssignationWithStatus = FormAssignation & { status: string };
type FormAssignationsWithStatus = FormAssignationWithStatus[];
type GetFormAssignationsResponseWithStatus = {
  data: FormAssignationsWithStatus;
  pagination: Pagination;
};
