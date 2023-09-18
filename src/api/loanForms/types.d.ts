interface LoanForm {
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  isDraft: boolean;
  isPublished: boolean;
  id: string;
  seqId: number;
  name: string;
}

type MeResponse = LoanForm;

type GetLoanFormsResponse = {
  data: LoanFormWithFields[];
  pagination: Pagination;
};

type GetLoanFormResponse = LoanFormWithFields;
type UpdatedLoanFormResponse = LoanForm;
type DeleteLoanFormResponse = LoanForm;

type LoanFormCreatedResponse = LoanForm;

type CreateLoanFormRequest = Omit<LoanForm, "id">;

// parsed
type LoanFormWithStatus = LoanForm & { status: string };
type LoanFormsWithStatus = LoanFormWithStatus[];
type GetLoanFormsResponseWithStatus = {
  data: LoanFormsWithStatus;
  pagination: Pagination;
};

type LoanFormWithFields = LoanForm & {
  loanFormFields: Omit<LoanFormField, "loanFormId">[];
};

type FlattenedLoanForm = LoanFormWithFields & Record<string, unknown>;