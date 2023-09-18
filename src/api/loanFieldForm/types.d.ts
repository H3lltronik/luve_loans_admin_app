interface LoanFormField {
  isDraft: boolean
  isPublished: boolean
  loanFormId: string
  loanFieldId: string
  validations: string
  columnWidth: number
  priority: number
  deletedAt: string | null
  breakpoints: string
  createdAt: string
  updatedAt: string
  id: string
  seqId: number
}

type MeResponse = LoanFormField;

type GetLoanFormFieldsResponse = {
  data: LoanFormField[];
  pagination: Pagination;
};

type GetLoanFormFieldResponse = LoanFormField;
type UpdatedLoanFormFieldResponse = LoanFormField;
type DeleteLoanFormFieldResponse = LoanFormField;

type LoanFormFieldCreatedResponse = LoanFormField;

type CreateLoanFormFieldRequest = Omit<LoanFormField, "id">;

// parsed
type LoanFormFieldWithStatus = LoanFormField & { status: string };
type LoanFormFieldsWithStatus = LoanFormFieldWithStatus[];
type GetLoanFormFieldsResponseWithStatus = {
  data: LoanFormFieldsWithStatus;
  pagination: Pagination;
};
